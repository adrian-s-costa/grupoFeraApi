import DataSource from '@database/data-source';

import { Prisma, AccountStatus } from '@prisma/client';
import { AdminDto, AdminWithPermissionsDto } from './dtos/admin.dto';

class Repository {
  constructor(private readonly repository = DataSource.admin) {}

  public findAll(size: number, page: number, status?: AccountStatus, search?: string) {
    const where: Prisma.AdminWhereInput = {
      AND: [
        { status },
        { OR:
          [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: AdminDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(status?: AccountStatus, search?: string) {
    const where: Prisma.AdminWhereInput = {
      AND: [
        { status },
        { OR:
          [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        },
      ],
    };

    return this.repository.findMany({
      where,
      select: AdminDto,
    });
  }

  public findOne(id: string) {
    return this.repository.findUnique({
      where: { id },
      select: AdminWithPermissionsDto,
    });
  }

  public findByUniqueFields(email: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email },
        ],
      },
    });
  }

  public createOne(
    data: Prisma.AdminCreateInput,
    permissions: Prisma.PermissionWhereUniqueInput[],
  ) {
    return this.repository.create({
      data: {
        ...data,
      },
      select: AdminWithPermissionsDto,
    });
  }

  public updateOne(
    id: string,
    data: Prisma.AdminUpdateInput,
    permissions?: Prisma.PermissionWhereUniqueInput[],
  ) {
    return DataSource.$transaction(async(tx) => {
      if (permissions) {
        // removes relation between admin and permissions.
        await tx.admin.update({
          where: { id },
          data: {
  
          },
        });
      }

      // updates admin user, including permissions.
      return await tx.admin.update({
        where: { id },
        data: {
          ...data,
        },
        select: AdminWithPermissionsDto,
      });
    });
  }

  public updateStatus(id: string, status: AccountStatus) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: AdminDto,
    });
  }

  public deleteOne(id: string) {
    return this.repository.delete({
      where: { id },
      select: AdminDto,
    });
  }
}

export default new Repository();
