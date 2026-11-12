

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ destinations: [] });
  }

  const apiKey = process.env.LOCATIONIQ_API_KEY;
  

  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/autocomplete?key=${apiKey}&q=${encodeURIComponent(query)}&limit=5&dedupe=1`
    );
    
    const data = await response.json();
    

    const destinations = Array.isArray(data)
      ? data.map((item: any) => ({
          id: item.place_id,
          title: item.display_name.split(",")[0],
          location: item.display_name,
          description: item.display_name,
          category: 'City',
          rating: 4.8,
        }))
      : [];

    return NextResponse.json({ destinations });
  } catch (error) {
    console.log("Location fetching from LocationIQ error:", error);
    return NextResponse.json(
      { error: "failed to fetch destinations" },
      { status: 500 }
    );
  }
}
