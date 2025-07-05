// components/SingleBookModal.tsx
import {  DialogTitle } from "@/components/ui/dialog";
import { useGetSingleBookQuery } from "@/redux/api/bookApi";

interface SingleBookModalProps {
  bookId: string | null;
}

export default function SingleBookModal({ bookId }: SingleBookModalProps) {
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetSingleBookQuery(bookId!, {
    skip: !bookId,
  });

  // Extracting book data from the response
  const book = responseData?.data
  console.log({ book }, "from sinngle book");

  if (!bookId) return null;

  return (
    <>
      <DialogTitle className="text-3xl font-bold text-center text-amber-500 mb-2">
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading book details ...</p>
        ) : isError ? (
          <p className="text-red-5\
          `00">
            Failed to load book.... {(error as any)?.message}
          </p>
        ) : (
          <div className="space-y-1">
          
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {book?.title}
            </h2>

          
            <p className="text-center text-sm text-gray-500 italic">
              by <span className="font-medium">{book?.author}</span>
            </p>

            <div className="h-[1px] bg-gray-200 my-4" />


            <p className="text-sm text-gray-500 leading-relaxed">
              {book?.description || "No description available."}
            </p>

            
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
              <div>
                <span className="font-semibold text-gray-800">Genre:</span>{" "}
                {book?.genre}
              </div>
              <div>
                <span className="font-semibold text-gray-800">ISBN:</span>{" "}
                {book?.isbn}
              </div>
              <div>
                <span className="font-semibold text-gray-800">
                  Available Copies:
                </span>{" "}
                {book?.copies}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Status:</span>{" "}
                {book?.available ? (
                  <span className="text-green-600 font-semibold">
                    Available
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogTitle>
    </>
  );
}
