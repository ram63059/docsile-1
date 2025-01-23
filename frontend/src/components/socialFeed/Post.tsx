import * as React from "react";
import { PostProps } from "./types";
import save1 from "../../assets/icon/save1.svg";
import save2 from "../../assets/icon/save2.svg";
import more from "../../assets/icon/more.svg";
import comment from "../../assets/icon/comment1.svg";
import repost from "../../assets/icon/repost.svg";
import share from "../../assets/icon/share.svg";
import like from "../../assets/icon/like1.svg";
import liked from "../../assets/icon/liked.svg";
import { useRef, useState } from "react";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import PostExpandedView from "./PostExpandedView";
import sharev from "../../assets/icon/sharev.svg";
import hide from "../../assets/icon/hide.svg";
import notinterested from "../../assets/icon/notintrested.svg";




interface Author {
  name: string;
  avatar: string;
  bio: string;
  timeAgo?: string; // Make timeAgo optional if not always present
}

// Define the Comment interface
interface Comment {
  id: string;
  author: Author;
  content: string;
  timeAgo: string;
  likes: number;
  replies?: Comment[]; // Ensure replies is an array of Comment
}
const CommentInput = () => {
  const [comment, setComment] = useState('');
  return (
    <div className="flex mb-8 c gap-3 font-fontsm ">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6" alt="User avatar" className="w-8 h-8 rounded-full" />
      <div className="flex   flex-1 gap-2">
      <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add Comments..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                />
        
          <div className="flex items-center  ">
            <button className="px-3  py-1 text-sm text-white  font-light bg-maincl rounded-full hover:bg-fillc">Comment</button>
          </div>
      
      </div>
    </div>
  );
};
const formatComment = (text: string) => {
  return text.split(' ').map((word, index) => {
    if (word.startsWith('@')) {
      return (
        <span key={index}>
          <span className="text-blue-500 hover:underline cursor-pointer">{word}</span>{' '}
        </span>
      );
    }
    return word + ' ';
  });
};

const Comment = ({ comment }: { comment: Comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
    <div className="px-4 mt-3 font-fontsm">
      <div className="flex gap-3">
        <img
          src={comment.author.avatar}
          alt={`${comment.author.name}'s avatar`}
          className="w-6 h-6 rounded-full"
        />
        <div className="flex-1 max-w-84">
          <div className="bg-buttonclr px-3 py-2 rounded-tl-none rounded-2xl relative">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-neutral-700">
                {comment.author.name}
              </span>
              <span className="text-fontlit text-neutral-500">{comment.timeAgo}</span>
            </div>
            <p className="text-fontvlit text-gray-500 max-w-64 line-clamp-1">{comment.author.bio} </p>
            <p className="text-xs text-neutral-600 mt-1">{formatComment(comment.content)}</p>
          </div>
          <div className="flex items-center gap-4 mt-1 ml-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700"
            >
              <img src={isLiked ? liked : like} alt="" className="w-4 h-4" />
              <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs text-neutral-500 hover:text-neutral-700"
            >
              Reply
            </button>
          </div>
          {showReplyInput && (
            <div className="mt-2 ml-2">
              <div className="flex items-start gap-3">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex">
                  <input
                  type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full p-2 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 resize-none"
                  />
                  {replyText && (
                    <div className="flex justify-end ml-1 items-center ">
                      <button className="px-4 py-1 text-sm text-white bg-maincl rounded-full hover:bg-fillc">
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-4 mt-2 space-y-4">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
  onComment,
  onShare,
  onRepost,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const startXRef = useRef<number | null>(null);
  const currentTranslate = useRef(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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
    } else if (currentTranslate.current < -50 && currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    startXRef.current = null;
    currentTranslate.current = 0;
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const getVisibleDots = () => {
    const maxVisibleDots = 5;
    const half = Math.floor(maxVisibleDots / 2);
    return images.map((_, index) => {
      const diff = Math.abs(index - currentIndex);
      if (diff <= half) return 1;
      return Math.max(0.3, 1 - (diff - half) * 0.2);
    });
  };

  const toggleMore = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  const toggleComments = () => {
    setShowComments(!showComments);

  };

  const visibleDots = getVisibleDots();

  const sampleComments : Comment[]= [
    {
      id: "1",
      author: {
        name: "Nampally Sriram",
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6",
        bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional",
      },
      content: "Congrats @Vamshidhar_seelam",
      timeAgo: "3 days ago",
      likes: 37,
      replies: [], // Correctly typed as Comment[]
    },
    {
      id: "2",
      author: {
        name: "Nampally Sriram",
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6",
        bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional",
      },
      content: "Congrats @Vamshidhar_seelam",
      timeAgo: "3 days ago",
      likes: 32,
      replies: [
        {
          id: "2-1",
          author: {
            name: "Nampally Sriram",
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6",
            bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional",
          },
          content: "Congrats @Vamshidhar_seelam",
          timeAgo: "3 days ago",
          likes: 15,
          replies: [], // Correctly typed as Comment[]
        },
      ],
    },
  ];

  return (
    <>
      <div>
        <article className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 mt-2 shadow-lg font-fontsm">
          {/* Existing header section */}
          <div className="flex justify-between items-start relative">
            <div className="flex gap-3 items-center" onClick={() => setIsExpanded(true)}>
              <div>
                <img src={avatar} alt={`${name}'s profile`} className="w-[46px] h-[46px] rounded-full" />
              </div>
              <div className="pt-1">
                <h3 className="text-md font-medium text-neutral-700">{name}</h3>
                <p className="text-fontlit text-neutral-500">{bio}</p>
                <p className="text-fontlit text-neutral-700">{timeAgo}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={isSaved ? save2 :save1} onClick={()=>setIsSaved(!isSaved)} className="w-6 h-6" alt="" />
              <button onClick={toggleMore} aria-label="More options" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <img src={more} className="w-6 h-6" alt="" />
              </button>
              {isMoreOpen && (
                <div
                  className="rounded-md shadow-md flex flex-col w-40 text-xs p-3 z-20 absolute top-7 right-0 mt-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <img src={sharev} alt="Share Via" className="w-4 h-4" />
                    <p>Share Via</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <img src={hide} alt="Hide" className="w-4 h-4" />
                    <p>Hide</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <img src={notinterested} alt="Not Interested" className="w-4 h-4" />
                    <p>Not Interested</p>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <p>Follow Account</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500">
                    <p>Report</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500">
                    <p>Block</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Content section */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-neutral-700">{title}</h4>
            <p className={`mt-1 text-sm font-light text-neutral-500 ${isExpanded ? "" : "line-clamp-1"}`}>
              {content}
            </p>
            {content.length > 150 && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="mt-1 text-xs text-slate-500 hover:text-slate-700 pb-4">
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          {/* Image slider section */}
          <div className="relative w-full mb-4 group" onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
            <div className="absolute top-2 right-4 z-10 bg-gray-400 bg-opacity-50 text-white text-xs py-1 px-2 rounded-full">
              {currentIndex + 1}/{images.length}
            </div>
            {showArrows && currentIndex > 0 && (
              <button
                className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-80"
                onClick={handlePrev}
              >
                <IoIosArrowDropleftCircle size={30} />
              </button>
            )}
            {showArrows && currentIndex < images.length - 1 && (
              <button
                className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-80"
                onClick={handleNext}
              >
                <IoIosArrowDroprightCircle size={30} />
              </button>
            )}
            <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                  <div key={index} className="flex-none w-full lg:h-60 rounded-lg bg-gray-200">
                    <img src={image} alt={`Post image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-2 space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-gray-400"}`}
                  style={{ opacity: visibleDots[index] }}
                ></div>
              ))}
            </div>
          </div>
          {/* Interaction buttons section */}
          <div className="flex justify-between mt-4 pt-4 border-t border-neutral-300">
            <div className="flex">
              <div className="flex">
                <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700">
                  <img src={isLiked ? liked : like} alt="" className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col justify-start text-xs pl-1">
                <p className="text-neutral-500 hover:text-slate-700">likes</p>
                <span>{likes}</span>
              </div>
            </div>

            {showComments ? (
                <div className="flex bg-gray-100 p-1 rounded-lg">
                <div className="flex ">
                  <button
                    onClick={() => {
                      if (onComment) { // Check if onComment is defined
                        onComment(); // Call onComment if it exists
                      }
                      toggleComments();
                    }}
                    className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
                  >
                    <img src={comment} alt="" className="w-5 h-5" />
                  </button>
                </div>
  
               
                <div className="flex flex-col justify-start text-xs pl-1">
                  <p className="text-neutral-500 hover:text-slate-700">comments</p>
                    
                    <span>{comments}</span>
                </div>
              </div>
            ):(
              <div className="flex">
              <div className="flex">
                <button
                  onClick={() => {
                    if (onComment) { // Check if onComment is defined
                      onComment(); // Call onComment if it exists
                    }
                    toggleComments();
                  }}
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
                >
                  <img src={comment} alt="" className="w-5 h-5" />
                </button>
              </div>

             
              <div className="flex flex-col justify-start text-xs pl-1">
                <p className="text-neutral-500 hover:text-slate-700">comments</p>
                  
                  <span>{comments}</span>
              </div>
            </div>
                    )}
            
            <div className="flex">
              <div className="flex">
                <button onClick={onShare} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700">
                  <img src={share} className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col justify-start text-xs pl-1">
                <p className="text-neutral-500 hover:text-slate-700">shares</p>
                <span>{shares}</span>
              </div>
            </div>
            <div className="flex">
              <div className="flex">
                <button onClick={onRepost} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700">
                  <img src={repost} alt="" className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col justify-start text-xs pl-1.5">
                <p className="text-neutral-500 hover:text-slate-700">reposts</p>
                <span>{reposts}</span>
              </div>
            </div>
          </div>
          
          {/* Comments section */}
          {showComments && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <CommentInput />
              <div className="mt-4 space-y-4">
                {sampleComments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
      <PostExpandedView
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        post={{
          images: images,
          author: { name: name, avatar: avatar, bio: bio, timeAgo: timeAgo },
          content: { title: title, description: content },
          stats: { likes, comments, shares, reposts },
          hashtags: ["Ophthalmology", "OpthalTech", "OphthalTrends"],
          comments: sampleComments,
        }}
      />
    </>
  );
};

export default Post;
