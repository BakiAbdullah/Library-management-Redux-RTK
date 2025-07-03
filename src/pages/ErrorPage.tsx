import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button } from "@/components/ui/button";

export  function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "Something went wrong!";
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
      {statusCode && (
        <p className="text-2xl font-semibold text-gray-800">
          Error {statusCode}
        </p>
      )}
      <p className="text-gray-600 mb-6">{errorMessage}</p>

      <Button
        onClick={() => (window.location.href = "/")}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Go to Home
      </Button>
    </div>
  );
}
