import { LAND, PLANT, TYPE_LAND } from "./types/game-type";

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;

export const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_USER_PWD || "",
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10"),
};

export const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"),
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
};

export const corsUrl = process.env.CORS_URL || "*";

export const A_MINUTE = 1000 * 60;

export const PRICE_LAND_BUY = 400000;
export const lands: LAND[] = [
  {
    id: 1,
    row: 9,
    col: 2,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 2,
    row: 9,
    col: 3,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 3,
    row: 9,
    col: 4,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 4,
    row: 9,
    col: 5,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 5,
    row: 10,
    col: 2,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 6,
    row: 10,
    col: 3,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 7,
    row: 10,
    col: 4,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 8,
    row: 10,
    col: 5,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 9,
    row: 11,
    col: 2,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 10,
    row: 11,
    col: 3,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 11,
    row: 11,
    col: 4,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 12,
    row: 11,
    col: 5,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 13,
    row: 12,
    col: 2,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 14,
    row: 12,
    col: 3,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 15,
    row: 12,
    col: 4,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 16,
    row: 12,
    col: 5,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },

  //------

  {
    id: 17,
    row: 9,
    col: 8,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 18,
    row: 9,
    col: 9,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 19,
    row: 9,
    col: 10,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 20,
    row: 9,
    col: 11,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },

  {
    id: 21,
    row: 10,
    col: 8,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 22,
    row: 10,
    col: 9,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 23,
    row: 10,
    col: 10,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 24,
    row: 10,
    col: 11,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 25,
    row: 11,
    col: 8,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 26,
    row: 11,
    col: 9,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 27,
    row: 11,
    col: 10,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 28,
    row: 11,
    col: 11,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 29,
    row: 12,
    col: 8,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 30,
    row: 12,
    col: 9,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 31,
    row: 12,
    col: 10,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
  {
    id: 32,
    row: 12,
    col: 11,
    price: PRICE_LAND_BUY,
    type: TYPE_LAND.MAIN,
  },
];
export const plants: PLANT[] = [
  {
    id: 1,
    harvest_balance: 15000,
    name: {
      original: "carot",
      translated: "Carot",
    },
    price: 10000,
    time_harvest: A_MINUTE,
  },
];
