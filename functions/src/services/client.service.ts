import {Firestore} from "firebase-admin/firestore";
import {firebaseAdmin} from "../config/firebase";
import {Client} from "../types/client.types";
import {FIRESTORE_COLLECTIONS} from "../constants/database.constants";
import {
  CreateClientDto,
  UpdateClientDto,
  GetClientDto,
  GetClientsByOwnerDto,
  DeleteClientDto,
} from "../dto";

export class ClientService {
  private dataBase: Firestore = firebaseAdmin.getFirestore();

  public async createClient(dto: CreateClientDto): Promise<Client> {
    const documentReference = this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc();
    const newClient: Client = {
      id: documentReference.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      ownerUid: dto.ownerUid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await documentReference.set(newClient);
    return newClient;
  }

  public async getClientsByOwner(dto: GetClientsByOwnerDto): Promise<Client[]> {
    const snapshot = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .where("ownerUid", "==", dto.ownerUid)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => doc.data() as Client);
  }

  public async getClient(dto: GetClientDto): Promise<Client | null> {
    const clientDoc = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc(dto.clientId)
      .get();
    if (!clientDoc.exists) {
      return null;
    }
    return clientDoc.data() as Client;
  }

  public async updateClient(dto: UpdateClientDto): Promise<Client | null> {
    const clientRef = this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc(dto.clientId);
    const clientDoc = await clientRef.get();
    if (!clientDoc.exists) {
      return null;
    }
    const prevData = clientDoc.data() as Client;

    if (prevData.ownerUid !== dto.ownerUid) {
      throw new Error(
        "Unauthorized: Cannot update client owned by another user"
      );
    }

    const updatedClient = {
      ...prevData,
      name: dto.name || prevData.name,
      email: dto.email || prevData.email,
      phone: dto.phone || prevData.phone,
      updatedAt: new Date(),
    };
    const {id, ...fieldsToUpdate} = updatedClient;
    await clientRef.update(fieldsToUpdate);
    return {...updatedClient} as Client;
  }

  public async deleteClient(dto: DeleteClientDto): Promise<boolean> {
    const clientRef = this.dataBase
      .collection(FIRESTORE_COLLECTIONS.CLIENTS)
      .doc(dto.clientId);
    const clientDoc = await clientRef.get();
    if (!clientDoc.exists) {
      return false;
    }
    const clientData = clientDoc.data() as Client;
    if (clientData.ownerUid !== dto.ownerUid) {
      return false;
    }
    await clientRef.delete();
    return true;
  }
}
