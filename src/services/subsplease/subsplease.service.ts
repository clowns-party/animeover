import { setSchedule, subspleaseSingleFormatter } from "./subsplease.functions";
import {
  JikanScheduleMultipleResponse,
  ScheduleSubspleaseResponse,
  ScheduleSubspleaseType,
} from "./subsplease.schemas";
import { AbstractIntegrate } from "../AbstractIntegrate";

export class Subsplease extends AbstractIntegrate {
  private scheduleUri = `${this.baseUrl}api/?f=schedule&tz=Europe/Moscow`;

  constructor(collection: string) {
    super({
      collectionName: collection,
      baseUrl: "https://api.jikan.moe/v3/schedule/",
    });
  }

  async callEndpoint(): Promise<ScheduleSubspleaseType> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.multipleFetch();
        resolve(this.toSingleFormat(data));
      } catch (error) {
        reject(error);
      }
    });
  }

  async multipleFetch(): Promise<JikanScheduleMultipleResponse> {
    const dates = [
      this.wait(this.baseUrl + "monday"),
      this.wait(this.baseUrl + "tuesday"),
      this.wait(this.baseUrl + "wednesday"),
      this.wait(this.baseUrl + "thursday"),
      this.wait(this.baseUrl + "friday"),
      this.wait(this.baseUrl + "saturday"),
      this.wait(this.baseUrl + "sunday"),
    ];
    return Promise.all(dates).then((results) => {
      return results;
    });
  }

  async wait(endpoint: string, ms = 2500): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.fetching(endpoint).then((res) => resolve(res));
      }, ms);
    });
  }

  // Форматированные аниме от subsplease, добавляем их в fb коллекцию
  async firebaseSetter(schedule: ScheduleSubspleaseType): Promise<boolean> {
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
  toSingleFormat(schedule: JikanScheduleMultipleResponse) {
    return subspleaseSingleFormatter(schedule);
  }
}
