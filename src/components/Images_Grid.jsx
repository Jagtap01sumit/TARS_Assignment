import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import axios from "axios";

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];

export default function Images_Grid() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const url =
      "https://api.unsplash.com/photos/?client_id=pWy9EcgK0erjCG64djnEpvlZrookYrc2cx4blLRQAyY";

    axios
      .get(url)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log("error occure", error);
      });
  }, [searchQuery]);
  const handleSearch = () => {
    setPhotos([]);
    setSearchQuery(searchQuery);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Photos Gallery
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="mt-6 flex">
            <input
              type="text"
              placeholder="Search for images"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-lg mr-4"
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="flex justify-start text-sm text-gray-700">
                    <a href={photo.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {photo.user.username}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {photo.created_at}
                  </p>
                </div>
                <p className="flex mr-2 text-sm font-medium text-gray-900">
                  <FcLike className="mr-1 mt-0.5" />
                  {photo.likes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
