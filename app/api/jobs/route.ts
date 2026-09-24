import { NextResponse } from "next/server";

const SELFRECRUIT_URL = "https://waymart.selfrecruit.ge/";
const EXCLUDED_TITLES = ["დატოვე cv", "საჩუქარი გელოდება"];

type Vacancy = { title: string; detail: string; url: string };

function decode(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, "„")
    .replace(/&rdquo;/g, "“")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readVacancies(html: string): Vacancy[] {
  const cards = html.split('<div class="pub-grid-element">').slice(1);

  return cards.flatMap((card) => {
    const url = card.match(/<a href="([^"]+)"/)?.[1];
    const title = decode(card.match(/job-vac-title[^>]*>([\s\S]*?)<\/span>/)?.[1] ?? "");
    const description = decode(card.match(/vacancy-description">([\s\S]*?)<\/span>/)?.[1] ?? "");
    const location = description.match(/ლოკაცია:\s*([^;.!]+?)(?=გრაფიკი:|ანაზღაურება:|ბენეფიტები:|ძირითადი|საკვალიფიკაციო|$)/)?.[1]?.trim();

    if (!url || !title || EXCLUDED_TITLES.some((item) => title.toLowerCase().includes(item))) return [];
    return [{ title, detail: location ? `ლოკაცია: ${location}` : "მიმდინარე ვაკანსია", url }];
  });
}

export async function GET() {
  try {
    const response = await fetch(SELFRECRUIT_URL, {
      headers: { "User-Agent": "WayMart Careers vacancy sync" },
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error(`Selfrecruit returned ${response.status}`);
    const vacancies = readVacancies(await response.text());
    return NextResponse.json(
      { vacancies, updatedAt: new Date().toISOString(), source: SELFRECRUIT_URL },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json(
      { vacancies: [], source: SELFRECRUIT_URL, unavailable: true },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
