export const prerender = false;
import type { APIRoute } from "astro";
import axios from "axios";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { baseName, data } = await request.json();
    const AIRTABLE_URL =
      import.meta.env.AIRTABLE_BASE ??
      "https://api.airtable.com/v0/";
    const AIRTABLEBASEID = import.meta.env.AIRTABLE_BASE_ID;

    const response = await axios.post(`${AIRTABLE_URL}${AIRTABLEBASEID}/${baseName}`, data, {
      headers: {
        Authorization: `Bearer ${import.meta.env.AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return new Response(
      JSON.stringify({ id: response.data.records[0].id }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
};