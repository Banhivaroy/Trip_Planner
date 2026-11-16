
import { Suspense } from "react";
import TripSummary from "@/components/TripSummary";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function SummaryContent({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const tripId = typeof resolvedParams.tripId === "string" ? resolvedParams.tripId : undefined;

  return <TripSummary tripId={tripId} />;
}

export default function SummaryPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div>Loading trip summary...</div>}>
      <SummaryContent searchParams={searchParams} />
    </Suspense>
  );
}