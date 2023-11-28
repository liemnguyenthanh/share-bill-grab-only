export type RankingType = {
  slug: string;
  name: string;
  payment_period: number;
  date: string;
  price: number;
};

export type UserDataType = {
  name: string[];
  url: string;
};

export type UsersType = {
  name: string;
  price: number;
  check: boolean;
  sheet_name: string;
  sheet_link: string;
  sheet_id: number;
}[];
