import { NextRequest, NextResponse } from "next/server";
import transactions from "../../../../../assets/mock/transactions/transactions.json";

export const GET = async (req: NextRequest) => {
  // ! not pretty but temporary anyway, cant get the query params 
  const id = req.url?.split('/').at(-1);
  const transaction = transactions.find((transaction: any) => transaction.id === id);

  if (!transaction) {
    return NextResponse.json({ message: 'Transaction not found.', });
  }
  
  return NextResponse.json({transaction,});
};