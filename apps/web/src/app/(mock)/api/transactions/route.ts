import { NextResponse } from "next/server";
import transactions from "../../../../assets/mock/transactions/transactions.json";

export const GET = async () => {
  return NextResponse.json({transactions});
};