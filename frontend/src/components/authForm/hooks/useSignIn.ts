import { useSelector } from "react-redux";
import { AppState } from "../../../init/rootReducer";
import { AuthState } from "../reducer";

export const useSignIn = (): AuthState => {
  const { isFetching, data, error } = useSelector<AppState, AuthState>(
    (state) => state.auth
  );

  return { isFetching, data, error };
};
