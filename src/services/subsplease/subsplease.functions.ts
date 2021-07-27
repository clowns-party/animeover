import {
  AnimeItemExtended,
  JikanScheduleAnimeItem,
  JikanScheduleDatesItem,
  JikanScheduleMultipleResponse,
  ScheduleAnimeItem,
  ScheduleAnimeItemFormatted,
  ScheduleDateItemsFormatted,
  ScheduleSubspleaseResponse,
  ScheduleSubspleaseType,
} from "./subsplease.schemas";

import { v4 as uuidv4 } from "uuid";
import { firestoreDB } from "../../firebase";

export const dates = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const subspleaseSingleFormatter = (
  scheduleResponse: JikanScheduleMultipleResponse
): ScheduleSubspleaseType => {
  try {
    const schedules: JikanScheduleDatesItem = scheduleResponse.reduce(
      (schedules: JikanScheduleDatesItem, current) => {
        const keys = Object.keys(current);
        const day = keys?.length ? keys[keys.length - 1] : "monday";
        const schedule = {
          [day]: current[day],
        };
        schedules = {
          ...schedules,
          ...schedule,
        };
        return schedules as JikanScheduleDatesItem;
      },
      // @ts-ignore
      {}
    );

    if (scheduleResponse?.length) {
      const formatted = dates.reduce((schelude, date) => {
        const items: AnimeItemExtended[] =
          schedules[date] &&
          schedules[date]?.length &&
          schedules[date].map(
            (current: JikanScheduleAnimeItem): AnimeItemExtended => {
              return {
                // ...current,
                _id: uuidv4(),
                sources: ["jikan"],
                title: current?.title,
                type: "Special",
                episodes: 0,
                status: "CURRENTLY",
                animeSeason: {
                  season: "",
                  year: 0,
                },
                date: current?.airing_start,
                unacceptable: false,
                picture: current?.image_url,
                thumbnail: current?.image_url,
                synonyms: [current?.title, current?.synopsis],
                relations: [""],
                tags: [current?.title],
              };
            }
          );

        schelude = {
          ...schelude,
          [date.toUpperCase()]: items?.length ? [...items] : [],
        };

        return schelude;
      }, {});

      return {
        schedule: formatted as ScheduleDateItemsFormatted,
        tz: "Europe/Moscow",
      };
    }
    return undefined;
  } catch (error) {
    console.log(error);
  }
};

export const setSchedule = async (
  schedule: ScheduleDateItemsFormatted
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      await firestoreDB.collection("schedule").doc("calendar").set(schedule);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
