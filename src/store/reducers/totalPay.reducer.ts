import { Product } from "../../pages/interface/product-interface";

export interface StateTotal {
  totalPricePay: Product[]; // totalPricePay holds an array of products
  total: number; // Total is a number
}

type Action = { type: "TOTAL_PAY"; payload: Product[] }; // Action type for TOTAL_PAY

const initState: StateTotal = {
  totalPricePay: [],
  total: 0,
};

const totalPrice = (
  state: StateTotal = initState,
  action: Action
): StateTotal => {
  let totalPricePay: Product[] = [];

  switch (action.type) {
    case "TOTAL_PAY":
      totalPricePay = action.payload;
      break;

    default:
      return state;
  }

  let total = 0;
  for (let item of totalPricePay) {
    total += item.subTotal;
  }

  return {
    totalPricePay,
    total,
  };
};

export default totalPrice;
