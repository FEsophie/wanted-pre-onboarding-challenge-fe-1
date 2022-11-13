import { useMutation, useQuery } from "react-query";
import request from "../../utils/request";
import { AxiosResponse } from "axios";
import {
  AddTodoReq,
  AddTodoRes,
  DeleteTodoRes,
  GetTodoRes,
  UpdateTodoReq,
  UpdateTodoRes,
} from "./types";
import {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  GET_TODO_LIST,
  UPDATE_TODO_ITEM,
} from "./keys";

export const useGetTodoList = () => {
  return useQuery(
    [GET_TODO_LIST],
    async () => {
      const response = await request.get<AxiosResponse<GetTodoRes[]>>(`/todos`);
      return response.data || {};
    },
    {
      refetchOnMount: false,
    }
  );
};

export const useGetTodoItemById = (id: string) => {
  return useQuery(
    [GET_TODO_LIST, id],
    async () => {
      const response = await request.get<AxiosResponse<GetTodoRes>>(
        `/todos/${id}`
      );
      return response.data || {};
    },
    {
      refetchOnMount: false,
    }
  );
};

export const useCreateTodoItem = () => {
  return useMutation(
    [ADD_TODO_ITEM],
    async (param: AddTodoReq): Promise<AddTodoRes> => {
      const response = await request.post<
        AxiosResponse<AddTodoRes>,
        AddTodoReq
      >("/todos", param, {});

      return response.data;
    }
  );
};

export const useUpdateTodoItem = (id: string) => {
  return useMutation(
    [UPDATE_TODO_ITEM],
    async (param: UpdateTodoReq): Promise<UpdateTodoRes> => {
      const response = await request.put<
        AxiosResponse<UpdateTodoRes>,
        AddTodoReq
      >(`/todos/${id}`, param, {});

      return response.data;
    }
  );
};

export const useDeleteTodoItem = () => {
  return useMutation(
    [DELETE_TODO_ITEM],
    async (id: string): Promise<DeleteTodoRes> => {
      const response = await request.delete<AxiosResponse<DeleteTodoRes, {}>>(
        `/todos/${id}`
      );

      return response.data;
    }
  );
};
