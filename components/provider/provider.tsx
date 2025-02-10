"use client";

import { Provider } from "react-redux";
import type React from "react"; // Added import for React
import { store } from "../../store/store";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </Provider>
  );
}
