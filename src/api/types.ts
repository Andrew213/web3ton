export interface Player {
  position: number;
  address: string;
  total_bets: number;
}
export interface GetGlobalRatingResponse {
  limit: number;
  page: number;
  total: number;
  users: Player[];
}

export interface Game {
  id: number;
  address: string;
  bet_amount: number;
  win_amount: number;
  time: number;
  is_ton: boolean;
  mode: 0 | 1; // 0 = x2, 1 = x3
  cashback: number;
}

export interface GetGamesResponse {
  total: number;
  page: number;
  limit: number;
  games: Game[];
}

export interface GetUserStatsResponse {
  user_id: number;
  user_addr: string;
  ton_in: number; // Total TON bet
  ton_out: number; // Total TON won
  jetton_in_x2: number; // Total Jettons bet in x2 mode
  jetton_out_x2: number; // Total Jettons won in x2 mode
  jetton_in_x3: number; // Total Jettons bet in x3 mode
  jetton_out_x3: number; // Total Jettons won in x3 mode
  first_bet: number; // Unix timestamp of first bet
  position: number; // Position in global rating (0 if not in rating)
  level: number;
  games: Game[];
  referrer_addr: string;
  registration_time: number;
  verified_refs: number;
}

export interface GetUserExperienceResponse {
  current: number;
  level: number;
  target: number;
}

export interface GetWhitelistResponse {
  whitelisted: boolean;
}

export interface GetRatesResponse {
  rates: Record<
    string,
    {
      prices: Record<string, number>;
      diff_24h: Record<string, string>;
      diff_7d: Record<string, string>;
      diff_30d: Record<string, string>;
    }
  >;
}
