import { useMutation } from "react-query";
import { POST_USER_SERVICE } from "./keys";
import request from "../../utils/request";
import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { LoginReq, LoginRes } from "./types";

export const useUserLogin = () => {
  const navigator = useNavigate();
  return useMutation(
    [POST_USER_SERVICE],
    async (param: LoginReq): Promise<LoginRes> => {
      if (localStorage.getItem("authToken")) {
        navigator("/");
      }

      const fetchLoginResult = await request.post<
        AxiosResponse<LoginRes>,
        LoginReq
      >("/users/login", param, {});

      return fetchLoginResult.data;
    }
  );
};

export const useUserSignUp = () => {
  return useMutation(
    [POST_USER_SERVICE],
    async (param: LoginReq): Promise<LoginRes> => {
      const fetchLoginResult = await request.post<
        AxiosResponse<LoginRes>,
        LoginReq
      >("/users/create", param, {});

      return fetchLoginResult.data;
    }
  );
};
