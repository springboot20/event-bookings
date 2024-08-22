import { useState } from "react";

export const FeaturedEventCard = () => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="bg-white border rounded-xl p-4 h-fit" role="button">
      <header className="rounded-xl h-32 border w-full bg-white"></header>
      <div className="mt-2 space-y-3">
        <h3 className="text-base text-gray-800 font-medium">
          70% OFF - Table Tennis contest. Book fast!
        </h3>
        {readMore && (
          <div className="space-y-2">
            <p className="text-xs text-gray-700">
              Table tennis contest held at the YMCA Auditorium are now at a hot price. Book your
              tickets at 70% off and enjoy the game.
            </p>

            <div className="space-y-2">
              <button className="w-full text-center py-1.5 px-3 rounded-md bg-[#FFF1A8] text-[#3D3D3D] text-sm border font-semibold">
                Go to Event
              </button>
              <button
                onClick={() => setReadMore(false)}
                className="w-full text-center py-1.5 px-3 rounded-md bg-[#FFE2D9] text-[#3D3D3D] text-sm border font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {!readMore && (
          <div className="flex w-full justify-end">
            <button
              className="text-indigo-800 font-semibold text-sm"
              onClick={() => setReadMore(true)}
            >
              Read more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
