import { StarIcon } from "lucide-react";

const DisplayStarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center z-50">
      {[...Array(rating)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <button key={starIndex}>
            <StarIcon
              className={`size-4 transition-colors ${
                starIndex <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default DisplayStarRating;
