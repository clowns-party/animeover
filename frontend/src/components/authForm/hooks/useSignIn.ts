import { useSelector } from "react-redux";
import { AppState } from "../../../init/rootReducer";
import { AuthFormState } from "../reducer";

export const useSignIn = (): AuthFormState => {
  const { isFetching, error } = useSelector<AppState, AuthFormState>(
    (state) => state.authForm
  );

  return { isFetching, error };
};
