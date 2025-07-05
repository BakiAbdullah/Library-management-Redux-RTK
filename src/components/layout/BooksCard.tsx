export default function BooksCard({ booksData, onClick }: any) {
  return (
    <div className="w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem] xl:w-[24rem] max-w-full mx-auto my-6 px-2">
      <div className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] group">
        {/* Image */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_1280.jpg"
            alt={booksData.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Ribbon Badge (Optional) */}
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] px-2 py-[2px] rounded-full shadow-sm">
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs sm:text-sm text-gray-400 mb-1">
            {booksData.author}
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {booksData.title}
          </h2>
          <p className="text-sm text-gray-600 flex-grow line-clamp-3">
            {booksData.description
              ? booksData.description.slice(0, 100) + "..."
              : "No description available."}
          </p>
        </div>

        {/* Button */}
        <div className="px-4 pb-4">
          <button
            className="w-full bg-indigo-600 text-white text-sm py-2 rounded-md hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            type="button"
            onClick={onClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
