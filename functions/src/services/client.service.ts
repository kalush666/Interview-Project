import { Firestore } from "firebase-admin/firestore";
import { firebaseAdmin } from "../config/firebase";
import { Client, CreateClientRequest } from "../types/client.types";
import { FIRESTORE_COLLECTIONS } from "../constants/database.constants";

export class ClientService {
  private dataBase: Firestore = firebaseAdmin.getFirestore();

  public async createClient(
    clientData: CreateClientRequest,
    ownerUid: string
  ): Promise<Client> {
    const documentReference = this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc();
    const newClient: Client = {
      id: documentReference.id,
      ...clientData,
      ownerUid,
      createdAt: new Date(),
    };
    await documentReference.set(newClient);
    return newClient;
  }

  public async getClientById(clientId: string): Promise<Client | null> {
    const doc = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc(clientId)
      .get();
    if (!doc.exists) {
      return null;
    }
    return doc.data() as Client;
  }
}
