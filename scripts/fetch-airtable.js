import 'dotenv/config';
import fs from "node:fs/promises";
import path from "node:path";

const token = process.env.AIRTABLE_TOKEN;
const baseId = process.env.AIRTABLE_BASE_ID;
const table = process.env.AIRTABLE_TABLE;

if (!token || !baseId || !table) {
  console.error("Missing env vars: AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE");
  process.exit(1);
}

const outFile = path.resolve("src/data/jobs.json");

async function fetchAll() {
  const all = [];
  let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}?pageSize=100&filterByFormula={Status}='Publish'`;
  const headers = { Authorization: `Bearer ${token}` };

  while (url) {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Airtable error ${res.status}: ${text}`);
    }
    const data = await res.json();
    //shape of yta data set
    for (const r of data.records) {
      all.push({
        id: r.id,
        ...r.fields,
        updatedAt: r.fields["Last Modified"] || r.createdTime,
      });
    }
    url = data.offset
      ? `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}?pageSize=100&offset=${data.offset}`
      : null;
  }
  return all;
}

const jobs = await fetchAll();

await fs.mkdir(path.dirname(outFile), { recursive: true });

await fs.writeFile(outFile, JSON.stringify(jobs, null, 2), "utf-8");
console.log(`Wrote ${jobs.length} records → ${outFile}`);
