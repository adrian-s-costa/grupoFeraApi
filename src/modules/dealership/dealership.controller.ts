import Service from './dealership.service';
import { Request, Response } from 'express';

class Controller {
    public async create(req: Request, res: Response) {
        const {
            name,
            description,
            address,
            distance,
            offerId,
            image,
            rating,
            reviews,
            storeCode,
            brandId,
            userId,
            coordinates
        } = req.body;

        // Validações básicas - apenas campos obrigatórios
        if (!name || typeof name !== 'string') {
            res.status(400).json({ error: 'Field "name" is required' });
            return;
        }

        if (!description || typeof description !== 'string') {
            res.status(400).json({ error: 'Field "description" is required' });
            return;
        }

        if (!address || typeof address !== 'string') {
            res.status(400).json({ error: 'Field "address" is required' });
            return;
        }

        if (!image || typeof image !== 'string') {
            res.status(400).json({ error: 'Field "image" is required' });
            return;
        }

        if (!coordinates || typeof coordinates.lat !== 'number' || typeof coordinates.lng !== 'number') {
            res.status(400).json({ error: 'Field "coordinates" with lat and lng numbers is required' });
            return;
        }

        // Validações para campos opcionais
        if (rating !== undefined && typeof rating !== 'number') {
            res.status(400).json({ error: 'Field "rating" must be a number' });
            return;
        }

        if (reviews !== undefined && typeof reviews !== 'number') {
            res.status(400).json({ error: 'Field "reviews" must be a number' });
            return;
        }

        if (distance !== undefined && typeof distance !== 'string') {
            res.status(400).json({ error: 'Field "distance" must be a string' });
            return;
        }

        if (offerId !== undefined && typeof offerId !== 'string') {
            res.status(400).json({ error: 'Field "offerId" must be a string' });
            return;
        }

        try {
            const result = await Service.create({
                name,
                description,
                address,
                distance,
                offerId,
                image,
                rating,
                reviews,
                storeCode,
                brandId,
                userId,
                coordinates
            });

            res.status(201).json({ id: result.id });
        } catch (error) {
            console.error('Error creating dealership:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async findAll(req: Request, res: Response) {
        try {
            const result = await Service.findAll();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching dealerships:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: 'Parameter "id" is required' });
            return;
        }

        try {
            const result = await Service.findById(id);
            
            if (!result) {
                res.status(404).json({ error: 'Dealership not found' });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching dealership:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new Controller();
