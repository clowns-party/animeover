// Firebase
import { firestoreDB } from "./../firebase/index";

// Generate ids
import { v4 as uuidv4 } from "uuid";

// Get static file
import { getFile } from "./getFile";

export const _createDBCollection = async () => {
  try {
    const list = await getFile();
    // temp method
    for (const data of list.data) {
      let id = uuidv4();
      await firestoreDB
        .collection("animedb")
        .doc(id)
        .set({
          ...data,
          _id: id,
        });
    }
  } catch (error) {
    console.log("ERROR WHEN INSTALLDBLIST", error);
  }
};
