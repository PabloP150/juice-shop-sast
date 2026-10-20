/*
 * Laboratorio SAST con Bearer - Parte D
 * Endpoint de demostración: GET /rest/demo/calcular?expr=2+3
 */

import { type Request, type Response } from 'express'

export function calcular () {
  return (req: Request, res: Response) => {
    const expresion = String(req.query.expr ?? '')
    // VULNERABLE (CWE-95): ejecuta como código JavaScript lo que envíe el usuario
    const resultado = eval(expresion) // eslint-disable-line no-eval
    res.json({ expresion, resultado })
  }
}
