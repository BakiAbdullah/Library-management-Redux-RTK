export default function BooksCard({ booksData, onClick }: any) {
  return (
    <div className="w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem] xl:w-[24rem] max-w-full mx-auto my-6 px-2">
      <div className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="h-40 sm:h-44 md:h-48 overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_1280.jpg"
            alt={booksData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs sm:text-sm text-gray-400 mb-1">
            {booksData.author}
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            {booksData.title}
          </h2>
          <p className="text-sm text-gray-600 flex-grow">
            {booksData.description
              ? booksData.description.slice(0, 100) + "..."
              : "No description available."}
          </p>
        </div>

        {/* Button */}
        <div className="px-4 pb-4">
          <button
            className="w-full bg-gray-900 text-white text-sm py-2 rounded-md hover:bg-gray-800 transition"
            type="button"
            onClick={onClick}
          >
            Book Details
          </button>
        </div>
      </div>
    </div>
  );
}
