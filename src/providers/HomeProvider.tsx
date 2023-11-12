'use client';
import { DishType, FeeType } from '@/types';
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react';

type HomeType = {
  dishItems: DishType[];
  updateDishItems: (items: DishType[]) => void;
  fees: FeeType | null
  updateFees: (value: FeeType) => void
};

export const HomeContext = createContext<HomeType>({
  dishItems: [],
  updateDishItems: () => { },
  fees: null,
  updateFees: () => { }
});

type Props = PropsWithChildren;

export const HomeProvider = ({ children }: Props) => {
  const [dishItems, setDishItems] = useState<DishType[]>([]);
  const [fees, setFees] = useState<FeeType | null>(null);

  const updateDishItems = (items: DishType[]) => {
    setDishItems(items)
  }

  const updateFees = (value: FeeType) => {
    setFees(value)
  }

  return (
    <HomeContext.Provider
      value={{
        dishItems,
        updateDishItems,
        fees,
        updateFees
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};