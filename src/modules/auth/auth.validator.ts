import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { Login } from './dtos/login.dto';
import { ForgotPassword, ResetPassword } from './dtos/password.dto';
import { z } from 'zod';

class Validator extends BaseValidator {
  public login: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', Login);
  };

  public forgotPassword: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', ForgotPassword);
  };

  public resetPassword: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', ResetPassword);
  };

  public checkCode: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', z.object({
      code: z.string(),
      credential: z.string().email()
    }));
  };

  public deleteUser: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', z.object({
      credential: z.string().email()
    }));
  };  

  public updateUser: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', z.object({
      id: z.string(),
      name: z.string().min(1),
      secName: z.string().min(1),
      tel: z.string().min(9),
      bornDate: z.string().min(1)
    }));
  };
}

export default new Validator();
