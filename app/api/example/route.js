import { NextResponse } from "next/server";

export async function GET() {
    const resp = await fetch(`https://dummy.restapiexample.com/api/v1/employees`)
    const data = await resp.json()
    
    return  Response.json({data})
}