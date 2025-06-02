import { Request, Response } from 'express';
import Service from "./payment.service"
const webpush = require('web-push');
import 'dotenv/config';

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

    public async saveSubs(req: Request, res: Response) {
      await Service.createSub(req.body)
      
      return res.status(200).json({
        status: "OK"
      });
    }

    public async push(req: Request, res: Response) {

      webpush.setVapidDetails(
        'mailto:adriancosta1215@gmail.com', // pode ser qualquer email válido
        process.env.VAPID_PUB_KEY!,
        process.env.VAPID_PRIV_KEY!
      );

      const subscriptions = await Service.getAllSub();
    
      console.log(subscriptions);
    
      const results = await Promise.allSettled(
        subscriptions.map((sub: any) =>
          webpush.sendNotification(sub, JSON.stringify({
            title: 'Grupo Fera 💥',
            body: 'Nova notificação enviada com sucesso!',
          }))
        )
      );
    
      const successes = results.filter(result => result.status === 'fulfilled');
      const failures = results.filter(result => result.status === 'rejected');

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Erro ao enviar para ${subscriptions[index].endpoint}:`, result.reason);
        }
      });
    
      if (failures.length > 0) {
        res.status(207).json({
          message: '⚠️ Algumas notificações falharam',
          successCount: successes.length,
          failureCount: failures.length,
        });
      } else {
        res.status(200).json({
          message: '✅ Todas as notificações foram enviadas com sucesso',
        });
      }
    }    
}  

export default new Controller();
