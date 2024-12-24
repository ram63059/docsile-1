import { useEffect, useRef } from "react";
import profilepic from "../assets/ProfilePic.svg";
import testprofilepic from "../assets/test1.png";
import test4profilepic from "../assets/test4.jpg";

function MainfeedPulseAndPost() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 2; // Adjust this value to make the scroll faster

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = (event: {
      preventDefault: () => void;
      deltaY: number;
    }) => {
      if (scrollContainer) {
        event.preventDefault(); // Prevent vertical scroll

        // Control the horizontal scroll speed
        scrollContainer.scrollLeft += event.deltaY * scrollSpeed;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  function truncateStringByLetters(str: string, allowedLetters: number) {
    // If the string length is less than or equal to allowedLetters, return the string as it is
    if (str.length <= allowedLetters) {
      return str;
    }

    // Slice the string to the allowed number of letters and append "..."
    return str.slice(0, allowedLetters) + "...";
  }

  return (
    <div className="flex flex-col pb-2 px-2">
      <div className="flex flex-row ">
        <div className="flex flex-col justify-center items-center">
          <div className="pb-1">
            <div className=" ring-offset-2 ring-2 rounded-full">
              <img
                className="w-12 h-12 rounded-full object-contain"
                src={test4profilepic}
                alt="Add pulse moments"
              />
            </div>
          </div>

          <div>
            <p className="text-xs">
              {truncateStringByLetters("Pulse Moments", 11)}
            </p>
          </div>
        </div>

        <div
          className="flex  overflow-auto gap-3 whitespace-nowrap rounded-lg p-2 no-scrollbar"
          ref={scrollContainerRef}
          style={{
            overflowY: "hidden",
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="pb-1">
              <div className=" ring-offset-2 ring-2 rounded-full">
                <img
                  className="w-12 rounded-full"
                  src={testprofilepic}
                  alt="Add pulse moments"
                />
              </div>
            </div>

            <div>
              <p className="text-xs">
                {truncateStringByLetters("Dr.Vamshidhar", 11)}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="pb-1">
              <div className="  ring-offset-2 ring-2 rounded-full">
                <img
                  className="w-12"
                  src={profilepic}
                  alt="Add pulse moments"
                />
              </div>
            </div>

            <div>
              <p className="text-xs">
                {truncateStringByLetters("Mahendhar", 11)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainfeedPulseAndPost;
