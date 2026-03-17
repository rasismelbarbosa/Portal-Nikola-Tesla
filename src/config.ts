// src/config.ts

// Defina aqui a data limite (Ano-Mês-Dia T Hora:Minuto:Segundo)
// Exemplo: 21 de Março de 2026 às 23:59:59
export const DEADLINE = new Date("2026-03-21T23:59:59");

export const IS_OPEN = new Date() < DEADLINE;
