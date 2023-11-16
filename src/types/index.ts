export type DishType = {
  amount: number;
  name: string;
  optionals?: string[]
  price: number
}

export type FeeType = {
  subtotal: number;
  shipping: number;
  discount: number;
}

export enum ESteps {
  DISH = 0,
  FEES = 1,
  TOTAL_USER = 2,
  RESULT = 3
}