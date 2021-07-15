import { setSchedule, subspleaseSingleFormatter } from "./subsplease.functions";
import { firestoreDB } from "./../../firebase/index";
import { AnimeItem } from "./../../controllers/animedb/animedb.schema";
import { DocumentReference } from "./../../firebase/firebase.schemas";
import {
  CollectionDataSchedule,
  CollectionDateSchedule,
  ScheduleSubspleaseResponse,
  ScheduleSubspleaseType,
} from "./subsplease.schemas";

// Utils
var fetch = require("node-fetch");

export class Subsplease {
  private baseUrl: string = "https://subsplease.org/";
  private scheduleUri = `${this.baseUrl}api/?f=schedule&tz=Europe/Moscow`;
  private interval = 86400000;
  private collection: string;
  constructor(collection: string) {
    this.collection = collection;
  }

  public async getScheduleFromFB(): Promise<CollectionDataSchedule> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.update();
        const ref = await this.firebaseService("calendar");
        const data = (await ref.get()).data();
        resolve(data as CollectionDataSchedule);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Обновление списков
  public async update(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const triggerResult = await this.triggerUpdate();
        if (triggerResult) {
          console.log("---- SUBSPLEASE UPDATE WAS STARTED ----");

          const data = await this.getSchedule();
          await this.setCalendarInFb(data);
        }
      } catch (error) {
        reject(error);
      } finally {
        resolve(true);
      }
    });
  }

  // Нужно ли обновить списки?
  private async triggerUpdate() {
    return new Promise(async (resolve) => {
      const ref = await this.firebaseService("date");
      const data = (await ref.get()).data() as CollectionDateSchedule;
      if (data?.nextUpdate) {
        const next = new Date(data.nextUpdate);
        resolve(new Date() >= next);
      } else {
        resolve(true);
      }
    });
  }
  // Логирование последнего обновления
  private async dateLogger() {
    return new Promise(async (resolve, reject) => {
      try {
        const now = new Date();
        const nextUpdate = new Date(
          now.valueOf() + this.interval
        ).toISOString();
        const updateIn = now.toISOString();
        const ref = await this.firebaseService("date");
        await ref.set({ nextUpdate, updateIn });
        console.log("---------SUBSPLEASE LOGGER END WORK-----------");
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }
  // Форматированные аниме от subsplease, добавляем их в fb коллекцию
  private async setCalendarInFb(
    schedule: ScheduleSubspleaseType
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await setSchedule(schedule.schedule);
        if (result) {
          await this.dateLogger();
          resolve(result);
        } else {
          reject("cant't be set schedule");
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  // Форматирование
  private async toSingleFormat(schedule: ScheduleSubspleaseResponse) {
    return subspleaseSingleFormatter(schedule);
  }
  // Проверка есть ли в firebase
  public async existInFB(doc: DocumentReference): Promise<AnimeItem> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = (await doc.get()).data();
        resolve(data as AnimeItem);
      } catch (error) {
        resolve(undefined);
      }
    });
  }
  // API Schedule
  private async getSchedule(): Promise<ScheduleSubspleaseType> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.scheduleUri;
        const data: ScheduleSubspleaseResponse = await this.fetching(url);
        resolve(this.toSingleFormat(data));
      } catch (error) {
        reject(error);
      }
    });
  }
  // Utils
  private async fetching(url: string) {
    const jsondata = await fetch(url);
    const text: string = await jsondata.text();
    return text && JSON.parse(text);
  }
  protected async refCollection() {
    return await firestoreDB.collection(this.collection);
  }
  private async firebaseService(doc: string) {
    const ref = await this.refCollection();
    return await ref.doc(doc);
  }
  protected async refCollectionAllDocsData(): Promise<any> {
    const ref = await (await this.refCollection()).get();
    const docs = [];
    ref?.docs.forEach((doc) => {
      docs.push(doc.data());
    });
    return docs;
  }
}
