import { Router } from "express";
import { getBankSlipInfoController } from "../controllers/bankslip";

export default (router: Router): void => {
  router.get("/boleto/:digits", getBankSlipInfoController);
};
