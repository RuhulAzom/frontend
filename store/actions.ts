import { createAction } from "@reduxjs/toolkit";

export const setUser = createAction<{
  id: string;
  name: string;
  email: string;
}>("user/setUser");

export const clearUser = createAction("user/clearUser");

export const updateUser = createAction<{
  name: string;
  email: string;
}>("user/updateUser");
