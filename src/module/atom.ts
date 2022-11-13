import { atom, selector } from "recoil";

export interface loginUserValue {
  userEmail: string;
}

export const loginUser = atom<loginUserValue>({
  key: "loginState",
  default: {
    userEmail: "",
  },
});

export const selectLoginUser = selector<loginUserValue>({
  key: "selectToDos",
  get: ({ get }) => {
    const userEmail = get(loginUser);
    return userEmail;
  },
});
