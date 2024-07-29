export default function PhotoCard({ image, caption }) {
  const imgUrl = image ? "/files/" + image : "photodefault.png";
  return (
    <div className="bg-white shadow-md shadow-gray-400 rounded-lg overflow-hidden mx-4 mt-2 mb-8 transition duration-300 transform hover:scale-105 cursor-pointer">
      {/* Thumbnail */}
      <a href={imgUrl} target="_blank">
        <img src={imgUrl} alt={caption} className="w-full h-48 object-cover" />
      </a>
      {/* Caption */}
      <div className="p-4">
        <p className="text-gray-600 text-base mb-2 mukta-regular">{caption}</p>
      </div>
    </div>
  );
}
