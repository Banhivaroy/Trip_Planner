// app/summary/page.tsx
import TripSummary from "@/components/TripSummary";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SummaryPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const tripId = typeof resolvedParams.tripId === "string" ? resolvedParams.tripId : undefined;

  return <TripSummary tripId={tripId} />;
}