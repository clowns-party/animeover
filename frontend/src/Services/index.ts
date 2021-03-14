import Cookies from "js-cookie";
// Core
import axios, { AxiosInstance, AxiosResponse } from "axios";
// Types
import { AuthFormData, User, UserSchema } from "../bus/auth/types";
import { Anime } from "../bus/anime/types";

export class Api {
  public baseUrl: string;
  public instance: AxiosInstance;

  constructor() {
    this.baseUrl = "https://animeover-api.herokuapp.com";
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: Cookies.get("token") ?? "",
      },
    });
    // Methods
    this.animeList = this.animeList.bind(this);
    this.signUp = this.signUp.bind(this);
    this.auth = this.auth.bind(this);
  }

  auth(payload: AuthFormData): Promise<AxiosResponse<User>> {
    return this.instance.post<User>("/auth", null, {
      params: {
        email: payload.email,
        password: payload.password,
      },
    });
  }

  signUp(authData: AuthFormData): Promise<AxiosResponse<UserSchema>> {
    return this.instance.post<UserSchema>("/auth/signup", null, {
      params: {
        email: authData.email,
        password: authData.password,
      },
    });
  }

  animeList(): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>("/animedb");
  }
}

export const service = new Api();