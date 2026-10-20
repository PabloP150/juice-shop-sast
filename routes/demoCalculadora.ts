/*
 * Laboratorio SAST con Bearer - Parte D
 * Endpoint de demostración: GET /rest/demo/calcular?expr=2+3
 */

import { type Request, type Response } from 'express'

// Solo se aceptan expresiones de la forma "número operador número" (por ejemplo 2+3 o 4.5 * -2)
const FORMATO_EXPRESION = /^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)\s*$/

const operaciones: Record<string, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
}

export function calcular () {
  return (req: Request, res: Response) => {
    const expresion = String(req.query.expr ?? '')
    // CORREGIDO: se valida el formato y se calcula con funciones fijas, sin eval()
    const coincidencia = FORMATO_EXPRESION.exec(expresion)
    if (coincidencia === null) {
      res.status(400).json({ error: 'Expresión inválida. Use el formato: número operador número' })
      return
    }
    const [, a, operador, b] = coincidencia
    const resultado = operaciones[operador](Number(a), Number(b))
    res.json({ expresion, resultado })
  }
}
