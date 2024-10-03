import { AccountRole } from '@prisma/client';

export interface IPayloadDto {
  id: string;
  role: AccountRole;
  name: string;
  email: string;
  cellphone?: string;
  cep?: string;
  localidade?: string;
  uf?: string;
  pfpUrl?: string;
}
