import { api, errorHandler } from "@/api/axios";
import { GetGlobalRatingResponse } from "@/api/types";

export const GetGlobalRating = async (data?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await api.getData<GetGlobalRatingResponse>(
      `/stats/rating`,
      { params: { page: data?.page, limit: data?.limit } },
    );
    return response;
  } catch (error) {
    errorHandler(error);
  }
};
