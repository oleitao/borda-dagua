import { NextResponse } from "next/server";

export async function GET(req, res) {
  return new NextResponse(JSON.stringify({ ping: "pong" }), {
    status: 200,
  });
}