"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getPakets } from "@/lib/pakets";

export const PaketsContext = createContext<any[]>([]);

export const PaketsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pakets, setPakets] = useState<any[]>([]);

  useEffect(() => {
    getPakets().then(setPakets);
  }, []);

  return (
    <PaketsContext.Provider value={pakets}>
      {children}
    </PaketsContext.Provider>
  );
};
