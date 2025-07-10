import axios from "axios";

import { errorHandler } from "../axios";
import { GetRatesResponse } from "../types";

const getRates = async (tokens: string) => {
  try {
    const url = "https://tonapi.io/v2/rates";
    const params = {
      tokens,
      currencies: "ton",
    };
    const response = await axios.get<GetRatesResponse>(url, { params });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export default getRates;
