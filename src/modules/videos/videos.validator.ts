
import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateVideos } from './dtos/create-videos.dto';
import { UpdateVideos } from './dtos/update-videos.dto';
import { z } from 'zod';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateVideos);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateVideos);
  };

  public postComment: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', z.object({
      name: z.string().min(1),
      time: z.string().min(1),
      comment: z.string().min(1),
    }));
  };
}

export default new Validator();
