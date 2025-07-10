import { Address } from "@ton/core";

import { api, errorHandler } from "@/api/axios";
import { GetUserExperienceResponse } from "@/api/types";

export const GetUserExperience = async (address: Address) => {
  try {
    const response = await api.getData<GetUserExperienceResponse>(
      `/xp/${address}`,
    );
    return response;
  } catch (error) {
    errorHandler(error);
  }
};
