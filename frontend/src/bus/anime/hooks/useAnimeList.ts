import { useSelector } from "react-redux";
import { AppState } from "../../../init/rootReducer";
import { AnimeState } from "../reducer";

export const useAnimelist = (): AnimeState => {
  const { anime, isFetching, error } = useSelector<AppState, AnimeState>(
    (state) => state.animeReducer
  );

  return { anime, isFetching, error };
};
