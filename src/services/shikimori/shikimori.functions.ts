import { firestoreDB } from "./../../firebase/index";
import {
  AnimeItem,
  AnimeList,
} from "./../../controllers/animedb/animedb.schema";

import { AnimeSeason } from "../../controllers/animedb/animedb.schema";
import { ShikimoriAnimeItem } from "./shikimori.schemas";

export const singleAnimeFormatter = (
  anime: ShikimoriAnimeItem,
  season: AnimeSeason,
  year: number
): AnimeItem => {
  return {
    _id: anime.id,
    sources: ["shikimori"],
    title: anime.name,
    type: anime.kind as "TV",
    episodes: anime.episodes,
    status: anime.status as "CURRENTLY",
    animeSeason: {
      season: season,
      year,
    },
    unacceptable: false,
    picture: anime?.image?.original ?? "",
    thumbnail: anime?.image?.preview ?? "",
    synonyms: [anime.name, anime.russian],
    relations: [""],
    tags: [],
  };
};

export const setOngoingList = async (
  ongoing: AnimeList
): Promise<AnimeItem[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fn = function asyncMultiplyBy2(
        ongoing: AnimeItem
      ): Promise<AnimeItem> {
        return new Promise(async (resolve) => {
          await firestoreDB
            .collection("ongoing")
            .doc(ongoing?._id?.toString() ?? "")
            .set(ongoing);
          resolve(ongoing);
        });
      };
      const result = await foreachPromise(ongoing, fn);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const foreachPromise = (
  items: AnimeList,
  fnPromise: (ongoing: AnimeItem) => Promise<AnimeItem>
) => {
  const actions = Array.from(items).map(fnPromise);
  return Promise.all(actions);
};
