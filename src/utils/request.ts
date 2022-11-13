import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import isNil from "lodash/isNil";

function getAccessToken(useTempToken?: boolean) {
  return "";
}

const request = {
  get<T>(
    url: string,
    options?: AxiosRequestConfig,
    useTempToken?: boolean
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const headers: AxiosRequestHeaders = {
        ...options?.headers,
      } as AxiosRequestHeaders;

      headers["Authorization"] = await getAccessToken(useTempToken);

      try {
        axios
          .get<T>(url, { ...options, headers })
          .then((res) => {
            if (res.data) {
              resolve(res.data);
            } else {
              reject({ error: { message: "empty-data" } });
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  post<T, R = Array<[string, unknown]>>(
    url: string,
    body: R,
    options?: AxiosRequestConfig,
    useTempToken?: boolean
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const headers: AxiosRequestHeaders = {
        ...options?.headers,
      } as AxiosRequestHeaders;

      headers["Authorization"] = await getAccessToken(useTempToken);

      try {
        axios
          .post<T>(url, body, { ...options, headers })
          .then((res) => {
            if (!isNil(res.data)) {
              resolve(res.data);
            } else {
              reject({ error: { message: "empty-data" } });
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  put<T, R = Array<[string, unknown]>>(
    url: string,
    body: R,
    options?: AxiosRequestConfig,
    useTempToken?: boolean
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const headers: AxiosRequestHeaders = {
        ...options?.headers,
      } as AxiosRequestHeaders;

      headers["Authorization"] = await getAccessToken(useTempToken);
      try {
        axios
          .put<T>(url, body, { ...options, headers })
          .then((res) => {
            if (!isNil(res.data)) {
              resolve(res.data);
            } else {
              reject({ error: { message: "empty-data" } });
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  delete<T>(
    url: string,
    options?: AxiosRequestConfig,
    useTempToken?: boolean
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const headers: AxiosRequestHeaders = {
        ...options?.headers,
      } as AxiosRequestHeaders;
      headers["Authorization"] = await getAccessToken(useTempToken);

      try {
        axios
          .delete<T>(url, { ...options, headers })
          .then((res) => {
            if (!isNil(res.data)) {
              resolve(res.data);
            } else {
              reject({ error: { message: "empty-data" } });
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default request;
