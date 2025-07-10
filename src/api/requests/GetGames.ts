import { Address } from "@ton/core";

import { api, errorHandler } from "@/api/axios";
import { GetGamesResponse } from "@/api/types";

export const GetGames = async (
  address?: Address,
  data?: { page?: number; limit?: number },
) => {
  try {
    const params = new URLSearchParams();
    if (data) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(data)) {
        if (value) {
          params.append(key, String(value));
        }
      }
    }
    const response = await api.getData<GetGamesResponse>(
      `/games${address ? `/${address}` : ""}`,
      params.toString() ? { params } : {},
    );

    return response;
  } catch (error) {
    errorHandler(error);
  }
};
