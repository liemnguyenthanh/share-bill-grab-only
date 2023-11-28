import { SHEET_URL } from '@/constants';
import { UsersType } from '@/types';

export const getUnpaidUsers = async (): Promise<UsersType> => {
  const data = await fetch(SHEET_URL);
  const response = await data.json();
  return response;
};
