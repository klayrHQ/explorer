import { NextResponse } from "next/server";
import chains from "../../../../assets/mock/chains/chains.json";

export const GET = async () => {
  return NextResponse.json({chains,});
};