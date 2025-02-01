// import * as React from "react";
// import { PostProps } from "./types";
// import save1 from "../../assets/icon/save1.svg"
// import more from "../../assets/icon/more.svg"
// import comment from "../../assets/icon/comment1.svg"
// import repost from "../../assets/icon/repost.svg"
// import share from "../../assets/icon/share.svg"
// import like from "../../assets/icon/like1.svg"
// import liked from "../../assets/icon/liked.svg"
// import { useRef, useState } from "react";
// import { IoIosArrowDroprightCircle } from "react-icons/io";
// import { IoIosArrowDropleftCircle } from "react-icons/io";
// import PostExpandedView from "./PostExpandedView";
// import sharev from "../../assets/icon/sharev.svg"
// import hide from "../../assets/icon/hide.svg"
// import notinterested from "../../assets/icon/notintrested.svg"

// export const Post: React.FC<PostProps> = ({
//   avatar,
//   name,
//   bio,
//   timeAgo,
//   title,
//   content,
//   images,
//   likes,
//   comments,
//   shares,
//   reposts,
//   onComment,
//   onShare,
//   onRepost,
// }) => {
//   const [isExpanded, setIsExpanded] = React.useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showArrows, setShowArrows] = useState(false); // For hover state
//   const startXRef = useRef<number | null>(null);
//   const currentTranslate = useRef(0);
//   const [isLiked ,setIsLiked]=useState(false);
//   const [isMoreOpen ,setIsMoreOpen]=useState(false);
//   const handleTouchStart = (e: React.TouchEvent) => {
//     startXRef.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (startXRef.current !== null) {
//       const currentX = e.touches[0].clientX;
//       currentTranslate.current = currentX - startXRef.current;
//     }
//   };

//   const handleTouchEnd = () => {
//     if (currentTranslate.current > 50 && currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     } else if (
//       currentTranslate.current < -50 &&
//       currentIndex < images.length - 1
//     ) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//     startXRef.current = null;
//     currentTranslate.current = 0;
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex((prevIndex) => prevIndex - 1);
//   };

//   const handleNext = () => {
//     if (currentIndex < images.length - 1)
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//   };

//   const getVisibleDots = () => {
//     const maxVisibleDots = 5; // Number of visible dots
//     const half = Math.floor(maxVisibleDots / 2);

//     return images.map((_, index) => {
//       const diff = Math.abs(index - currentIndex);

//       // Fully visible for currentIndex and close neighbors
//       if (diff <= half) return 1;
//       // Gradually fade out for dots further away
//       return Math.max(0.3, 1 - (diff - half) * 0.2);
//     });
//   };

//   const toggleMore = () => {
//     setIsMoreOpen(!isMoreOpen);
//   };

//   const visibleDots = getVisibleDots();
//   return (
//     <>
//       <div >
//         <article className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 mt-2 shadow-lg font-fontsm">
//           <div className="flex justify-between items-start relative ">
//             <div className="flex gap-3 items-center " onClick={() => setIsExpanded(true)}>
//               <div>
//               <img
//                 src={avatar}
//                 alt={`${name}'s profile`}
//                 className="w-[46px] h-[46px] rounded-full"
//               /></div>

//               <div className="pt-1">
//                 <h3 className="text-md font-medium text-neutral-700">{name}</h3>
//                 <p className="text-fontlit text-neutral-500">{bio}</p>
//                 <p className="text-fontlit text-neutral-700">{timeAgo}</p>
//               </div>
//             </div>
//             <div className="flex items-center">
//             <img src={save1} className="w-6 h-6" alt="" />
//             <button
//               onClick={toggleMore}
//               aria-label="More options"
//               className="p-2 hover:bg-slate-100 rounded-full transition-colors "
//             >
//               <img src={more} className="w-6 h-6" alt="" />


//             </button> 
//             {isMoreOpen && (
//               <div className=" rounded-md  shadow-md  flex flex-col w-40 text-xs p-3 z-20 absolute top-7 right-0  mt-2" 
//               style={{
//                 background: "rgba(255, 255, 255, 0.4)", 
//                 backdropFilter: "blur(30px)",          
//                 WebkitBackdropFilter: "blur(10px)",  
//                 border: "1px solid rgba(255, 255, 255, 0.3)", 
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  
//               }}
//               >
         
//           <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
//             <img src={sharev} alt="Share Via" className="w-4 h-4" />
//             <p>Share Via</p>
//           </div>
//           <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
//             <img src={hide} alt="Hide" className="w-4 h-4" />
//             <p>Hide</p>
//           </div>
//           <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
//             <img src={notinterested} alt="Not Interested" className="w-4 h-4" />
//             <p>Not Interested</p>
//           </div>
//           <hr className="my-2" />
//           <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
//             <p>Follow Account</p>
//           </div>
//           <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500">
//             <p>Report</p>
//           </div>
//           <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500">
//             <p>Block</p>
//           </div>
//         </div>
//       )}
//             </div>
//           </div>

//           <div className="mt-4">
//             <h4 className="text-sm font-medium text-neutral-700">{title}</h4>
//             <p
//               className={`mt-1 text-sm font-light text-neutral-500  ${
//                 isExpanded ? "" : "line-clamp-1"
//               }`}
//             >
//               {content}
//             </p>
//             {content.length > 150 && (
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="mt-1 text-xs text-slate-500 hover:text-slate-700 pb-4"
//               >
//                 {isExpanded ? "Show less" : "Show more"}
//               </button>
//             )}
//           </div>

         

//           <div
//           className="relative w-full mb-4 group"
//           onMouseEnter={() => setShowArrows(true)}
//           onMouseLeave={() => setShowArrows(false)}
//         >
//           {/* Page Counter */}
//           <div className="absolute top-2 right-4 z-10 bg-gray-400 bg-opacity-50 text-white text-xs py-1 px-2 rounded-full">
//             {currentIndex + 1}/{images.length}
//           </div>

//           {/* Left Arrow */}
//           {showArrows && currentIndex > 0 && (
//             <button
//               className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-8  0"
//               onClick={handlePrev}
//             >
//             <IoIosArrowDropleftCircle size={30} />



//             </button>
//           )}

//           {/* Right Arrow */}
//           {showArrows && currentIndex < images.length - 1 && (
//             <button
//               className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-80"
//               onClick={handleNext}
//             >
//               <IoIosArrowDroprightCircle size={30} />

//             </button>
//           )}

//           {/* Image Slider */}
//           <div
//             className="relative overflow-hidden"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               className="flex transition-transform duration-300"
//               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//             >
//               {images.map((image, index) => (
//                 <div
//                   key={index}
//                   className="flex-none w-full lg:h-60 rounded-lg bg-gray-200"
//                 >
//                   <img
//                     src={image}
//                     alt={`Post image ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Dots Navigation */}
//           <div className="flex justify-center mt-2 space-x-1">
//             {images.map((_, index) => (
//               <div
//                 key={index}
//                 className={`h-2 w-2 rounded-full ${
//                   index === currentIndex ? "bg-blue-600" : "bg-gray-400"
//                 }`}
//                 style={{
//                   opacity: visibleDots[index],
//                 }}
//               ></div>
//             ))}
//           </div>
//         </div>

//           <div className="flex justify-between mt-4 pt-4 border-t border-neutral-300">
//             <div className="flex">
//             <div className="flex ">
//             <button
//               onClick={()=>setIsLiked(!isLiked)}
//               className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
//             >
             
//               <img
//                 src={isLiked? liked :like}
//                  alt=""
//                 className="w-5 h-5"
//               />

              
//             </button>
//             </div >
//             <div className="flex flex-col justify-start text-xs pl-1">
//               <p className=" text-neutral-500  hover:text-slate-700 ">likes</p>
//               <span>{likes}</span>
//               </div>
//             </div>
//             <div className="flex">
//             <div className="flex ">
//             <button
//               onClick={onComment}
//               className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
//             >
             
//               <img
//                 src={comment}
//                 alt=""
//                 className="w-5 h-5"
//               />

              
//             </button>
//             </div >
//             <div className="flex flex-col justify-start text-xs pl-1">
//               <p className=" text-neutral-500  hover:text-slate-700 ">comments</p>
//               <span>{comments}</span>
//               </div>
//             </div>

//             <div className="flex">
//             <div className="flex ">
//             <button
//               onClick={onShare}
//               className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
//             >
             
//               <img
//                 src={share}
//                 className="w-5 h-5"
//               />

              
//             </button>
//             </div >
//             <div className="flex flex-col justify-start text-xs pl-1">
//               <p className=" text-neutral-500  hover:text-slate-700 ">shares</p>
//               <span>{shares}</span>
//               </div>
//             </div>



//             <div className="flex">
//             <div className="flex ">
//             <button
//               onClick={onRepost}
//               className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
//             >
             
//               <img
//                 src={repost}
//                 alt=""
//                 className="w-5 h-5"
//               />

              
//             </button>
//             </div >
//             <div className="flex flex-col justify-start text-xs pl-1.5">
//               <p className=" text-neutral-500  hover:text-slate-700  ">reposts</p>
//               <span>{reposts}</span>
//               </div>
//             </div>
            
//           </div>  
//         </article>
//       </div>

            

//       <PostExpandedView
//         isOpen={isExpanded}
//         onClose={() => setIsExpanded(false)}
//         post={{
//           images: images,
//           author: {
//             name: name,
//             avatar: avatar,
//             bio: bio,
//             timeAgo: timeAgo,
//           },
//           content: {
//             title: title,
//             description: content,
//           },
//           stats: {
//             likes,
//             comments,
//             shares,
//             reposts,
//           },
//           hashtags: ["Ophthalmology", "OpthalTech", "OphthalTrends"],
//           comments: [
//             {
//               id: "1",
//               author: {
//                 name: "Rhanu Prakash",
//                 avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//                 bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional"
//               },
//               content: "Congrats @Vamshidhar_seelam",
//               timeAgo: "3 days ago",
//               likes: 37,
//               replies: []
//             },
//             {
//               id: "2",
//               author: {
//                 name: "Ram Charan",
//                 avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//                 bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional"
//               },
//               content: "Congrats @Vamshidhar_seelam",
//               timeAgo: "3 days ago",
//               likes: 32,
//               replies: [
//                 {
//                   id: "2-1",
//                   author: {
//                     name: "Vamshidhar_seelam",
//                     avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
//                     bio: "Ophthalmologist | AIIMS DM-(F) | Leading Medical Professional",
//                     timeAgo: "1 hr ago"
//                   },
//                   content: "Congrats @Vamshidhar_seelam",
//                   timeAgo: "3 days ago",
//                   likes: 15
//                 }
//               ]
//             }
//           ],
//         }}
//       />
//     </>
//   );
// };







import React, { useState, useRef } from 'react';
import { X, Image, ChevronDown, FileText } from 'lucide-react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { FaCaretRight } from "react-icons/fa";
import publicIcon from "../../assets/icon/public.svg";
import privateIcon from "../../assets/icon/private.svg";

interface PostPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatar: string;
}

type Visibility = 'Public' | 'Private(Followers Only)';
type PostType = 'Post' | 'Question' | 'Resource' | 'Video';

const PostPopup: React.FC<PostPopupProps> = ({ isOpen, onClose, userAvatar }) => {
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('Public');
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>('Post');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [titleCount, setTitleCount] = useState(100);
  const [currentStep, setCurrentStep] = useState(1);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const startXRef = useRef<number | null>(null);
  const currentTranslate = useRef(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files: File[]) => {
    if (postType === 'Resource') {
      const file = files[0];
      if (file?.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        alert('Please upload a PDF file for resources');
      }
      return;
    }

    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return (postType === 'Video' ? isVideo : isImage) && selectedMedia.length + files.length <= 4;
    });

    setSelectedMedia(prev => [...prev, ...validFiles]);
  };

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
      setCurrentIndex(currentIndex - 1);
    } else if (currentTranslate.current < -50 && currentIndex < selectedMedia.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    startXRef.current = null;
    currentTranslate.current = 0;
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < selectedMedia.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const getVisibleDots = () => {
    const maxVisibleDots = 5;
    const half = Math.floor(maxVisibleDots / 2);
    return selectedMedia.map((_, index) => {
      const diff = Math.abs(index - currentIndex);
      if (diff <= half) return 1;
      return Math.max(0.3, 1 - (diff - half) * 0.2);
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= 100) {
      setPostTitle(text);
      setTitleCount(100 - text.length);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length <= 500) {
      setPostContent(text);
     
    }
  };

  const renderMediaUpload = () => {
    if (postType === 'Resource') {
      return (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileSelection(Array.from(e.target.files || []))}
            className="hidden"
            id="pdfInput"
          />
          <label
            htmlFor="pdfInput"
            className="flex flex-col items-center cursor-pointer"
          >
            <FileText className="w-8 h-8 text-gray-400" />
            <p className="mt-2 text-gray-600">Upload PDF</p>
            <p className="text-sm text-gray-500">or drag and drop</p>
          </label>
          {pdfFile && (
            <div className="mt-4 p-2 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">{pdfFile.name}</p>
            </div>
          )}
        </div>
      );
    }

    if (postType === 'Video') {
      return (
        <div className="flex flex-col gap-4 mt-2">
          {!selectedMedia.length ? (
            <div 
              className="relative w-full h-[200px] border-2 bg-buttonclr border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              onClick={() => document.getElementById('mediaInput')?.click()}
            >
              <Image className="w-8 h-8 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Add Video</p>
              <p className="text-sm text-gray-500">MP4, WebM or Ogg</p>
              <p className="text-xs text-gray-400 mt-1">Maximum file size: 100MB</p>
              <input
                id="mediaInput"
                type="file"
                accept="video/*"
                onChange={(e) => handleFileSelection(Array.from(e.target.files || []))}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative w-full h-[200px] bg-gray-50 rounded-lg overflow-hidden">
              <video
                src={URL.createObjectURL(selectedMedia[0])}
                className="w-full h-full object-contain"
                controls
              />
              <button
                onClick={() => setSelectedMedia([])}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {selectedMedia.length > 0 && (
          <div className="relative w-full h-[180px] group bg-gray-50 rounded-lg overflow-hidden"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute top-2 left-4 z-10 bg-gray-400 bg-opacity-50 text-white text-xs py-1 px-2 rounded-full">
              {currentIndex + 1}/{selectedMedia.length}
            </div>
            
            <div className="relative h-full flex justify-center items-center">
              <img
                src={URL.createObjectURL(selectedMedia[currentIndex])}
                alt={`Upload ${currentIndex + 1}`}
                className="max-h-[150px] w-auto max-w-[95%] object-contain"
              />
              <button
                onClick={() => {
                  setSelectedMedia(prev => prev.filter((_, i) => i !== currentIndex));
                  if (currentIndex === selectedMedia.length - 1) {
                    setCurrentIndex(Math.max(0, currentIndex - 1));
                  }
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {showArrows && selectedMedia.length > 1 && (
              <>
                {currentIndex > 0 && (
                  <button
                    className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
                    onClick={handlePrev}
                  >
                    <IoIosArrowDropleftCircle size={24} />
                  </button>
                )}
                {currentIndex < selectedMedia.length - 1 && (
                  <button
                    className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
                    onClick={handleNext}
                  >
                    <IoIosArrowDroprightCircle size={24} />
                  </button>
                )}
              </>
            )}

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {selectedMedia.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  style={{ opacity: getVisibleDots()[index] }}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedMedia.length < 4 && (
          <div
            className={`flex justify-center items-center gap-3 ${selectedMedia.length > 0 ? 'p-2' : 'p-8'} border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all`}
            onClick={() => document.getElementById('mediaInput')?.click()}
          >
            <Image className={`${selectedMedia.length > 0 ? 'w-6 h-6' : 'w-8 h-8'} text-gray-400`} />
            <div className='flex flex-col justify-center items-center'>
              <p className={`${selectedMedia.length > 0 ? 'text-sm' : 'text-base'} text-gray-600`}>Add Media</p>
              {selectedMedia.length === 0 && (
                <p className="text-sm text-gray-500">or drag and drop</p>
              )}
            </div>
            <input
              id="mediaInput"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileSelection(Array.from(e.target.files || []))}
              className="hidden"
            />
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[700px] h-[600px] shadow-lg mx-auto flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
            {/* Visibility Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
                className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-md"
              >
                <span className="font-medium">{visibility}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isVisibilityOpen && (
                <div className="absolute top-full left-0 mt-1 w-auto bg-buttonclr border rounded-lg shadow-lg py-4 z-10">
                  {[
                    { value: 'Public', icon: publicIcon },
                    { value: 'Private(Followers Only)', icon: privateIcon }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setVisibility(option.value as Visibility);
                        setIsVisibilityOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-5 py-1 hover:bg-gray-100 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img src={option.icon} alt="" className="w-4 h-4" />
                        <span className="whitespace-nowrap text-gray-800">{option.value}</span>
                      </div>
                      <input
                        type="radio"
                        checked={visibility === option.value}
                        readOnly
                        className="w-4 h-4 ml-20 text-maincl"
                      />
                    </button>
                  ))}
                  
                  <div className='mx-5 my-3 flex justify-between items-center border-t'>
                    <div>
                      <p className='text-md text-gray-800'>comment settings</p>
                      <p className='text-xs text-gray-500'>Public</p>
                    </div>
                    <button>
                      <FaCaretRight className='text-gray-600' />
                    </button>
                    </div>
                </div>
              )}
            </div>
          </div>

          {/* Post Type Dropdown */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="flex items-center gap-1 px-3 py-1 bg-buttonclr rounded-2xl"
              >
                <span className="font-medium">{postType}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isTypeOpen && (
                <div className="absolute top-full right-0 mt-1 w-36 z-10 bg-white border rounded-lg shadow-lg py-1">
                  {['Post', 'Question', 'Resource', 'Video'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setPostType(type as PostType);
                        setIsTypeOpen(false);
                        // Reset media when changing type
                        setSelectedMedia([]);
                        setPdfFile(null);
                      }}
                      className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-left"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Title Input */}
          <div className="border border-gray-100 shadow-sm rounded-lg p-3 mb-4">
            <div className='flex items-center justify-between mb-2'>
              <p className='text-sm text-maincl'>Post Title</p>
              <span className="text-xs text-gray-500">{titleCount} characters left</span>
            </div>
            <input
              type="text"
              placeholder="Write your post title here..."
              value={postTitle}
              onChange={handleTitleChange}
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <textarea
              placeholder="What do you want to talk about?"
              value={postContent}
              onChange={handleContentChange}
              className="w-full p-3 min-h-[100px] resize-none outline-none border rounded-lg text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Media Upload Section */}
          {currentStep === 1 && renderMediaUpload()}

          {/* Resource Preview Step */}
          {currentStep === 2 && postType === 'Resource' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium">{postTitle}</h4>
                <p className="text-sm text-gray-600 mt-2">{postContent}</p>
                {pdfFile && (
                  <div className="mt-4 p-3 bg-gray-50 rounded flex items-center">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="ml-2 text-sm">{pdfFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end items-center gap-4">
          {postType === 'Resource' && currentStep === 2 && (
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-1.5 border rounded-3xl hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            className="px-6 py-1.5 bg-maincl text-white rounded-3xl hover:bg-opacity-90 transition-all disabled:opacity-50"
            disabled={
              !postTitle.trim() || 
              !postContent.trim() ||
              (postType === 'Resource' && !pdfFile) ||
              (postType === 'Video' && selectedMedia.length === 0)
            }
            onClick={() => {
              if (postType === 'Resource' && currentStep === 1) {
                setCurrentStep(2);
              } else {
                // Handle post submission
                console.log({
                  type: postType,
                  title: postTitle,
                  content: postContent,
                  visibility,
                  media: selectedMedia,
                  pdf: pdfFile
                });
              }
            }}
          >
            {postType === 'Resource' && currentStep === 1 ? 'Continue' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;








//safety v3  01-02-2025


// import React, { useState, useRef } from 'react';
// import { X, Image,  ChevronDown, FileText, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
// import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
// import publicIcon from "../../assets/icon/public.svg"
// import privateIcon from "../../assets/icon/private.svg"
// import { FaCaretRight } from "react-icons/fa";

// interface PostPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   userAvatar: string;
// }

// type Visibility = 'Public' | 'Private(Followers Only)';
// type PostType = 'Post' | 'Question' | 'Resource' | 'Video';

// const PostPopup: React.FC<PostPopupProps> = ({ isOpen, onClose, userAvatar }) => {
//   const [postContent, setPostContent] = useState('');
//   const [postTitle, setPostTitle] = useState('');
//   const [visibility, setVisibility] = useState<Visibility>('Public');
//   const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
//   const [postType, setPostType] = useState<PostType>('Post');
//   const [isTypeOpen, setIsTypeOpen] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showArrows, setShowArrows] = useState(false);
//   const [wordCount, setWordCount] = useState(500); // Maximum word count
//   const [titleCount, setTitleCount] = useState(100); // Maximum title count

//   const startXRef = useRef<number | null>(null);
//   const currentTranslate = useRef(0);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const mediaInputRef = useRef<HTMLInputElement>(null);

  
//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files);
//     handleFileSelection(files);
//   };

//   const handleFileSelection = (files: File[]) => {
//     if (postType === 'Resource') {
//       const file = files[0];
//       if (file?.type === 'application/pdf') {
//         setPdfFile(file);
//       } else {
//         alert('Please upload a PDF file for resources');
//       }
//       return;
//     }
    
//     const validFiles = files.filter(file => {
//       const isImage = file.type.startsWith('image/');
//       const isVideo = file.type.startsWith('video/');
//       return (postType === 'Video' ? isVideo : isImage) && selectedMedia.length + files.length <= 4;
//     });

//     setSelectedMedia(prev => [...prev, ...validFiles]);
//   };
  
//   const handleTouchStart = (e: React.TouchEvent) => {
//     startXRef.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (startXRef.current !== null) {
//       const currentX = e.touches[0].clientX;
//       currentTranslate.current = currentX - startXRef.current;
//     }
//   };

//   const handleTouchEnd = () => {
//     if (currentTranslate.current > 50 && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else if (currentTranslate.current < -50 && currentIndex < selectedMedia.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//     startXRef.current = null;
//     currentTranslate.current = 0;
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex((prevIndex) => prevIndex - 1);
//   };

//   const handleNext = () => {
//     if (currentIndex < selectedMedia.length - 1) setCurrentIndex((prevIndex) => prevIndex + 1);
//   };

//   const getVisibleDots = () => {
//     const maxVisibleDots = 5;
//     const half = Math.floor(maxVisibleDots / 2);
//     return selectedMedia.map((_, index) => {
//       const diff = Math.abs(index - currentIndex);
//       if (diff <= half) return 1;
//       return Math.max(0.3, 1 - (diff - half) * 0.2);
//     });
//   };

//   const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const newFiles = Array.from(files);
//       setSelectedMedia(prev => [...prev, ...newFiles]);
//       setCurrentIndex(selectedMedia.length); // Move to the newly added image
//     }
//   };

//   const removeMedia = (index: number) => {
//     setSelectedMedia(prev => {
//       const newMedia = prev.filter((_, i) => i !== index);
//       if (currentIndex >= newMedia.length) {
//         setCurrentIndex(Math.max(0, newMedia.length - 1));
//       }
//       return newMedia;
//     });
//   };

//   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const text = e.target.value;
//     const words = text.trim().split(/\s+/).filter(word => word.length > 0);
//     if (words.length <= 500) {
//       setPostContent(text);
//       setWordCount(500 - words.length);
//     }
//   };

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const text = e.target.value;
//     if (text.length <= 100) {
//       setPostTitle(text);
//       setTitleCount(100 - text.length);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-[700px] h-[600px] shadow-lg mx-auto flex flex-col justify-between">
//         <div>
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center gap-2">
//               <img
//                 src={userAvatar}
//                 alt="User Avatar"
//                 className="w-8 h-8 rounded-full"
//               />
//               {/* Visibility Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
//                   className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-md"
//                 >
//                   <span className="font-medium">{visibility}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>
                
//                 {isVisibilityOpen && (
//                   <div className="absolute top-full left-0 mt-1 w-auto bg-buttonclr border rounded-lg shadow-lg py-4 z-10">
//                     {[
//                       { value: 'Public', icon: publicIcon },
//                       { value: 'Private(Followers Only)', icon: privateIcon }
//                     ].map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => {
//                           setVisibility(option.value as Visibility);
//                           setIsVisibilityOpen(false);
//                         }}
//                         className="flex items-center justify-between w-full px-5 py-1  hover:bg-gray-100 text-left"
//                       >
//                         <div className="flex items-center gap-3">
//                           <img src={option.icon} alt="" className="w-4 h-4" />
//                           <span className="whitespace-nowrap text-gray-800">{option.value}</span>
//                         </div>
//                         <input
//                           type="radio"
//                           checked={visibility === option.value}
//                           readOnly
//                           className="w-4 h-4 ml-20 text-maincl"
//                         />
//                       </button>
//                     ))}

//                     <div className='mx-5 my-3 flex justify-between items-center border-t'>
//                       <div className=''>
//                       <p className='text-md text-gray-800 ' >comment settings</p>
//                       <p className='text-xs text-gray-500'> Public</p>
//                       </div>
//                       <button>
//                       <FaCaretRight className='text-gray-600' />

//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Post Type Dropdown */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <button
//                   onClick={() => setIsTypeOpen(!isTypeOpen)}
//                   className="flex items-center gap-1 px-3 py-1 bg-buttonclr  rounded-2xl"
//                 >
//                   <span className="font-medium">{postType}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>
                
//                 {isTypeOpen && (
//                   <div className="absolute top-full right-0 mt-1 w-36 z-10 bg-white border rounded-lg shadow-lg py-1">
//                     {['Post', 'Question', 'Resource', 'Video'].map((type) => (
//                       <button
//                         key={type}
//                         onClick={() => {
//                           setPostType(type as PostType);
//                           setIsTypeOpen(false);
//                         }}
//                         className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-left"
//                       >
//                         {type}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               <button
//                 onClick={onClose}
//                 className="p-1 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>






//           {currentStep === 1 && (
//             <>
//             <div className="flex-1 p-4 overflow-y-auto">

//               {/* Title Input */}
//               <div className="border border-gray-100 shadow-sm rounded-lg p-3"> 
//               <div className='flex items-center justify-between mb-2'>
//                 <p className='text-sm text-maincl'>Post Title</p>
//                 <span className="text-xs text-gray-500">{titleCount} characters left</span>
//               </div>
//               <div className="flex items-center justify-between mb-2">
//                 <input
//                   type="text"
//                   placeholder="Write your post title here..."
//                   value={postTitle}
//                   onChange={handleTitleChange}
//                   className="w-full outline-none text-sm"
//                 />
//               </div>
//             </div>

//               {/* Content Input */}
//               <div className="flex flex-col gap-4">
//                 <textarea
//                   placeholder="What do you want to talk about?"
//                   value={postContent}
//                   onChange={(e) => setPostContent(e.target.value)}
//                   className="w-full p-2 min-h-[100px] outline-none resize-none"
//                 />

//                 {/* Media Upload Section */}
//                 {postType === 'Resource' ? (
//                   <div
//                     className="border-2 border-dashed border-gray-300 rounded-lg p-8"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={handleDrop}
//                   >
//                     <input
//                       type="file"
//                       accept=".pdf"
//                       onChange={(e) => handleFileSelection(Array.from(e.target.files || []))}
//                       className="hidden"
//                       id="pdfInput"
//                     />
//                     <label
//                       htmlFor="pdfInput"
//                       className="flex flex-col items-center cursor-pointer"
//                     >
//                       <FileText className="w-8 h-8 text-gray-400" />
//                       <p className="mt-2 text-gray-600">Upload PDF</p>
//                       <p className="text-sm text-gray-500">or drag and drop</p>
//                     </label>
//                     {pdfFile && (
//                       <div className="mt-4 p-2 bg-gray-50 rounded">
//                         <p className="text-sm text-gray-600">{pdfFile.name}</p>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     {selectedMedia.length > 0 && (
//                       <div className="relative group">
//                         <img
//                           src={URL.createObjectURL(selectedMedia[currentIndex])}
//                           alt=""
//                           className="w-full h-48 object-cover rounded-lg"
//                         />
                        
//                         {selectedMedia.length > 1 && (
//                           <>
//                             <button
//                               className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black bg-opacity-50 rounded-full text-white"
//                               onClick={() => setCurrentIndex(prev => (prev - 1 + selectedMedia.length) % selectedMedia.length)}
//                             >
//                               <ChevronLeft className="w-4 h-4" />
//                             </button>
//                             <button
//                               className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black bg-opacity-50 rounded-full text-white"
//                               onClick={() => setCurrentIndex(prev => (prev + 1) % selectedMedia.length)}
//                             >
//                               <ChevronRight className="w-4 h-4" />
//                             </button>
//                           </>
//                         )}
                        
//                         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//                           {getVisibleDots().map((_, index) => (
//                             <button
//                               key={index}
//                               className={`w-1.5 h-1.5 rounded-full transition-all ${
//                                 index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
//                               }`}
//                               onClick={() => setCurrentIndex(index)}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

                    
//                   </>
//                 )}
//               </div>
//               </div>

//             </>
//           )}
          

//           {/* Content */}
//           <div className="flex-1 p-4 overflow-y-auto">
           

//             {postType === 'Video' ? (
//               <div className="flex flex-col gap-4 mt-2">
//                 {!selectedMedia.length ? (
//                   <div 
//                     className="relative w-full h-[200px] border-2 bg-buttonclr border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
//                     onClick={() => document.getElementById('mediaInput')?.click()}
//                   >
//                     <Image className="w-8 h-8 text-gray-400 mb-4" />
//                     <p className="text-gray-600 mb-2">Add Video</p>
//                     <p className="text-sm text-gray-500">MP4, WebM or Ogg</p>
//                     <p className="text-xs text-gray-400 mt-1">Maximum file size: 100MB</p>
//                     <input
//                       id="mediaInput"
//                       type="file"
//                       accept="video/*"
//                       onChange={handleMediaSelect}
//                       className="hidden"
//                     />
//                   </div>
//                 ) : (
//                   <div className="relative w-full h-[200px] bg-gray-50 rounded-lg overflow-hidden">
//                     <video
//                       src={URL.createObjectURL(selectedMedia[0])}
//                       className="w-full h-full object-contain"
//                       controls
//                     />
//                     <button
//                       onClick={() => setSelectedMedia([])}
//                       className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}

               
//               </div>
//             ) : (
//               <div className="flex flex-col gap-1 mt-4">
//                 <div className="space-y-2">
                 
//                   <textarea
//                     placeholder="What do you want to talk about? Write your post description here..."
//                     value={postContent}
//                     onChange={handleContentChange}
//                     className="w-full p-3 min-h-[100px] resize-none outline-none border rounded-lg text-gray-700 placeholder-gray-400"
//                   />
//                 </div>

//                 {/* Media Preview Section */}
//                 <div className="space-y-1">
//                   {selectedMedia.length > 0 && (
//                     <div className="relative w-full h-[180px] group bg-gray-50 rounded-lg overflow-hidden" 
//                       onMouseEnter={() => setShowArrows(true)} 
//                       onMouseLeave={() => setShowArrows(false)}
//                       onTouchStart={handleTouchStart}
//                       onTouchMove={handleTouchMove}
//                       onTouchEnd={handleTouchEnd}
//                     >
//                       <div className="absolute top-2 left-4 z-10 bg-gray-400 bg-opacity-50 text-white text-xs py-1 px-2 rounded-full">
//                         {currentIndex + 1}/{selectedMedia.length}
//                       </div>
                      
//                       <div className="relative h-full flex justify-center items-center">
//                         <img
//                           src={URL.createObjectURL(selectedMedia[currentIndex])}
//                           alt={`Upload ${currentIndex + 1}`}
//                           className="max-h-[150px] w-auto max-w-[95%] object-contain"
//                         />
//                         <button
//                           onClick={() => removeMedia(currentIndex)}
//                           className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>

//                       {showArrows && currentIndex > 0 && (
//                         <button
//                           className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
//                           onClick={handlePrev}
//                         >
//                           <IoIosArrowDropleftCircle size={24} />
//                         </button>
//                       )}
//                       {showArrows && currentIndex < selectedMedia.length - 1 && (
//                         <button
//                           className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
//                           onClick={handleNext}
//                         >
//                           <IoIosArrowDroprightCircle size={24} />
//                         </button>
//                       )}

//                       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
//                         {selectedMedia.map((_, index) => (
//                           <button
//                             key={index}
//                             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                               index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
//                             }`}
//                             style={{ opacity: getVisibleDots()[index] }}
//                             onClick={() => setCurrentIndex(index)}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Compact Add Media Button */}
//                   {selectedMedia.length < 4 && (
//                     <div
//                       className={`flex justify-center items-center gap-3 ${selectedMedia.length > 0 ? 'p-2' : 'p-8'} border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all`}
//                       onClick={() => document.getElementById('mediaInput')?.click()}
//                     >
//                       <Image className={`${selectedMedia.length > 0 ? 'w-6 h-6' : 'w-8 h-8'} text-gray-400`} />
//                       <div className='flex flex-col justify-center items-center'>
//                         <p className={`${selectedMedia.length > 0 ? 'text-sm' : 'text-base'} text-gray-600`}>Add Media</p>
//                         {selectedMedia.length === 0 && (
//                           <p className="text-sm text-gray-500">or drag and drop</p>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <input
//                   id="mediaInput"
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleMediaSelect}
//                   className="hidden"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//         {currentStep === 2 && postType === 'Resource' && (
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="text-lg font-semibold mb-4">Preview</h3>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium">{postTitle}</h4>
//                 <p className="text-sm text-gray-600 mt-2">{postContent}</p>
//                 {pdfFile && (
//                   <div className="mt-4 p-3 bg-gray-50 rounded flex items-center">
//                     <FileText className="w-5 h-5 text-gray-500" />
//                     <span className="ml-2 text-sm">{pdfFile.name}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}


        
//         {/* Footer */}
//         <div className="p-4 border-t flex justify-end items-center gap-4">
//           {postType === 'Resource' && currentStep === 2 && (
//             <button
//               onClick={() => setCurrentStep(1)}
//               className="px-4 py-1.5 border rounded-3xl hover:bg-gray-50"
//             >
//               Back
//             </button>
//           )}
//           <button
//             className="px-6 py-1.5 bg-maincl text-white rounded-3xl hover:bg-opacity-90 transition-all disabled:opacity-50"
//             disabled={
//               !postTitle.trim() || !postContent.trim() ||
//               (postType === 'Resource' && !pdfFile) ||
//               (postType === 'Video' && selectedMedia.length === 0)
//             }
//             onClick={() => {
//               if (postType === 'Resource' && currentStep === 1) {
//                 setCurrentStep(2);
//               } else {
//                 // Handle post submission
//                 console.log('Post submitted');
//               }
//             }}
//           >
//             {postType === 'Resource' && currentStep === 1 ? 'Continue' : 'Post'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostPopup; 











//working v4


// import React, { useCallback, useMemo, useState, useRef } from "react";
// import { X, Image, ChevronDown } from "lucide-react";
// import {
//   IoIosArrowDropleftCircle,
//   IoIosArrowDroprightCircle,
// } from "react-icons/io";
// import { FaCaretRight } from "react-icons/fa";
// import publicIcon from "../../assets/icon/public.svg";
// import privateIcon from "../../assets/icon/private.svg";
// import { Document, Page, pdfjs } from "react-pdf";
// import add from "../../assets/icon/add2.svg";
// import media from "../../assets/icon/media.svg";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// interface PostPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   userAvatar: string;
// }

// type Visibility = "Public" | "Private(Followers Only)";
// type PostType = "Post" | "Question" | "Resource" | "Video";

// const PostPopup: React.FC<PostPopupProps> = ({
//   isOpen,
//   onClose,
//   userAvatar,
// }) => {
//   const [postContent, setPostContent] = useState("");
//   const [postTitle, setPostTitle] = useState("");
//   const [visibility, setVisibility] = useState<Visibility>("Public");
//   const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
//   const [postType, setPostType] = useState<PostType>("Post");
//   const [isTypeOpen, setIsTypeOpen] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showArrows, setShowArrows] = useState(false);
//   const [titleCount, setTitleCount] = useState(100);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [currVideoStep, setCurrVideoStep] = useState(1);
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [thumbnail, setThumbnail] = useState<string | null>(null);
//   const [videothumbnail, setVideoThumbnail] = useState<string | null>(null);
//   const [showUpload, setShowUpload] = useState(true);
//   const startXRef = useRef<number | null>(null);
//   const currentTranslate = useRef(0);

//   const videoRef = useRef<HTMLVideoElement>(null);

  

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files);
//     handleFileSelection(files);
//   };

//   const handleFileSelection = (files: File[]) => {
//     if (postType === "Resource") {
//       const file = files[0];

//       if (file?.type === "application/pdf") {
//         setPdfFile(file);
//       } else {
//         alert("Please upload a PDF file for resources");
//       }
//       return;
//     }

//     const validFiles = files.filter((file) => {
//       const isImage = file.type.startsWith("image/");
//       const isVideo = file.type.startsWith("video/");

//       return (
//         (postType === "Video" ? isVideo : isImage) &&
//         selectedMedia.length + files.length <= 4
//       );
//     });

//     setSelectedMedia((prev) => [...prev, ...validFiles]);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     startXRef.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (startXRef.current !== null) {
//       const currentX = e.touches[0].clientX;
//       currentTranslate.current = currentX - startXRef.current;
//     }
//   };

//   const handleTouchEnd = () => {
//     if (currentTranslate.current > 50 && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else if (
//       currentTranslate.current < -50 &&
//       currentIndex < selectedMedia.length - 1
//     ) {
//       setCurrentIndex(currentIndex + 1);
//     }
//     startXRef.current = null;
//     currentTranslate.current = 0;
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentIndex < selectedMedia.length - 1)
//       setCurrentIndex((prev) => prev + 1);
//   };

//   const getVisibleDots = () => {
//     const maxVisibleDots = 5;
//     const half = Math.floor(maxVisibleDots / 2);
//     return selectedMedia.map((_, index) => {
//       const diff = Math.abs(index - currentIndex);
//       if (diff <= half) return 1;
//       return Math.max(0.3, 1 - (diff - half) * 0.2);
//     });
//   };

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const text = e.target.value;
//     console.log(text);
//     if (text.length <= 100) {
//       setPostTitle(text);
//       setTitleCount(100 - text.length);
//     }
//   };

//   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const text = e.target.value;
//     const words = text
//       .trim()
//       .split(/\s+/)
//       .filter((word) => word.length > 0);
//     if (words.length <= 500) {
//       setPostContent(text);
//     }
//   };

//   const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const objectURL = URL.createObjectURL(file);
//       setThumbnail(objectURL); // Store URL instead of File
//     }
//   };
//   const handleVideoThumbnailUpload = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const objectURL = URL.createObjectURL(file);
//       setVideoThumbnail(objectURL); // Store URL instead of File
//     }
//   };

//   const renderMediaUpload = () => {
//     if (postType === "Resource") {
//       return (
//         <div
//           className=" rounded-lg px-4 pt-4 h-[180px] flex flex-col justify-end "
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={handleDrop}
//         >
//           {pdfFile && (
//             <div className="flex items-center justify-between mt-4 p-2 border border-gray-100 shadow-sm bg-gray-100 rounded">
//               <p className="text-sm px-3    text-gray-600">{pdfFile.name}</p>
//               <button
//                 onClick={() => setPdfFile(null)}
//                 className="p-1 hover:bg-gray-200 rounded-full"
//               >
//                 {" "}
//                 <X size={20} />
//               </button>
//             </div>
//           )}
//         </div>
//       );
//     }

//     if (postType === "Video") {
//       return (
//         <div className="flex h-full  flex-col gap- items-center justify-center">
//           {!selectedMedia.length ? (
//             <div
//               onClick={() => document.getElementById("mediaInput")?.click()}
//               className="bg-buttonclr h-full w-[40%] border  flex flex-col  items-center justify-center border-dashed border-gray-700 rounded-xl  "
//             >
//               <Image className="w-8 h-8 text-gray-400 mb-4" />
//               <p className="text-gray-600 mb-2">Add Video</p>
//               <p className="text-sm text-gray-500">MP4, WebM or Ogg</p>
//               <p className="text-xs text-gray-400 mt-1">
//                 Maximum file size: 100MB
//               </p>
//               <input
//                 id="mediaInput"
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) =>
//                   handleFileSelection(Array.from(e.target.files || []))
//                 }
//                 className="hidden"
//               />
//             </div>
//           ) : (
//             <div className="relative  h-full  w-[40%]   bg-gray-50 rounded-lg overflow-hidden">
//               <video
//                 src={URL.createObjectURL(selectedMedia[0])}
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 onClick={() => setSelectedMedia([])}
//                 className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-4">
//         {selectedMedia.length > 0 && (
//           <div
//             className="relative w-full h-[450px] group bg-gray-50 rounded-lg overflow-hidden"
//             onMouseEnter={() => setShowArrows(true)}
//             onMouseLeave={() => setShowArrows(false)}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div className="absolute top-2 left-4 z-10 bg-gray-400 bg-opacity-50 text-white text-xs py-1 px-2 rounded-full">
//               {currentIndex + 1}/{selectedMedia.length}
//             </div>

//             <div className="relative h-full flex justify-center items-center">
//               <img
//                 src={URL.createObjectURL(selectedMedia[currentIndex])}
//                 alt={`Upload ${currentIndex + 1}`}
//                 className="max-h-[450px] w-full object-contain"
//               />
//               <button
//                 onClick={() => {
//                   setSelectedMedia((prev) =>
//                     prev.filter((_, i) => i !== currentIndex)
//                   );
//                   if (currentIndex === selectedMedia.length - 1) {
//                     setCurrentIndex(Math.max(0, currentIndex - 1));
//                   }
//                 }}
//                 className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             {showArrows && selectedMedia.length > 1 && (
//               <>
//                 {currentIndex > 0 && (
//                   <button
//                     className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
//                     onClick={handlePrev}
//                   >
//                     <IoIosArrowDropleftCircle size={24} />
//                   </button>
//                 )}
//                 {currentIndex < selectedMedia.length - 1 && (
//                   <button
//                     className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-gray-400 bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
//                     onClick={handleNext}
//                   >
//                     <IoIosArrowDroprightCircle size={24} />
//                   </button>
//                 )}
//               </>
//             )}

//             <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
//               {selectedMedia.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                     index === currentIndex
//                       ? "bg-white"
//                       : "bg-white bg-opacity-50"
//                   }`}
//                   style={{ opacity: getVisibleDots()[index] }}
//                   onClick={() => setCurrentIndex(index)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const firstMedia = selectedMedia[0];
//   const videoUrl = useMemo(() => {
//     if (firstMedia) {
//       return URL.createObjectURL(firstMedia);
//     }
//     return '';
//   }, [firstMedia]);

//   const renderVideoPreview = useCallback(() => {
//     return (
//       <div className="flex  flex-col ">
//             <div className="flex justify-center">
//         <div className="relative h-[40%] w-[20%] bg-gray-50 rounded-lg overflow-hidden">
//           {videoUrl && (
//             <video
//               ref={videoRef}
//               src={videoUrl}
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>
//       </div>

//         {/* Title Input */}
//         <div className="border border-gray-100 shadow-sm  rounded-lg p-3 mb-4">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-sm text-maincl">Post Title</p>
//             <span className="text-xs text-gray-500">
//               {titleCount} characters left
//             </span>
//           </div>
//           <input
//             type="text"
//             placeholder="Write your post title here..."
//             value={postTitle}
//             onChange={(e) => {
//               setPostTitle(e.target.value);
//             }}
//             className="w-full outline-none text-sm"
//           />
//         </div>

//         {/* Description */}
//         <div className="space-y-4">
//           <textarea
//             placeholder="What do you want to talk about?"
//             value={postContent}
//             onChange={handleContentChange}
//             className="w-full p-3 min-h-[20px] resize-none outline-none  text-gray-700 placeholder-gray-400"
//           />
//         </div>

//         {/* Thumbnail Upload Section */}
//         <div className="mt-auto">
//           <button
//             onClick={() => document.getElementById("thumbnailInput")?.click()}
//             className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
//           >
//             <Image className="w-5 h-5 text-gray-400" />
//             <span className="text-gray-600">Upload Thumbnail</span>
//           </button>
//           <input
//             id="thumbnailInput"
//             type="file"
//             accept="image/*"
//             onChange={handleVideoThumbnailUpload}
//             className="hidden"
//           />
//           {videothumbnail && (
//             <div className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
//               <span className="text-sm text-gray-600">Thumbnail uploaded</span>
//               <button
//                 onClick={() => setVideoThumbnail(null)}
//                 className="p-1 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="w-4 h-4 text-gray-500" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }, [ videoRef, titleCount, postTitle, postContent, videothumbnail, videoUrl]);

//   const renderResourcePreview = () => {
//     return (
//       <div className="flex flex-col h-full">
//         {/* PDF Preview Section */}
//         <div className="bg-gray-50 rounded-lg mb-4 h-[450px]  flex items-center justify-center">
//           {thumbnail ? (
//             <img
//               src={thumbnail}
//               alt="Thumbnail preview"
//               className="w-full h-full object-contain rounded-lg"
//             />
//           ) : pdfFile ? (
//             <Document file={pdfFile}>
//               <Page pageNumber={1} width={300} className="rounded-lg" />
//             </Document>
//           ) : (
//             <p className="text-gray-400">No PDF uploaded</p>
//           )}
//         </div>

//         {/* Content Section */}
//         <div className="bg-white rounded-lg p-4 mb-4">
//           <h2 className="text-lg font-medium mb-2">{postTitle}</h2>
//           <p className="text-sm text-gray-600">{postContent}</p>
//         </div>

//         {/* Thumbnail Upload Section */}
//         <div className="mt-auto">
//           <button
//             onClick={() => document.getElementById("thumbnailInput")?.click()}
//             className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
//           >
//             <Image className="w-5 h-5 text-gray-400" />
//             <span className="text-gray-600">Upload Thumbnail</span>
//           </button>
//           <input
//             id="thumbnailInput"
//             type="file"
//             accept="image/*"
//             onChange={handleThumbnailUpload}
//             className="hidden"
//           />
//           {thumbnail && (
//             <div className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
//               <span className="text-sm text-gray-600">Thumbnail uploaded</span>
//               <button
//                 onClick={() => setThumbnail(null)}
//                 className="p-1 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="w-4 h-4 text-gray-500" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderMainContent = () => {
//     if (currentStep === 2 && postType === "Resource") {
//       return renderResourcePreview();
//     }
//     if (currVideoStep === 2 && postType === "Video") {
//       return renderVideoPreview();
//     }
//     return (
//       <>
//         {postType !== "Video" && (
//           <div>
//             {/* Title Input */}
//             <div className="border border-gray-100 shadow-sm rounded-lg p-3 mb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-sm text-maincl">Post Title</p>
//                 <span className="text-xs text-gray-500">
//                   {titleCount} characters left
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Write your post title here..."
//                 value={postTitle}
//                 onChange={handleTitleChange}
//                 className="w-full outline-none text-sm"
//               />
//             </div>

//             {/* Description */}
//             <div className="space-y-4">
//               <textarea
//                 placeholder="What do you want to talk about?"
//                 value={postContent}
//                 onChange={handleContentChange}
//                 className="w-full p-3 min-h-[150px] resize-none outline-none  text-gray-700 placeholder-gray-400"
//               />
//             </div>
//           </div>
//         )}

//         {/* Media Upload Section */}
//         {renderMediaUpload()}
//       </>
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-[700px] h-[600px] shadow-lg mx-auto flex flex-col justify-between">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center gap-2">
//             <img
//               src={userAvatar}
//               alt="User Avatar"
//               className="w-8 h-8 rounded-full"
//             />
//             {/* Visibility Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
//                 className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-md"
//               >
//                 <span className="font-medium">{visibility}</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>

//               {isVisibilityOpen && (
//                 <div className="absolute top-full left-0 mt-1 w-auto bg-buttonclr border rounded-lg shadow-lg py-4 z-10">
//                   {[
//                     { value: "Public", icon: publicIcon },
//                     { value: "Private(Followers Only)", icon: privateIcon },
//                   ].map((option) => (
//                     <button
//                       key={option.value}
//                       onClick={() => {
//                         setVisibility(option.value as Visibility);
//                         setIsVisibilityOpen(false);
//                       }}
//                       className="flex items-center justify-between w-full px-5 py-1 hover:bg-gray-100 text-left"
//                     >
//                       <div className="flex items-center gap-3">
//                         <img src={option.icon} alt="" className="w-4 h-4" />
//                         <span className="whitespace-nowrap text-gray-800">
//                           {option.value}
//                         </span>
//                       </div>
//                       <input
//                         type="radio"
//                         checked={visibility === option.value}
//                         readOnly
//                         className="w-4 h-4 ml-20 text-maincl"
//                       />
//                     </button>
//                   ))}

//                   <div className="mx-5 my-3 flex justify-between items-center border-t">
//                     <div>
//                       <p className="text-md text-gray-800">comment settings</p>
//                       <p className="text-xs text-gray-500">Public</p>
//                     </div>
//                     <button>
//                       <FaCaretRight className="text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Post Type Dropdown */}
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <button
//                 onClick={() => setIsTypeOpen(!isTypeOpen)}
//                 className="flex items-center gap-1 px-3 py-1 bg-buttonclr rounded-2xl"
//               >
//                 <span className="font-medium">{postType}</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>

//               {isTypeOpen && (
//                 <div className="absolute top-full right-0 mt-1 w-36 z-10 bg-white border rounded-lg shadow-lg py-1">
//                   {["Post", "Question", "Resource", "Video"].map((type) => (
//                     <button
//                       key={type}
//                       onClick={() => {
//                         setPostType(type as PostType);
//                         setIsTypeOpen(false);
//                         // Reset media when changing type
//                         setSelectedMedia([]);
//                         setPdfFile(null);
//                         setShowUpload(true);
//                         setPostTitle("");
//                         setPostContent("");
//                         setTitleCount(100);
//                         setThumbnail(null);
//                         setVideoThumbnail(null);
//                         setCurrentStep(1);
//                       }}
//                       className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-left"
//                     >
//                       {type}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={onClose}
//               className="p-1 hover:bg-gray-100 rounded-full"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-4 overflow-y-auto">{renderMainContent()}</div>

//         {/* Footer */}
//         <div className="p-4 sticky bottom-0 flex justify-between items-center gap-4">
//           <div className=" flex justify-between items-center gap-4">
//             <div className="flex items-center gap-2">
//               <input
//                 type="file"
//                 id="universalMediaInput"
//                 className="hidden"
//                 accept={
//                   postType === "Resource"
//                     ? "application/pdf"
//                     : postType === "Video"
//                     ? "video/*"
//                     : "image/*"
//                 }
//                 multiple={postType !== "Video"}
//                 onChange={(e) =>
//                   handleFileSelection(Array.from(e.target.files || []))
//                 }
//               />

//               {showUpload ? (
//                 <label
//                   htmlFor="universalMediaInput"
//                   className="flex items-center   cursor-pointer "
//                 >
//                   <span className=" flex border border-gray-200 rounded-3xl gap-2 text-gray-700 p-1 px-3">
//                     <img src={media} alt="" />
//                     {postType === "Resource" ? "Upload PDF" : "Add Media"}
//                   </span>
//                   <img src={add} alt="" />
//                 </label>
//               ) : (
//                 <div></div>
//               )}
//             </div>

//             {/* Post button remains unchanged */}
//           </div>
//           <div>
//             {((postType === "Resource" && currentStep === 2) ||
//               (postType === "Video" && currVideoStep === 2)) && (
//               <button
//                 onClick={() => {
//                   return (
//                     setShowUpload(true), setCurrentStep(1), setCurrVideoStep(1)
//                   );
//                 }}
//                 className="px-4 py-1.5 border rounded-3xl hover:bg-gray-50"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               className="px-6 py-1.5 bg-maincl text-white rounded-3xl hover:bg-opacity-90 transition-all disabled:opacity-50"
//               disabled={
//                 (!postTitle.trim() && postType !== "Video") ||
//                 (!postContent.trim() && postType !== "Video") ||
//                 (postType === "Resource" && !pdfFile) ||
//                 (postType === "Video" && selectedMedia.length === 0)
//               }
//               onClick={() => {
//                 if (postType === "Resource" && currentStep === 1) {
//                   setCurrentStep(2);
//                   setShowUpload(false);
//                 } else {
//                   // Handle post submission
//                   console.log({
//                     type: postType,
//                     title: postTitle,
//                     content: postContent,
//                     visibility,
//                     media: selectedMedia,
//                     pdf: pdfFile,
//                   });
//                 }
//                 if (postType === "Video" && currVideoStep === 1) {
//                   setCurrVideoStep(2);
//                 } else {
//                   // Handle post submission
//                   console.log({
//                     type: postType,
//                     title: postTitle,
//                     content: postContent,
//                     visibility,
//                     media: selectedMedia,
//                     pdf: pdfFile,
//                   });
//                 }
//               }}
//             >
//               {(postType === "Resource" || postType === "Video") &&
//               currentStep === 1
//                 ? "Continue"
//                 : "Post"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostPopup;
