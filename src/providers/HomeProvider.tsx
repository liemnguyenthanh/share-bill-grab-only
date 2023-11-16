'use client';
import { DishType, ESteps, FeeType } from '@/types';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

type HomeType = {
  dishItems: DishType[];
  updateDishItems: (items: DishType[]) => void;
  fees: FeeType | null
  updateFees: (value: FeeType) => void;
  totalMembers: number;
  updateTotalMembers: (value: number) => void;
  stepActive: number;
  updateStep: (value: number) => void;
};

export const HomeContext = createContext<HomeType>({
  dishItems: [],
  updateDishItems: () => { },
  fees: null,
  updateFees: () => { },
  totalMembers: 0,
  updateTotalMembers: () => { },
  stepActive: ESteps.DISH,
  updateStep: () => { },
});

type Props = PropsWithChildren;

export const HomeProvider = ({ children }: Props) => {
  const [dishItems, setDishItems] = useState<DishType[]>([]);
  const [fees, setFees] = useState<FeeType | null>(null);
  const [totalMembers, setTotalMembers] = useState(0)
  const [stepActive, setActiveStep] = useState<ESteps>(ESteps.DISH)

  const updateDishItems = (items: DishType[]) => {
    setDishItems(items)
  }

  const updateFees = (value: FeeType) => {
    setFees(value)
  }

  const updateTotalMembers = (value: number) => {
    setTotalMembers(value)
  }

  const updateStep = (id: ESteps) => {
    setActiveStep(id)
  }

  return (
    <HomeContext.Provider
      value={{
        dishItems,
        updateDishItems,
        fees,
        updateFees,
        totalMembers,
        updateTotalMembers,
        stepActive,
        updateStep
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);