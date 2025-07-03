import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="flex items-center space-x-4">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
        <span className="text-xl font-semibold text-gray-700">
          Loading...
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Please wait while we bring your information.
      </p>
    </div>
  );
}
