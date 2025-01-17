import * as React from "react";
import { QuestionPostProps } from "./types";
import save1 from "../../assets/icon/save1.svg"
import save2 from "../../assets/icon/save2.svg"
import more from "../../assets/icon/more.svg"
import agree1 from "../../assets/icon/agree1.svg"
import agree2 from "../../assets/icon/agree2.svg"
import disagree2 from "../../assets/icon/disagree2.svg"
import disagree1 from "../../assets/icon/disagree1.svg"
import comment1 from "../../assets/icon/comment1.svg"
import share from "../../assets/icon/share.svg"
import { useRef, useState } from "react";

export const QuestionPost: React.FC<QuestionPostProps> = ({
  avatar,
  name,
  bio,
  timeAgo,
  date,
  title,
  content,
  images,
  isUrgent,
  agrees,
  disagrees,
  shares,
  answers,
  onShare,
  onAnswer,
  onMoreOptions,
  onReply,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setCurrentIndex(currentIndex - 1); // Slide to the previous image
    } else if (currentTranslate.current < -50 && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1); // Slide to the next image
    }
    startXRef.current = null;
    currentTranslate.current = 0;
  };


  const [isAgreeActive, setIsAgreeActive] = useState(false);
  const [isDisagreeActive, setIsDisagreeActive] = useState(false);
  const [isSaved, setIsSaved] = useState(false);



  return (
    <div>
      {isUrgent && (
        <div className="px-4 mx-4 py-1 bg-urgentbg text-urgenttxt font-medium text-xs rounded-t-2xl mt-4">
          Urgent
        </div>
      )}
    <article className="flex flex-col p-4 mx-4 mb-4  bg-white rounded-x-2xl rounded-b-2xl  border border-gray-200  shadow-lg font-fontsm">
      
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
        <img 
        onClick={()=>setIsSaved(!isSaved)}
        src={isSaved ? save2 : save1}
         className="w-6 h-6" 
         alt="" />
        <button
          onClick={onMoreOptions}
          aria-label="More options"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <img src={more} className="w-6 h-6" alt="" />
        </button>
        </div>
      </div>

      <div className="mt-4 mb-3">
        <h4 className="text-sm font-medium text-neutral-700">{title}</h4>
        <p
          className={`mt-1 text-sm font-light text-neutral-500 ${
            isExpanded ? "" : "line-clamp-1"
          }`}
        >
          {content}
        </p>
        {content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 text-xs text-slate-500 hover:text-slate-700"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

     

       {/* Image Slider */}
      {images.length > 0 && (
        <div
          className="relative w-full  mb-4 overflow-hidden "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 80}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`flex-none w-[80%] ${
                  index === currentIndex + 1 ? 'w-[20%]' : ''
                }  mr-2 rounded-lg bg-gray-200`}
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
      )}

      <div className="flex flex-row gap-3  border-t border-neutral-200 mt-3 pt-5">
          <div className="flex-none pr-2">
          <img
            src={avatar}
            alt={`${name}'s profile`}
            className="w-[46px] h-[46px] rounded-full"
          /></div>

        
            <div>
            <h3 className="text-sm font-sm text-neutral-700">{name}   <span className="text-fontlit text-neutral-500 pl-2">   {date}</span></h3>
            <p className="text-fontlit text-neutral-500 pb-1">{bio}</p>
           

            <p
          className={`mt-1 text-sm font-light text-neutral-500 ${
            isExpanded ? "" : "line-clamp-4"
          }`}
        >
          {content}
        </p>
        {content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 text-xs text-slate-500 hover:text-slate-700"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
        <div className="flex justify-start pt-4 pb-3">
            





        <div className="flex pr-3 ">
        <div className="flex pr-1 ">
        <button
          onClick={() => setIsAgreeActive(!isAgreeActive)}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={isAgreeActive ? agree2 : agree1}
             alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1">
          <span>{agrees}</span>
          </div>
        </div>

        <div className="flex pr-3">
        <div className="flex pr-1">
        <button
          onClick={() => setIsDisagreeActive(!isDisagreeActive)}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={isDisagreeActive ? disagree2 : disagree1}
             alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1">
          <span>{disagrees}</span>
          </div>
        </div>


        <div className="flex pr-3">
        <div className="flex pr-1">
        <button
          onClick={onReply}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={comment1}
             alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1">
          <p className=" text-neutral-500  hover:text-slate-700 ">Reply</p>
          </div>
        </div>
        </div>
          </div>
        </div>
        
      
       

      <div className="flex justify-between mt-4 pt-8 pb-5 px-3 border-t border-neutral-200">
        <div className="flex">
        <div className="flex ">
        <button
          onClick={onAnswer}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={comment1}
             alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1">
          <p className=" text-neutral-500  hover:text-slate-700 ">Answer</p>
          <span>{answers}</span>
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
            alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1.5">
          <p className=" text-neutral-500  hover:text-slate-700  ">shares</p>
          <span>{shares}</span>
          </div>
        </div>
        
      </div>  
    </article>
    </div>
  );
};
