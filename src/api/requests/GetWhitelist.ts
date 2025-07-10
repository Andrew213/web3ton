import { Address } from "@ton/core";

import { api, errorHandler } from "@/api/axios";
import { GetWhitelistResponse } from "@/api/types";

export const GetWhiteList = async (address?: Address) => {
  try {
    const response = await api.getData<GetWhitelistResponse>(
      `/whitelist/${address}`,
    );
    return response;
  } catch (error) {
    errorHandler(error);
  }
};
