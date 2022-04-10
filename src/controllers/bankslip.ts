import { Request, Response } from "express";
import { getBankSlipInfo } from "../domain/usecases/getBankSlipInfo";

export function getBankSlipInfoController(req: Request, res: Response): void {
  const { digits } = req.params;

  try {
    const info = getBankSlipInfo(digits);
    res.status(200).json(info);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
