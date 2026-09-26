import { Card } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import type { ReactElement } from "react";

export default function MyRequestsTab(): ReactElement {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-10">
      <Card className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6faf7] text-[#0d9488]">
          <ClipboardList size={22} />
        </span>
        <p className="text-sm font-bold text-[#0f172a]">No requests yet</p>
        <p className="max-w-xs text-xs text-[#64748b]">
          Reports and support requests you submit will show up here, along with their status.
        </p>
      </Card>
    </div>
  );
}