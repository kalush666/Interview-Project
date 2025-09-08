export interface CreateClientDto {
  name: string;
  email: string;
  phone: string;
  ownerUid: string;
}

export interface UpdateClientDto {
  clientId: string;
  ownerUid: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface GetClientDto {
  clientId: string;
}

export interface GetClientsByOwnerDto {
  ownerUid: string;
}

export interface DeleteClientDto {
  clientId: string;
  ownerUid: string;
}
