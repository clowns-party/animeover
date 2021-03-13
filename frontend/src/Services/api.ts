import axios from "axios";
import { AuthFormData, signInAsyncType, User } from "../bus/auth/types";

export const fetchAuth = (action: signInAsyncType) => {
  const { payload } = action;
  return axios.post<User>("https://animeover-api.herokuapp.com/auth", null, {
    params: {
      email: payload.email,
      password: payload.password,
    },
  });
};

export const sendSignUpData = (authData: AuthFormData) => {
  return axios.post("https://animeover-api.herokuapp.com/auth/signup", null, {
    params: {
      email: authData.email,
      password: authData.password,
    },
  });
};

export const getAnime = () => {
  return axios.get("https://animeover-api.herokuapp.com/animedb");
};
