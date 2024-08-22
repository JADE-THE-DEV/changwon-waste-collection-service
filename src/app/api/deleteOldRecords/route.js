import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET() {
  const {
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID,
    AIRTABLE_ORDERS_TABLE,
    AIRTABLE_VIEW_TWO,
  } = process.env;

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  try {
    // 1. 레코드 가져오기
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_ORDERS_TABLE}?view=${AIRTABLE_VIEW_TWO}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `API 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    const { records } = await response.json();

    if (!records || records.length === 0) {
      throw new Error(
        "API 응답에 records가 없거나 필터링된 레코드가 없습니다."
      );
    }

    console.log("API 응답:", records);

    // 2. 필터링
    const recordsToDelete = records.filter((record) => {
      const createdTime = new Date(record.fields["test_created"]);
      return createdTime < oneYearAgo;
    });

    // 3. 레코드 삭제
    for (let record of recordsToDelete) {
      const deleteResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_ORDERS_TABLE}/${record.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        console.error(
          `Failed to delete record ${record.id}: ${deleteResponse.status} ${deleteResponse.statusText}`
        );
      } else {
        console.log(`Deleted record ${record.id}`);
      }
    }

    return NextResponse.json({
      message: `${recordsToDelete.length} records deleted.`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to delete old records: ${error.message}` },
      { status: 500 }
    );
  }
}
