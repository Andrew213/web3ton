/* eslint-disable camelcase */
import { api, errorHandler } from "@/api/axios";

export const registerUser = async (
  address: string,
  referrer_addr: string | null,
) => {
  try {
    const response = await api.postData(
      "/register",
      JSON.stringify({
        address,
        referrer_addr,
      }),
    );
    return response;
  } catch (error) {
    errorHandler(error);
  }
};
