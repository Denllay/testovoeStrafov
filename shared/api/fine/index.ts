import { createRequest } from "./base";
import { GetFineByNumberApiResponse } from "./model";

export const getFineByNumber = async (number: string) => {
  try {
    const { data } = await createRequest.get<GetFineByNumberApiResponse>(`fines/${number}`);
    return data;
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};
