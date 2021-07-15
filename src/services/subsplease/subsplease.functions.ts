import {
  AnimeItemExtended,
  ScheduleAnimeItem,
  ScheduleAnimeItemFormatted,
  ScheduleDateItemsFormatted,
  ScheduleSubspleaseResponse,
  ScheduleSubspleaseType,
} from "./subsplease.schemas";

import { v4 as uuidv4 } from "uuid";
import { firestoreDB } from "../../firebase";

export const subspleaseSingleFormatter = (
  scheduleResponse: ScheduleSubspleaseResponse
): ScheduleSubspleaseType => {
  const schedule = scheduleResponse?.schedule;
  if (schedule) {
    const dates = Object.keys(schedule);
    const formatted = dates.reduce((schelude, date) => {
      const items: AnimeItemExtended[] = schedule[date].map(
        (current: ScheduleAnimeItem): AnimeItemExtended => ({
          ...current,
          _id: uuidv4(),
          sources: ["subsplease"],
          title: current.title,
          type: "Special",
          episodes: 0,
          status: "CURRENTLY",
          animeSeason: {
            season: "",
            year: 0,
          },
          date: current.time,
          unacceptable: false,
          picture: `https://subsplease.org${current.image_url}`,
          thumbnail: `https://subsplease.org${current.image_url}`,
          synonyms: [current.title],
          relations: [""],
          tags: [current.title],
        })
      );
      schelude = {
        ...schelude,
        [date]: [...items],
      };
      return schelude;
    }, {});
    return {
      schedule: formatted as ScheduleDateItemsFormatted,
      tz: scheduleResponse.tz,
    };
  }
  return undefined;
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
