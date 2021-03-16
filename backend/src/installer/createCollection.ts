// Firebase
import { firestoreDB } from "./../firebase/index";

// Generate ids
import { v4 as uuidv4 } from "uuid";

// Get static file
import { getFile } from "./getFile";

export const _createDBCollection = async () => {
  try {
    const list = await getFile();
    const MAX_ANIME = 150000;
    // const MIN_ANIME = 0;
    const MIN_YEAR = 2000;
    list.data.forEach(async (data, idx) => {
      if (idx <= MAX_ANIME && data.animeSeason.year >= MIN_YEAR) {
        let id = uuidv4();
        await firestoreDB
          .collection("animedb")
          .doc(id)
          .set({
            ...data,
            // флаг для цензуры
            // unacceptable: data.tags.includes("drama"),
            _id: id,
          });
      }
    });
  } catch (error) {
    console.log("ERROR WHEN INSTALLDBLIST", error);
  }
};
