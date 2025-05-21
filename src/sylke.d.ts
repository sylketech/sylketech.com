declare global {
  interface Window {
    __SYLKE_UPDATE_THEME: (theme: "light" | "dark" | "system") => void;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}

export {};
