// Firebase
import { firestoreDB } from "./../firebase/index";

// Generate ids
import { v4 as uuidv4 } from "uuid";

// Get static file
import { getFile } from "./getFile";

export const _createDBCollection = async () => {
  try {
    const list = await getFile();
    const MAX_ANIME = 100000;
    const MIN_ANIME = 50000;
    const MIN_YEAR = 2015;
    list.data.forEach(async (data, idx) => {
      if (
        MIN_ANIME >= idx &&
        idx <= MAX_ANIME &&
        data.animeSeason.year >= MIN_YEAR
      ) {
        let id = uuidv4();
        await firestoreDB
          .collection("animedb")
          .doc(id)
          .set({
            ...data,
            _id: id,
          });
      }
    });
  } catch (error) {
    console.log("ERROR WHEN INSTALLDBLIST", error);
  }
};
