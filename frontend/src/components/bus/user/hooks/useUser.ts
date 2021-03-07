import { useSelector } from "react-redux";
import { AppState } from "../../../../init/rootReducer";
import { AuthState } from "../reducer";

export const useUser = (): AuthState => {
  const { data } = useSelector<AppState, AuthState>((state) => state.auth);

  return { data };
};
