export enum TYPE_LAND {
  MAIN = "MAIN",
  TREE = "TREE",
}

export interface LAND {
  id: number;
  row: number;
  col: number;
  price: number;
  type: TYPE_LAND;
}
export interface PLANT {
  id: number;
  name: {
    original: string;
    translated: string;
  };
  price: number;
  harvest_balance: number;
  time_harvest: number;
}
