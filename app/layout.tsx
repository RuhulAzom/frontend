import type React from "react";
import { Providers } from "../components/provider/provider";
import ThemeRegistry from "../theme/ThemeRegistry";
import "./global.css";
import AuthenticationProvider from "../components/provider/authentication-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthenticationProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </AuthenticationProvider>
        </Providers>
      </body>
    </html>
  );
}
