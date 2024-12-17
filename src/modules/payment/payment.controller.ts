import { Request, Response } from 'express';
import Service from "./payment.service"

class Controller { 
    public async createPayment(req: Request, res: Response) {
      const result = await Service.createPayment(req);
      res.status(200).json(result);
    }

    public async createPreference(req: Request, res: Response) {
      const result = await Service.createPreference(req.body);
      res.status(200).json(result);
    }

    public async webhook(req: Request, res: Response) {
      console.log(req.body);
      await Service.updateUserWithPaymentInfo(req)
      
      return res.status(200).json({
        status: "OK"
      });
    }
}  

export default new Controller();
