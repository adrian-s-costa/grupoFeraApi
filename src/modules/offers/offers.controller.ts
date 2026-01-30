import Service from './offers.service';
import { Request, Response } from 'express';

class Controller {
    public async findAll(req: Request, res: Response) {
        const { lat, lng } = req.query;
        const result = await Service.findAll(lat as string, lng as string);
        res.status(200).json(result);
    }

    public async verifyNotification(req: Request, res: Response) {
        const result = await Service.verifyNotification(req.body.loc, req.body.userId);
        res.status(200).json(result);
    }

    public async findOne(req: Request, res: Response) {
        const result = await Service.findById(req.params.id);
        res.status(200).json(result);
    }

    public async collab(req: Request, res: Response) {
        const result = await Service.collab();
        res.status(200).json(result);
    }

}

export default new Controller();