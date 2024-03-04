import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    const response = {
        message: '정자역',
        time: '2024년 2월 27일 15시 26분',
    };
   
    return NextResponse.json(response, { status: 200 })
  }