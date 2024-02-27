import { NextRequest, NextResponse } from "next/server";

// 할일 단일조회
export async function GET(request: NextRequest,
    { params }: { params: { slug: string } }) {


    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
   
    const response = {
        message: 'slug ㄷㄷ',
        data: {
            id : params.slug,
            title: '광명',
            time: '2024년 2월 27일W 15시 38분',
            is_done: false,
            query,

        }
    };
   
    return NextResponse.json(response, { status: 200 })
  }

// 할일 단일 삭제 - id
export async function DELETE(request: NextRequest,
    { params }: { params: { slug: string } }) {

    const response = {
        message: '할일 단일 삭제 성공',
        data: {
            id : params.slug,
            title: '광명',
            is_done: false,

        }
    };

    return NextResponse.json(response, { status: 200 })
}

// 할일 단일 수정 - id
export async function POST(request: NextRequest,
    { params }: { params: { slug: string } }) {


    const { title, is_done } = await request.json();

    const editedTodo = {
            id: params.slug,
            title,
            is_done
        }

    const response = {
        message: '할일 단일 수정 성공',
        data: editedTodo
    };

    return NextResponse.json(response, { status: 200 })
}