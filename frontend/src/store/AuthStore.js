import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  devtools(
    persist((set) => ({
      userData: null,
      IsAuthenticated: false,
      tokens: {
        access: null,
        refresh: null,
      },
      setlogin: (userdata,token={"access":null,"refresh":null}) =>
        set(() => ({
          userData: userdata,
          IsAuthenticated: true,
          tokens: {
            access: token.access,
            refresh: token.refresh,
          },
        })),
      setlogout: () =>
        set(() => ({
          userData: null,
          IsAuthenticated: null,
        })),
      setTokens: (_access, _refresh) =>
        set(() => ({
          tokens: {
            access: _access,
            refresh: _refresh,
          },
        })),
    }),
    {
      name: "UserState",
      storage: createJSONStorage(() => sessionStorage),
    }),
  )
);
