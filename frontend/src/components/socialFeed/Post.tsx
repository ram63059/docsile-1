import * as React from "react";
import { PostProps } from "./types";
import save1 from "../../assets/icon/save1.svg"
import more from "../../assets/icon/more.svg"
import comment from "../../assets/icon/comment1.svg"
import repost from "../../assets/icon/repost.svg"
import share from "../../assets/icon/share.svg"
import like from "../../assets/icon/like1.svg"
import { useRef, useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import PostExpandedView from "./PostExpandedView";

export const Post: React.FC<PostProps> = ({
  avatar,
  name,
  bio,
  timeAgo,
  title,
  content,
  images,
  likes,
  comments,
  shares,
  reposts,
  onLike,
  onComment,
  onShare,
  onRepost,
  onMoreOptions,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false); // For hover state
  const startXRef = useRef<number | null>(null);
  const currentTranslate = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null) {
      const currentX = e.touches[0].clientX;
      currentTranslate.current = currentX - startXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (currentTranslate.current > 50 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (
      currentTranslate.current < -50 &&
      currentIndex < images.length - 1
    ) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    startXRef.current = null;
    currentTranslate.current = 0;
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1)
      setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const getVisibleDots = () => {
    const maxVisibleDots = 5; // Number of visible dots
    const half = Math.floor(maxVisibleDots / 2);

    return images.map((_, index) => {
      const diff = Math.abs(index - currentIndex);

      // Fully visible for currentIndex and close neighbors
      if (diff <= half) return 1;
      // Gradually fade out for dots further away
      return Math.max(0.3, 1 - (diff - half) * 0.2);
    });
  };

  const visibleDots = getVisibleDots();
  return (
    <>
      <div onClick={() => setIsExpanded(true)}>
        <article className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 mt-2 shadow-lg font-fontsm">
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
              <div>
              <img
                src={avatar}
                alt={`${name}'s profile`}
                className="w-[46px] h-[46px] rounded-full"
              /></div>

              <div className="pt-1">
                <h3 className="text-md font-medium text-neutral-700">{name}</h3>
                <p className="text-fontlit text-neutral-500">{bio}</p>
                <p className="text-fontlit text-neutral-700">{timeAgo}</p>
              </div>
            </div>
            <div className="flex items-center">
            <img src={save1} className="w-6 h-6" alt="" />
            <button
              onClick={onMoreOptions}
              aria-label="More options"
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <img src={more} className="w-6 h-6" alt="" />
            </button>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-neutral-700">{title}</h4>
            <p
              className={`mt-1 text-sm font-light text-neutral-500  ${
                isExpanded ? "" : "line-clamp-1"
              }`}
            >
              {content}
            </p>
            {content.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-xs text-slate-500 hover:text-slate-700 pb-4"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

         

          <div
          className="relative w-full mb-4 group"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {/* Page Counter */}
          <div className="absolute top-2 right-4 z-10 bg-gray-400 bg-opacity-50 text-white text-xs py-1 px-2 rounded-full">
            {currentIndex + 1}/{images.length}
          </div>

          {/* Left Arrow */}
          {showArrows && currentIndex > 0 && (
            <button
              className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-8  0"
              onClick={handlePrev}
            >
            <IoIosArrowDropleftCircle size={30} />



            </button>
          )}

          {/* Right Arrow */}
          {showArrows && currentIndex < images.length - 1 && (
            <button
              className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-80"
              onClick={handleNext}
            >
              <IoIosArrowDroprightCircle size={30} />

            </button>
          )}

          {/* Image Slider */}
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-none w-full lg:h-60 rounded-lg bg-gray-200"
                >
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-2 space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-400"
                }`}
                style={{
                  opacity: visibleDots[index],
                }}
              ></div>
            ))}
          </div>
        </div>

          <div className="flex justify-between mt-4 pt-4 border-t border-neutral-300">
            <div className="flex">
            <div className="flex ">
            <button
              onClick={onLike}
              className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
            >
             
              <img
                src={like}
                 alt=""
                className="w-5 h-5"
              />

              
            </button>
            </div >
            <div className="flex flex-col justify-start text-xs pl-1">
              <p className=" text-neutral-500  hover:text-slate-700 ">likes</p>
              <span>{likes}</span>
              </div>
            </div>
            <div className="flex">
            <div className="flex ">
            <button
              onClick={onComment}
              className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
            >
             
              <img
                src={comment}
                alt=""
                className="w-5 h-5"
              />

              
            </button>
            </div >
            <div className="flex flex-col justify-start text-xs pl-1">
              <p className=" text-neutral-500  hover:text-slate-700 ">comments</p>
              <span>{comments}</span>
              </div>
            </div>

            <div className="flex">
            <div className="flex ">
            <button
              onClick={onShare}
              className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
            >
             
              <img
                src={share}
                className="w-5 h-5"
              />

              
            </button>
            </div >
            <div className="flex flex-col justify-start text-xs pl-1">
              <p className=" text-neutral-500  hover:text-slate-700 ">shares</p>
              <span>{shares}</span>
              </div>
            </div>



            <div className="flex">
            <div className="flex ">
            <button
              onClick={onRepost}
              className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
            >
             
              <img
                src={repost}
                alt=""
                className="w-5 h-5"
              />

              
            </button>
            </div >
            <div className="flex flex-col justify-start text-xs pl-1.5">
              <p className=" text-neutral-500  hover:text-slate-700  ">reposts</p>
              <span>{reposts}</span>
              </div>
            </div>
            
          </div>  
        </article>
      </div>

      <PostExpandedView
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        post={{
          images: images,
          author: {
            name: name,
            avatar: avatar,
            bio: bio,
            timeAgo: timeAgo,
          },
          content: {
            title: title,
            description: content,
          },
          stats: {
            likes,
            comments,
            shares,
            reposts,
          },
          hashtags: ["Ophthalmology", "OpthalTech", "OphthalTrends"],
          comments: [
            {
              id: "1",
              author: {
                name: "Rhanu Prakash",
                avatar: "/api/placeholder/32/32",
                bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional"
              },
              content: "Congrats @Vamshidhar_seelam",
              timeAgo: "3 days ago",
              likes: 37,
              replies: []
            },
            {
              id: "2",
              author: {
                name: "Ram Charan",
                avatar: "/api/placeholder/32/32",
                bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional"
              },
              content: "Congrats @Vamshidhar_seelam",
              timeAgo: "3 days ago",
              likes: 32,
              replies: [
                {
                  id: "2-1",
                  author: {
                    name: "Vamshidhar_seelam",
                    avatar: "/api/placeholder/32/32",
                    bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional",
                    timeAgo: "1 hr ago"
                  },
                  content: "Congrats @Vamshidhar_seelam",
                  timeAgo: "3 days ago",
                  likes: 15
                }
              ]
            }
          ],
        }}
      />
    </>
  );
};
