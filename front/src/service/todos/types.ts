export interface GetTodoRes {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddTodoReq {
    title: string;
    content: string;
}

export interface AddTodoRes {
    title: string;
    content: string;
}

export interface UpdateTodoReq {
    title: string;
    content: string;
}

export interface UpdateTodoRes {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface DeleteTodoRes {
    data: null;
}
