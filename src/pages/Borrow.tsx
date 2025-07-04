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
      <div className="relative w-full h-[250px] md:h-[220px] overflow-hidden shadow-lg mb-6">
        <img
          src="https://cdn.pixabay.com/photo/2021/12/12/09/41/woman-6864640_1280.jpg"
          alt="Borrow Section Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Borrow your books
          </h1>
          <p className="text-sm md:text-lg text-gray-200 mt-2 max-w-xl drop-shadow">
            Browse, search, and manage all available books in our library
            system.
          </p>
        </div>
      </div>

      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-30 max-h-screen overflow-y-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="bg-red-50 rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className=" relative w-full px-2 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Borrow Books List
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-amber-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto ">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Book Title
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ISBN
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500  border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                    Total Borrowed Quantity
                  </th>
                </tr>
              </thead>

              <tbody>
                {borrowBooksData?.map((item:any, idx:number) => {
                
                  return (
                    <tr key={idx}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {item.book.title}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {item.book.isbn}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        {item.totalQuantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
