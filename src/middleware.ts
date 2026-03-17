import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Prepara a resposta padrão que o Next.js iria dar
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. Cria o cliente Supabase específico para o Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Atualiza os cookies no pedido original
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          // Atualiza os cookies na resposta que vai para o navegador (muito importante para manter o utilizador logado!)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 3. Verifica quem é que está a tentar entrar (Pega o utilizador do banco de dados)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Mapeia as nossas rotas secretas (CORRIGIDO)
  const urlAtual = request.nextUrl.pathname;
  // Agora só considera rota de aluno se for EXATAMENTE /painel ou começar com /painel/ (com a barra)
  const isRotaAluno =
    urlAtual === "/painel" ||
    urlAtual.startsWith("/painel/") ||
    urlAtual.startsWith("/autoavaliacao");
  const isRotaAdmin =
    urlAtual.startsWith("/painel-professor") ||
    urlAtual.startsWith("/turmas") ||
    urlAtual.startsWith("/avaliacao");
  const isRotaLogin = urlAtual === "/login";

  // ⚠️ ATENÇÃO: Coloque aqui o mesmo email que definiu no RLS do Supabase!
  const ADMIN_EMAIL = "rasismaelbarbosa@gmail.com";

  // ==========================================
  // REGRAS DO SEGURANÇA (O CÃO DE GUARDA)
  // ==========================================

  // Regra A: Se NÃO está logado e tenta aceder a rotas protegidas -> Manda para o Login
  if (!user && (isRotaAluno || isRotaAdmin)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se o utilizador JÁ ESTÁ LOGADO:
  if (user) {
    const isCoordenador = user.email === ADMIN_EMAIL;

    // Regra B: Se o Aluno tenta entrar no painel do Professor -> Manda para o painel do aluno
    if (!isCoordenador && isRotaAdmin) {
      return NextResponse.redirect(new URL("/painel", request.url));
    }

    // Regra C: Se o Professor tenta aceder ao painel do aluno -> Manda para a Torre de Controlo
    if (isCoordenador && isRotaAluno) {
      return NextResponse.redirect(new URL("/painel-professor", request.url));
    }

    // Regra D: Se já está logado e tenta ir para a página de Login -> Manda para o seu respetivo painel
    if (isRotaLogin) {
      if (isCoordenador) {
        return NextResponse.redirect(new URL("/painel-professor", request.url));
      } else {
        return NextResponse.redirect(new URL("/painel", request.url));
      }
    }
  }

  // Se passou por todas as regras sem problemas, deixa seguir caminho
  return supabaseResponse;
}

// 5. Configuração de onde o segurança deve atuar
// Isto impede que o middleware perca tempo a verificar imagens (.png, .jpg) ou ficheiros de sistema
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
