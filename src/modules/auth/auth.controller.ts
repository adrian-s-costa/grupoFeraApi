import AdminService from './services/admin/admin.service';
import UserService from './services/user/user.service';
import { Request, Response } from 'express';

class Controller {
  public async loginAdm(req: Request, res: Response) {
    const result = await AdminService.loginAdm(req.body);
    res.status(200).json(result);
  }

  public async forgotPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.forgotPasswordAdm(req.body);
    res.status(200).json(result);
  }

  public async resetPasswordAdm(req: Request, res: Response) {
    const result = await AdminService.resetPasswordAdm(req.body);
    res.status(200).json(result);
  }


  public async loginUser(req: Request, res: Response) {
    const result = await UserService.loginUser(req.body);
    res.status(200).json(result);
  }

  public async forgotPasswordUser(req: Request, res: Response) {
    const result = await UserService.forgotPasswordUser(req.body);
    res.status(200).json(result);
  }

  public async checkCode(req: Request, res: Response) {
    await UserService.checkCode(req.body);
    res.sendStatus(200)
  }

  public async resetPasswordUser(req: Request, res: Response) {
    const result = await UserService.resetPasswordUser(req.body);
    res.status(200).json(result);
  }

  public async updateUserData(req: Request, res: Response) {
    const result = await UserService.updateUserData(req.body);
    res.status(200).json(result);
  }

  public async deleteUser(req: Request, res: Response){
    const result = await UserService.deleteUser(req.body.credential)
    res.status(200).json(result);
  }

  public async getUser(req: Request, res: Response){
    const result = await UserService.getUser(req.params.email)
    res.status(200).json(result);
  }
}

export default new Controller();
