export default function BooksCard({ booksData, onClick }: any) {
  return (
    <div className="w-68 max-w-sm mx-auto my-10">
      <div className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden h-full">
        {/* Image */}
        <div className="h-36 overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_1280.jpg"
            alt={booksData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm text-gray-400 mb-2">{booksData.author}</p>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {booksData.title}
          </h2>
          <p className="text-sm text-gray-500 flex-grow">
            {(booksData.description ? booksData.description.slice(0, 100) + "..." : "No description available.")}
          </p>
        
        </div>

        {/* Button */}
        <div className="px-4 pb-4">
          <button
            className="w-full bg-gray-900 text-white text-sm py-2 rounded-md hover:bg-gray-800 transition cursop"
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
