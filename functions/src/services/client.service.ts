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
      updatedAt: new Date(),
    };
    await documentReference.set(newClient);
    return newClient;
  }

  public async getClientsByOwner(ownerUid: string): Promise<Client[]> {
    const snapshot = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .where("ownerUid", "==", ownerUid)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => doc.data() as Client);
  }

  public async getClient(clientId: string): Promise<Client | null> {
    const clientDoc = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc(clientId)
      .get();
    if (!clientDoc.exists) {
      return null;
    }
    return clientDoc.data() as Client;
  }

  public async updateClient(
    clientid: string,
    updateData: Partial<CreateClientRequest>
  ): Promise<Client | null> {
    const clientRef = this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc(clientid);
    const clientDoc = await clientRef.get();
    if (!clientDoc.exists) {
      return null;
    }
    const prevData = clientDoc.data() as Client;
    const updatedClient = {
      ...prevData,
      ...updateData,
      updatedAt: new Date(),
    };
    const { id, ...fieldsToUpdate } = updatedClient;
    await clientRef.update(fieldsToUpdate);
    return { ...updatedClient } as Client;
  }
}
