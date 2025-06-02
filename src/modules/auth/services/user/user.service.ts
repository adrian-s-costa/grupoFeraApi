import Repository from './user.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { AccountRole, AccountStatus, Prisma, User } from '@prisma/client';
import { IPayloadDto } from '../../dtos/payload.dto';
import { LoginDto } from '../../dtos/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from '../../dtos/password.dto';

import CodeHelper from '@helpers/code.helper';
import JwtHelper from '@helpers/token.helper';
import PasswordHelper from '@helpers/password.helper';
import MailService from '../../../mail/mail.service';

class Service {
  public async loginUser(data: LoginDto) {
    // find user.
    const user = await this.findByCredential(data.credential);

    // check if user is active.
    this.checkIfUserIsActive(user);

    // compare password.
    this.comparePasswords(data.password, user.password);

    // generate token and account object.
    const payload: IPayloadDto = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      cellphone: user.cellphone!,
      cep: user.cep!,
      localidade: user.localidade!,
      uf: user.uf!,
      pfpUrl: user.pfpUrl!
    };

    return {
      token: JwtHelper.createToken(payload),
      account: payload,
    };
  }

  public async forgotPasswordUser(data: ForgotPasswordDto) {
    let user = null;
    const defaultPassword = '2#%%sdlkfjslf@@#%68646654879321400dfsgdhaçovmezxx4445'
    // @ts-ignore
    let typeOfEmail = 'sendForgotPasswordEmail'
    const register: Prisma.UserCreateInput = {
      role: AccountRole.user,
      name: 'Sem Nome',
      email: data.credential,
      password: PasswordHelper.hash(defaultPassword),
      status: AccountStatus.ativo,
    };

    if (data.register) {
      typeOfEmail = 'sendRegisterPasswordEmail'
      user = await this.findByCredentialRegister(data.credential);

      if(!user || user == null){ 
       await Repository.createUser(register);
      }

      user = await this.findByCredentialRegister(data.credential);

      if (user && this.comparePasswords(defaultPassword, user.password)){
        await Repository.deleteUser(data.credential)
        await Repository.createUser(register);
      } else {
        throw new AppException(400, ErrorMessages.ACCOUNT_ALREADY_ACTIVE);
      }
    }
    
    user = await this.findByCredential(data.credential);
    const { code, minutes } = await this.storeCode(user.email);
    
    if (data.register){
      await MailService.sendRegisterPasswordEmail(user.email, { code, minutes });
      return { message: 'Código de registro de conta enviado no seu email!' };
    }

    await MailService.sendForgotPasswordEmail(user.email, {code, minutes})
    return { message: 'Código de recuperação de senha enviado no seu email!' };
  }

  public async checkCode(data: {credential: string, code: string}) {

    const user = await this.findByCredentialAndCode(data.credential, data.code);

    // check code validation.
    this.checkCodeValidation(user.codeExpiresIn as Date);
  }

  public async resetPasswordUser(data: ResetPasswordDto) {
    // find user.
    const user = await this.findByCredential(data.credential);
    
    await Repository.changePassword(user.id, PasswordHelper.hash(data.password));
    return { message: 'Senha atualizada com sucesso!' };
  }

  public async updateUserData(data: { id: string, name: string, secName: string, tel: string, bornDate: string, cep: string, localidade: string, uf: string, pfpUrl: string, initials: string }) {
    let newUser = await Repository.updateAdditionalInfo(data);
    const { password, ...rest } = newUser;
    return rest;
  }

  private checkCodeValidation(codeExpiresIn: Date) {
    const isExpired = CodeHelper.isExpired(codeExpiresIn);
    if (isExpired) {
      throw new AppException(400, ErrorMessages.CODE_EXPIRED);
    }
  }

  private checkIfUserIsActive(user: User) {
    if (user.status === AccountStatus.inativo) {
      throw new AppException(403, ErrorMessages.INACTIVE);
    }
    if (user.status === AccountStatus.pendente) {
      throw new AppException(403, ErrorMessages.PENDING);
    }
  }

  private comparePasswords(password: string, hash: string) {
    const isMatch = PasswordHelper.comparePasswordAndHash(password, hash);
    if (!isMatch) {
      throw new AppException(400, ErrorMessages.INVALID_PASSWORD);
    }
    return isMatch;
  }

  private async findByCredential(credential: string) {
    const user = await Repository.findByCredential(credential);

    if (!user) {
      throw new AppException(400, ErrorMessages.USER_NOT_EXIST);
    }
    return user;
  }

  private async findByCredentialRegister(credential: string) {
    return await Repository.findByCredential(credential);
  }

  private async findByCredentialAndCode(credential: string, code: string) {
    const user = await this.findByCredential(credential);

    if (user.code !== code) {
      throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);
    }
    return user;
  }

  private async storeCode(email: string) {
    const minutes = 15;
    const { code, codeExpiresIn } = CodeHelper.generate(minutes);

    await Repository.storeCode(email, code, codeExpiresIn);

    return { code, minutes };
  }

  public async deleteUser(credential: string){
    const userDeleted = await Repository.deleteUser(credential);
    return userDeleted;
  }

  public async getUser(credential: string){
    return await Repository.findByCredential(credential);
  }

}

export default new Service();
