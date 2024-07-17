import { NextResponse } from "next/server";
import events from "../../../../assets/mock/events/events.json";

export const GET = async () => {
  return NextResponse.json({events,});
};