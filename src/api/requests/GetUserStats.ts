import { Address } from "@ton/core";

import { api, errorHandler } from "@/api/axios";
import { GetUserStatsResponse } from "@/api/types";

export const GetUserStats = async (address: Address) => {
  try {
    const response = await api.getData<GetUserStatsResponse>(
      `/stats/user/${address}`,
    );
    return response;
  } catch (error) {
    errorHandler(error);
  }
};
