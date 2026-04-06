import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateCoupon } from './dtos/create-coupon.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateCoupon);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateCoupon.partial());
  };
}

export default new Validator();