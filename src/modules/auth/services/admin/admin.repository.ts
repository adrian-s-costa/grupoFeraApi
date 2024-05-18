import DataSource from '@database/data-source';

class Repository {
  constructor(private readonly repository = DataSource.admin) {}

  public findAllPermissions(id: number) {
    return this.repository.findUnique({
      // @ts-ignore: Unreachable code error
      where: { id },
      // @ts-ignore: Unreachable code error
    }).permissions();
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

  public storeCode(id: string, code: string, codeExpiresIn: Date) {
    return this.repository.update({
      where: { id },
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
