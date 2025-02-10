"use client";

import { useEffect } from "react";
import { userApi } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions";
import { usePathname, useRouter } from "next/navigation";

export default function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const isInAuth =
    pathname.toLocaleLowerCase().includes("login") ||
    pathname.toLocaleLowerCase().includes("register");

  useEffect(() => {
    userApi.isAutenticated().then((data) => {
      if (!data) {
        return;
      }
      console.log({ data });
      dispatch(
        setUser({
          id: data.data.id,
          email: data.data.email,
          name: data.data.name,
        })
      );
      if (isInAuth) {
        router.back();
      }
    });
  }, []);

  return <>{children}</>;
}
