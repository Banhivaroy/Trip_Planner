import Landing from "@/components/Landing";
import { Divide } from "lucide-react";

import { Suspense } from "react";

export default function Home() {
  return (
    <>
    <Suspense fallback = {<div> Loading.....</div>}>
      <Landing/>
    </Suspense>
    
    </>
  );
}
