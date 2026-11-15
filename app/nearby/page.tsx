import { Suspense } from "react";
import NearbyHotelsSearch from "@/components/NearbyHotels"; 

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading trip details...</div>}>
      <NearbyHotelsSearch />
    </Suspense>
  );
}