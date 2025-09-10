export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  ownerUid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientRequest {
  name: string;
  phone: string;
  email: string;
}
