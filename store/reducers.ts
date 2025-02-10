import { createReducer } from "@reduxjs/toolkit";
import { setUser, clearUser, updateUser } from "./actions";

interface UserState {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  isAuthenticated: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    })
    .addCase(clearUser, (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.isAuthenticated = false;
    })
    .addCase(updateUser, (state, action) => {
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.email) state.email = action.payload.email;
    });
});

export default userReducer;
