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