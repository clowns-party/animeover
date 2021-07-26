import { firestoreDB } from "../firebase";
import { CollectionDateLogger } from "./AbstractIntegrate.types";

// Utils
var fetch = require("node-fetch");

export abstract class AbstractIntegrate {
  protected baseUrl: string;
  private interval = 86400000;
  private collectionName: string;
  private withLogger: boolean;
  constructor({ collectionName, withLogger = true, baseUrl }) {
    this.collectionName = collectionName;
    this.withLogger = withLogger;
    this.baseUrl = baseUrl;
  }

  public async getServiceData<CollectionData, CallResult>(
    doc: string,
    withUpdate?: boolean
  ): Promise<CollectionData> {
    return new Promise(async (resolve, reject) => {
      try {
        withUpdate && (await this.update<CallResult>());
        const ref = await this.firebaseService(doc);
        const data = (await ref.get()).data();
        resolve(data as CollectionData);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Обновление списков
  public async update<CallResult>(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const triggerResult = await this.triggerUpdate();
        if (triggerResult) {
          console.log(`---- ${this.collectionName} UPDATE WAS STARTED ----`);
          const data = (await this.callEndpoint()) as CallResult;
          await this.save<CallResult>(data);
        }
      } catch (error) {
        reject(error);
      } finally {
        resolve(true);
      }
    });
  }

  // Нужно ли обновить списки?
  private async triggerUpdate(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const ref = await this.firebaseService("date");
      const data = (await ref.get()).data() as CollectionDateLogger;
      if (data?.nextUpdate) {
        const next = new Date(data.nextUpdate);
        resolve(new Date() >= next);
      } else {
        resolve(true);
      }
    });
  }
  // Логирование последнего обновления
  protected async dateLogger(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const now = new Date();
        const nextUpdate = new Date(
          now.valueOf() + this.interval
        ).toISOString();
        const updateIn = now.toISOString();
        const ref = await this.firebaseService("date");
        await ref.set({ nextUpdate, updateIn });
        console.log(
          `--------- ${this.collectionName} LOGGER END WORK-----------`
        );
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }
  // Форматирование и добавляние данных в fb коллекцию
  private async save<Data>(data: Data): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.firebaseSetter(data);
        if (result) {
          this.withLogger && (await this.dateLogger());
          resolve(result);
        } else {
          reject(
            `Cant't be save ${this.collectionName}, wrong fetch or single formatter.`
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  abstract callEndpoint();
  abstract toSingleFormat(param: any);
  abstract firebaseSetter(param: any): Promise<boolean>;

  protected async fetching(url: string) {
    const jsondata = await fetch(url);
    const text: string = await jsondata.text();
    return text && JSON.parse(text);
  }
  protected async refCollection() {
    return await firestoreDB.collection(this.collectionName);
  }
  protected async firebaseService(doc: string) {
    const ref = await this.refCollection();
    return await ref.doc(doc);
  }
  protected async refCollectionAllDocsData<T>(): Promise<T[]> {
    const ref = await (await this.refCollection()).get();
    const docs = [];
    ref?.docs.forEach((doc) => {
      docs.push(doc.data());
    });
    return docs;
  }
}
