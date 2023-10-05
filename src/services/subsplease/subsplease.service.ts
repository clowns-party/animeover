import {
  dates,
  setSchedule,
  subspleaseSingleFormatter,
} from "./subsplease.functions";
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
      baseUrl: "https://api.jikan.moe/v4/schedules",
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
    const datesEndpont = dates.map((date) => `${this.baseUrl}/${date}`);
  
    const responses = await datesEndpont.reduce(async (lastPromise, url) => {
      const accum = await lastPromise;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await this.fetching(url);
      return [...accum, response];
    }, Promise.resolve([]));

    return responses;
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
