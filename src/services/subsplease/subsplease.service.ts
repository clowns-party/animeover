import { setSchedule, subspleaseSingleFormatter } from "./subsplease.functions";
import {
  ScheduleSubspleaseResponse,
  ScheduleSubspleaseType,
} from "./subsplease.schemas";
import { AbstractIntegrate } from "../AbstractIntegrate";

export class Subsplease extends AbstractIntegrate {
  private scheduleUri = `${this.baseUrl}api/?f=schedule&tz=Europe/Moscow`;

  constructor(collection: string) {
    super({ collectionName: collection, baseUrl: "https://subsplease.org/" });
  }

  async callEndpoint(): Promise<ScheduleSubspleaseType> {
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
  toSingleFormat(schedule: ScheduleSubspleaseResponse) {
    return subspleaseSingleFormatter(schedule);
  }
}
