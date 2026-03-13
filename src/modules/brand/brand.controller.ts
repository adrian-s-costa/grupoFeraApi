import Service from './brand.service';
import { Request, Response } from 'express';

class Controller {
    public async searchByName(req: Request, res: Response) {
        const { q } = req.query;
        
        if (!q || typeof q !== 'string') {
            res.status(400).json({ error: 'Query parameter "q" is required' });
            return;
        }

        const result = await Service.searchByName(q);
        res.status(200).json(result);
    }

    public async create(req: Request, res: Response) {
        const { name, emailOwner, userId } = req.body;
        
        if (!name || typeof name !== 'string') {
            res.status(400).json({ error: 'Field "name" is required' });
            return;
        }

        const result = await Service.create({ name, emailOwner, userId });
        res.status(201).json({ id: result.id });
    }
}

export default new Controller();
