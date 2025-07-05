import Loader from "@/components/layout/Loader";
import { useGetBorrowBookSummaryQuery } from "@/redux/api/bookApi";


export default function Borrow() {
  const { data: borrowData, isLoading } = useGetBorrowBookSummaryQuery({
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <Loader />;
  // ensuring booksResponse is an array
  const borrowBooksData: any = Array.isArray(borrowData?.data)
    ? borrowData?.data
    : [];


  return (
    <div className="w-full mx-auto">
      {/* Banner Section */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] overflow-hidden shadow-lg mb-6">
        <img
          src="https://cdn.pixabay.com/photo/2021/12/12/09/41/woman-6864640_1280.jpg"
          alt="Borrow Section Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Borrow Your Books
          </h1>
          <p className="text-xs sm:text-sm md:text-lg text-gray-200 mt-2 max-w-xl drop-shadow">
            Browse, track and manage all your borrowed books in our library
            system.
          </p>
        </div>
      </div>

      {/* Borrow List Card */}
      <div className="w-full xl:w-10/12 px-4 mx-auto mb-10 max-h-[calc(100vh-300px)] overflow-y-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-b border-gray-200">
            <h3 className="font-semibold text-base text-gray-700">
              Borrow Books List
            </h3>
            <button
              className="bg-amber-500 text-white text-xs font-semibold uppercase px-4 py-1 rounded hover:bg-amber-400 transition"
              type="button"
            >
              See All
            </button>
          </div>

          {/* Table */}
          <div className="w-full mt-7 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 border-collapse">
              <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                <tr>
                  <th className="px-6 py-3 border border-gray-200 whitespace-nowrap">
                    Book Title
                  </th>
                  <th className="px-6 py-3 border border-gray-200 whitespace-nowrap">
                    ISBN
                  </th>
                  <th className="px-6 py-3 border border-gray-200 text-center whitespace-nowrap">
                    Total Borrowed Quantity
                  </th>
                </tr>
              </thead>

              <tbody>
                {borrowBooksData?.length ? (
                  borrowBooksData.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 border-t border-gray-200">
                        {item.book.title}
                      </td>
                      <td className="px-6 py-4 border-t border-gray-200">
                        {item.book.isbn}
                      </td>
                      <td className="px-6 py-4 border-t border-gray-200 text-center">
                        {item.totalQuantity}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500 text-sm"
                    >
                      No borrowed books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
