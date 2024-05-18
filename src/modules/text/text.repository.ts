import DataSource from '@database/data-source';

import { Prisma, TextType } from '@prisma/client';
import { TextDto } from './dtos/text.dto';

class Repository {
  constructor(private readonly repository = DataSource.text) {}

  public findOne(type: TextType) {
    return this.repository.findUnique({
      // @ts-ignore: Unreachable code error
      where: { type },
      select: TextDto,
    });
  }

  public updateOne(id: string, data: Prisma.TextUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: TextDto,
    });
  }
}

export default new Repository();
