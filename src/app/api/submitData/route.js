import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req) {
  const {
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID,
    AIRTABLE_ORDERS_TABLE,
    AIRTABLE_VIEW_ONE,
  } = process.env;

  const body = await req.json(); // 요청 본문에서 데이터 가져오기
  const { fields } = body; // fields로 접근

  const airtableResponse = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_ORDERS_TABLE}?view=${AIRTABLE_VIEW_ONE}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  if (airtableResponse.ok) {
    return NextResponse.json({ message: "Success" });
  } else {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
