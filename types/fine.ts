import { GetFineByNumberApiResponse } from "../shared/api/fine/model";

export interface FineData {
  isError: boolean;
  isLoading: boolean;
  data: GetFineByNumberApiResponse | null;
  number?: string;
}
