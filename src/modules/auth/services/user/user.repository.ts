import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';

class Repository {
  constructor(private readonly repository = DataSource.user) {}

  public deleteUser(data: string ){
    return this.repository.delete({
      where: {email: data}
    });
  }

  public createUser(data: Prisma.UserCreateInput){
    return this.repository.create({
      data: data,
    });
  }

  public findByCredential(credential: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: credential },
        ],
      },
    });
  }

  public updateAdditionalInfo(info: { id: string, name: string, secName: string, tel: string, bornDate: string, cep: string, localidade: string, uf: string, pfpUrl: string, initials: string }) {
    return this.repository.update({
      where: { id: info.id },
      data: {
        name: info.name + ' ' + info.secName,
        cellphone: info.tel,
        bornDate: info.bornDate,
        cep: info.cep,
        localidade: info.localidade,
        uf: info.uf,
        pfpUrl: info.pfpUrl,
        initials: info.initials
      },
    });
  }

  public storeCode(email: string, code: string, codeExpiresIn: Date) {
    return this.repository.update({
      where: { email: email },
      data: {
        code,
        codeExpiresIn,
      },
    });
  }

  public changePassword(id: string, password: string) {
    return this.repository.update({
      where: { id },
      data: {
        code: null,
        codeExpiresIn: null,
        password,
      },
    });
  }
}

export default new Repository();
