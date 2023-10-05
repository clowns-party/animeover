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

type DateKeys = keyof JikanScheduleDatesItem

export const subspleaseSingleFormatter = (
  scheduleResponse: JikanScheduleMultipleResponse
): ScheduleSubspleaseType => {
  console.log(JSON.stringify(scheduleResponse))
  try {
    const schedules = scheduleResponse.reduce(
      (schedules, current, index) => {
        const day = dates[index] as DateKeys
        const nextData: JikanScheduleDatesItem = {
          ...schedules,
          [day]: current?.data,
        };
        return nextData;
      },
      {} as JikanScheduleDatesItem
    );

    if (scheduleResponse?.length) {
      const formatted = dates.reduce((schelude, date: DateKeys) => {
        const items: AnimeItemExtended[] =
          schedules[date] &&
          schedules[date]?.length &&
          schedules[date].map(
            (current): AnimeItemExtended => {
              return {
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
                date: current?.aired?.from,
                unacceptable: false,
                picture: current?.images?.jpg?.large_image_url,
                thumbnail: current?.images?.jpg?.small_image_url,
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
