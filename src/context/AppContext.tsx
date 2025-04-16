"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getPakets } from "@/lib/pakets";
import { getGalleries } from "@/lib/galleries";

type AppData = {
  pakets: any[];
  galleries: any[];
  setPakets: React.Dispatch<React.SetStateAction<any[]>>;
  setGalleries: React.Dispatch<React.SetStateAction<any[]>>;
};

export const AppDataContext = createContext<AppData>({
  pakets: [],
  galleries: [],
  setPakets: () => {},
  setGalleries: () => {},
});

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [pakets, setPakets] = useState<any[]>([]);
  const [galleries, setGalleries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [paketsRes, galleriesRes] = await Promise.all([
        getPakets(),
        getGalleries(),
      ]);
      setPakets(paketsRes);
      setGalleries(galleriesRes);
    };

    fetchData();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        pakets,
        galleries,
        setPakets,
        setGalleries,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
