// const PostPopup: React.FC<PostPopupProps> = ({ isOpen, onClose, userAvatar }) => {
//     // Previous state declarations remain the same...
//     const [thumbnail, setThumbnail] = useState<File | null>(null);
  
//     // Previous handlers remain the same...
  
//     const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (file && file.type.startsWith('image/')) {
//         setThumbnail(file);
//       }
//     };
  
//     // Add this new function to render the resource preview step
//     const renderResourcePreview = () => {
//       return (
//         <div className="flex flex-col h-full">
//           {/* PDF Preview Section */}
//           <div className="bg-gray-50 rounded-lg mb-4 h-72">
//             {pdfFile ? (
//               <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
//                 <div className="p-4 flex flex-col items-center">
//                   <FileText className="w-16 h-16 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600 break-all text-center">{pdfFile.name}</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <p className="text-gray-400">No PDF uploaded</p>
//               </div>
//             )}
//           </div>
  
//           {/* Article Section */}
//           <div className="bg-white rounded-lg p-4 mb-4">
//             <div className="text-xs text-blue-500 mb-2">Article</div>
//             <h2 className="text-lg font-medium mb-2">{postTitle}</h2>
//             <p className="text-sm text-gray-600">{postContent}</p>
//           </div>
  
//           {/* Thumbnail Upload Section */}
//           <div className="mt-auto">
//             <button
//               onClick={() => document.getElementById('thumbnailInput')?.click()}
//               className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
//             >
//               <Image className="w-5 h-5 text-gray-400" />
//               <span className="text-gray-600">Upload Thumbnail</span>
//             </button>
//             <input
//               id="thumbnailInput"
//               type="file"
//               accept="image/*"
//               onChange={handleThumbnailUpload}
//               className="hidden"
//             />
//             {thumbnail && (
//               <div className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
//                 <span className="text-sm text-gray-600">{thumbnail.name}</span>
//                 <button
//                   onClick={() => setThumbnail(null)}
//                   className="p-1 hover:bg-gray-100 rounded-full"
//                 >
//                   <X className="w-4 h-4 text-gray-500" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     };
  
//     // Update the main render content for step 2
//     const renderMainContent = () => {
//       if (currentStep === 2 && postType === 'Resource') {
//         return renderResourcePreview();
//       }
  
//       return (
//         <>
//           {/* Title Input */}
//           <div className="border border-gray-100 shadow-sm rounded-lg p-3 mb-4">
//             <div className='flex items-center justify-between mb-2'>
//               <p className='text-sm text-maincl'>Post Title</p>
//               <span className="text-xs text-gray-500">{titleCount} characters left</span>
//             </div>
//             <input
//               type="text"
//               placeholder="Write your post title here..."
//               value={postTitle}
//               onChange={handleTitleChange}
//               className="w-full outline-none text-sm"
//             />
//           </div>
  
//           {/* Description */}
//           <div className="space-y-4">
//             <textarea
//               placeholder="What do you want to talk about?"
//               value={postContent}
//               onChange={handleContentChange}
//               className="w-full p-3 min-h-[100px] resize-none outline-none border rounded-lg text-gray-700 placeholder-gray-400"
//             />
//             <span className="text-xs text-gray-500 float-right">{wordCount} words remaining</span>
//           </div>
  
//           {/* Media Upload Section */}
//           {renderMediaUpload()}
//         </>
//       );
//     };
  
//     if (!isOpen) return null;
  
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl w-[700px] h-[600px] shadow-lg mx-auto flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             {/* Previous header content remains the same... */}
//           </div>
  
//           {/* Main Content */}
//           <div className="flex-1 p-4 overflow-y-auto">
//             {renderMainContent()}
//           </div>
  
//           {/* Footer */}
//           <div className="p-4 border-t flex justify-end items-center gap-4">
//             {postType === 'Resource' && currentStep === 2 && (
//               <button
//                 onClick={() => setCurrentStep(1)}
//                 className="px-4 py-1.5 border rounded-3xl hover:bg-gray-50"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               className="px-6 py-1.5 bg-maincl text-white rounded-3xl hover:bg-opacity-90 transition-all disabled:opacity-50"
//               disabled={
//                 !postTitle.trim() || 
//                 !postContent.trim() ||
//                 (postType === 'Resource' && !pdfFile) ||
//                 (postType === 'Video' && selectedMedia.length === 0)
//               }
//               onClick={() => {
//                 if (postType === 'Resource' && currentStep === 1) {
//                   setCurrentStep(2);
//                 } else {
//                   // Handle post submission
//                   console.log({
//                     type: postType,
//                     title: postTitle,
//                     content: postContent,
//                     visibility,
//                     media: selectedMedia,
//                     pdf: pdfFile,
//                     thumbnail
//                   });
//                 }
//               }}
//             >
//               {postType === 'Resource' && currentStep === 1 ? 'Continue' : 'Post'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default PostPopup;





import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Heart, MoreVertical, X } from 'lucide-react';
import rcomment from "../../assets/icon/rcomment.svg";
import rshare from "../../assets/icon/rshare.svg";
import rsave1 from "../../assets/icon/rsave1.svg";
import rsave2 from "../../assets/icon/rsave2.svg";
import pause from "../../assets/icon/pause.svg";
import like from "../../assets/icon/like1.svg";
import liked from "../../assets/icon/liked.svg";
import comment1 from "../../assets/icon/comment1.svg";
import { Navigation } from './Navigation';
import { Header } from './Header';
import JobFilterStatic from './JobFilterCard';

interface ReelData {
  id: string;
  videoUrl: string;
  author: {
    name: string;
    profileImage: string;
    title: string;
    date: string;
  };
  likes: number;
  comments: number;
  shares: number;
  description: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    profileImage: string;
    title: string;
    timeAgo: string;
  };
  content: string;
  likes: number;
  replies: {
    id: string;
    author: {
      name: string;
      profileImage: string;
      title: string;
      timeAgo: string;
    };
    content: string;
    likes: number;
  }[];
}

const ReelsFeed = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reelsState, setReelsState] = useState<{ [key: string]: {
    isPlaying: boolean;
    progress: number;
    isLiked: boolean;
    isSaved: boolean;
    isExpanded: boolean;
    showOptions: boolean;
    isError: boolean;
  } }>({});
  const [showComments, setShowComments] = useState(false);

  const touchStartY = useRef(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const optionsRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const minSwipeDistance = 50;

  // Sample reels data
  const reelsData = useMemo<ReelData[]>(() => [
    {
      id: '1',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      author: {
        name: 'Pratham Jindal',
        profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
        title: 'Ophthalmologist | AIIMS Delhi`25 ',
        date: '22 Dec 2024'
      },
      likes: 126,
      comments: 13,
      shares: 1,
      description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth"
    },
    {
      id: '2',
      videoUrl: 'https://rr5---sn-cvh76ner.googlevideo.com/videoplayback?expire=1736511951&ei=b72AZ4O4EpGo9fwPgdDziAI&ip=2001%3A448a%3A2061%3Ac4ee%3Afd9c%3A2ec5%3Aeb62%3A4aa6&id=o-AAa3wLAwt4FFVtp0_oZ98f1ABFy7L9_UIAfDaEYcP76T&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&pcm2=no&bui=AY2Et-MZxdrCMMV_FJS6qyyXXUo7BUjIwERW2kmV5K0BI0Wj2cdJHB_WxpthqKa3PI8QwLILITlzVLt_&spc=9kzgDb6sIKtqEIVtOMfYdRiYvegs1OeCEz1rrvK6b_nwWJCKf1Sch0mFdkaKomz-yw&vprv=1&svpuc=1&mime=video%2Fmp4&ns=2l-AFHMPMlhMSPpACe8CC40Q&rqh=1&gir=yes&clen=604256&ratebypass=yes&dur=7.360&lmt=1730487188764776&fexp=24350590,24350737,24350827,24350975,51326932,51331020,51335594,51353497,51371294&c=MWEB&sefc=1&txp=5430434&n=mg3N1rL-8UyOkA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cpcm2%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgfhK-zl315_IhM6fNFF4r1hoVhR87sawr4vFAT518UTwCIQDALmZ7oolOYoHSjorJkieVWwbISUwtTEGXzP1XHg0lxQ%3D%3D&title=Haikyuu!!%20The%20Movie%202024%20Decisive%20Battle%20at%20the%20Garbage%20Dump%20%23shorts%20%23anime%20%23haikyuu%20%23haikyuumovie&rm=sn-2uuxa3vh-jb3sz7s,sn-nposr7l&rrc=79,104&req_id=34dcf1191fdfa3ee&rms=nxu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1736490354,&mh=au&mip=110.235.225.146&mm=30&mn=sn-cvh76ner&ms=nxu&mt=1736489786&mv=m&mvi=5&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRAIgGZWuOfNUlSb4sU8L_5vzC9GtPcNFl6s4y6PzvtjZTZoCIGx3GVJ7kfv7cx9Bbj-AGyB9osEkt9IFkrBDhdNMtg2l',
      author: {
        name: 'Pratham Jindal',
        profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
        title: 'Ophthalmologist | AIIMS Delhi`25 ',
        date: '22 Dec 2024'
      },
      likes: 126,
      comments: 13,
      shares: 1,
      description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth"
    },
    {
      id: '3',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      author: {
        name: 'Pratham Jindal',
        profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
        title: 'Ophthalmologist | AIIMS Delhi`25 ',
        date: '22 Dec 2024'
      },
      likes: 126,
      comments: 13,
      shares: 1,
      description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth"
    },
    {
      id: '4',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      author: {
        name: 'Pratham Jindal',
        profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
        title: 'Ophthalmologist | AIIMS Delhi`25 ',
        date: '22 Dec 2024'
      },
      likes: 126,
      comments: 13,
      shares: 1,
      description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth"
    },
    // Add more reels with the same structure
  ], []);

  // Sample comments data
  const comments = useMemo(() => [
    {
      id: '1',
      author: {
        name: 'Dr. Sarah Johnson',
        profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
        title: 'Cardiologist | Mayo Clinic',
        timeAgo: '2h ago'
      },
      content: 'This is such an informative video! @PrathamJindal your insights on ophthalmology are always valuable.',
      likes: 24,
      replies: [
        {
          id: 'r1',
          author: {
            name: 'Dr. Michael Chen',
            profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
            title: 'Neurologist | Johns Hopkins',
            timeAgo: '1h ago'
          },
          content: 'Completely agree! The interdisciplinary approach you mentioned is crucial.',
          likes: 8
        }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Dr. Emily White',
        profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
        title: 'Pediatrician | Boston Children\'s Hospital',
        timeAgo: '3h ago'
      },
      content: 'Great explanation of the diagnostic process! Would love to see more content like this.',
      likes: 15,
      replies: []
    }
  ], []);

  // Initialize state for each reel
  useEffect(() => {
    const initialState = reelsData.reduce((acc, reel) => ({
      ...acc,
      [reel.id]: {
        isPlaying: false,
        progress: 0,
        isLiked: false,
        isSaved: false,
        isExpanded: false,
        showOptions: false,
        isError: false,
      }
    }), {});
    setReelsState(initialState);
  }, [reelsData]);

  // Scroll handling
  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY > 0 && currentReelIndex < reelsData.length - 1) {
      handleReelChange(currentReelIndex + 1);
    } else if (event.deltaY < 0 && currentReelIndex > 0) {
      handleReelChange(currentReelIndex - 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchEndY = event.changedTouches[0].clientY;
    const swipeDistance = touchStartY.current - touchEndY;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentReelIndex < reelsData.length - 1) {
        handleReelChange(currentReelIndex + 1);
      } else if (swipeDistance < 0 && currentReelIndex > 0) {
        handleReelChange(currentReelIndex - 1);
      }
    }
  };

  const handleReelChange = async (newIndex: number) => {
    // Pause current video
    const currentReel = reelsData[currentReelIndex];
    const currentVideo = videoRefs.current[currentReel.id];
    if (currentVideo) {
      currentVideo.pause();
      setReelsState(prev => ({
        ...prev,
        [currentReel.id]: { ...prev[currentReel.id], isPlaying: false }
      }));
    }

    // Play new video
    setCurrentReelIndex(newIndex);
    const newReel = reelsData[newIndex];
    const newVideo = videoRefs.current[newReel.id];
    if (newVideo) {
      try {
        await newVideo.play();
        setReelsState(prev => ({
          ...prev,
          [newReel.id]: { ...prev[newReel.id], isPlaying: true }
        }));
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  const togglePlay = async (reelId: string) => {
    const video = videoRefs.current[reelId];
    if (!video) return;

    try {
      if (reelsState[reelId].isPlaying) {
        await video.pause();
      } else {
        await video.play();
      }
      setReelsState(prev => ({
        ...prev,
        [reelId]: { ...prev[reelId], isPlaying: !prev[reelId].isPlaying }
      }));
    } catch (error) {
      console.error('Error playing video:', error);
      setReelsState(prev => ({
        ...prev,
        [reelId]: { ...prev[reelId], isError: true }
      }));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>, reelId: string) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.offsetWidth) * 100;
    
    const video = videoRefs.current[reelId];
    if (video) {
      const newTime = (percentageClicked / 100) * video.duration;
      video.currentTime = newTime;
      setReelsState(prev => ({
        ...prev,
        [reelId]: { ...prev[reelId], progress: percentageClicked }
      }));
    }
  };

  // Add this new function to check video orientation
  const handleLoadedMetadata = (video: HTMLVideoElement) => {
    const isVertical = video.videoHeight > video.videoWidth;
    video.classList.toggle('object-cover', isVertical);
    video.classList.toggle('object-contain', !isVertical);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="flex flex-col min-h-screen  overflow-y-hidden no-scrollbar  mx-auto"> 
      <div className="bg-white border-b fixed w-full top-0 z-50 hidden lg:block">
        <Header
          onNotification={() => console.log("Notification clicked")}
          onMessage={() => console.log("Message clicked")}
          onProfile={() => console.log("Profile clicked")}
          onSearch={() => console.log("Profile clicked")}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-screen lg:pl-24 max-w-7xl mx-auto w-full gap-10 ">
        {/* Left Sidebar */}
          <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
            <div className="sticky top-[calc(theme(spacing.20)+1px)] space-y-4">
              <JobFilterStatic/>
            </div>
          </div>

        {/* Main Feed and Comments Section */}
        <div className={`flex-1 flex  'max-w-[1000px]'   mx-auto transition-all duration-300`}>
          {/* Video Feed */}
          <div 
           className="relative  lg:rounded-3xl lg:max-h-[90vh] bg-black font-fontsm transition-all duration-300"
           style={{
            height: "calc(100vh)",
            width: "calc((100vh - 88px) * (9 / 16))",
            minHeight: "560px",
            minWidth: "315px",
            maxWidth: "428px", 
            position: "sticky",
            top: "80px",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            touchAction: "pan-y pinch-zoom"
          }}
         
          onWheel={(e) => {
            e.preventDefault();
            handleWheel(e);
          }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {reelsData.map((reel, index) => (
              <div
                key={reel.id}
                className={`absolute w-full h-full transition-transform duration-300 ${
                  index === currentReelIndex ? 'translate-y-0' : 
                  index < currentReelIndex ? '-translate-y-full' : 'translate-y-full'
                }`}
                style={{
                  willChange: 'transform',
                  touchAction: 'none',
                  height: "100%",
                  transform: `translateY(${(index - currentReelIndex) * 100}%)`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0
                }}
              >
                {/* Video Container */}
                <div className="relative h-full w-full bg-black   flex items-center justify-center">
                  {reelsState[reel.id]?.isError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                      <p>Failed to load video</p>
                    </div>
                  ) : (
                    <video
                      ref={el => {
                        if (el) {
                          videoRefs.current[reel.id] = el;
                          // Handle already loaded videos
                          if (el.readyState >= 1) {
                            handleLoadedMetadata(el);
                          }
                        }
                      }}
                      className="h-full w-full"
                      onLoadedMetadata={(e) => handleLoadedMetadata(e.target as HTMLVideoElement)}
                      loop
                      playsInline
                      onClick={() => togglePlay(reel.id)}
                    >
                      <source src={reel.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {/* Play Button Overlay */}
                  {!reelsState[reel.id]?.isPlaying && !reelsState[reel.id]?.isError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button 
                        onClick={() => togglePlay(reel.id)}
                        className="bg-white/30 rounded-full p-4 text-white hover:bg-white/40"
                      >
                        <img src={pause} alt="" className="w-8" />
                      </button>
                    </div>
                  )}

                  {/* Options Menu */}
                  <div className="absolute top-4 right-4 z-50" ref={el => el && (optionsRefs.current[reel.id] = el)}>
                    <button
                      onClick={() => setReelsState(prev => ({
                        ...prev,
                        [reel.id]: { ...prev[reel.id], showOptions: !prev[reel.id].showOptions }
                      }))}
                      className="bg-white/30 p-2 rounded-full text-white hover:bg-white/40 transition-colors"
                    >
                      <MoreVertical size={24} />
                    </button>
                    
                    {reelsState[reel.id]?.showOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                        <button 
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], showOptions: false }
                          }))}
                        >
                          Report
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], showOptions: false }
                          }))}
                        >
                          Not Interested
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], showOptions: false }
                          }))}
                        >
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div 
                    className="absolute bottom-16 lg:bottom-3  left-0 right-0 h-1 bg-gray-800 cursor-pointer"
                    onClick={(e) => handleProgressClick(e, reel.id)}
                  >
                    <div 
                      className="h-full bg-white transition-all duration-100 z-20"
                      style={{ width: `${reelsState[reel.id]?.progress || 0}%` }}
                    />
                  </div>

                  {/* Right Side Interaction Buttons */}
                  <div className="absolute right-4 bottom-24 mb-2 flex flex-col gap-4">
                    <button 
                      className="flex flex-col items-center text-white"
                      onClick={() => setReelsState(prev => ({
                        ...prev,
                        [reel.id]: { ...prev[reel.id], isLiked: !prev[reel.id].isLiked }
                      }))}
                    >
                      <div className="p-2 rounded-full hover:bg-black/40 transition-colors">
                        <Heart 
                          size={30} 
                          fill={reelsState[reel.id]?.isLiked ? "white" : "none"} 
                          color="white" 
                        />
                      </div>
                      <span className="text-sm">
                        {reelsState[reel.id]?.isLiked ? reel.likes + 1 : reel.likes}
                      </span>
                    </button>
                    
                    <button 
                      className="flex flex-col items-center text-white"
                      onClick={toggleComments}
                    >
                      <div className="p-2 rounded-full hover:bg-black/40 transition-colors">
                        <img src={rcomment} alt="" className="w-8" />
                      </div>
                      <span className="text-sm">{reel.comments}</span>
                    </button>
                    
                    <button className="flex flex-col items-center text-white">
                      <div className="p-2 rounded-full hover:bg-black/40 transition-colors">
                        <img src={rshare} alt="" className="w-8" />
                      </div>
                      <span className="text-sm">{reel.shares}</span>
                    </button>
                    
                    <button className="flex flex-col items-center text-white z-10">
                      <div className="p-2 rounded-full transition-colors">
                        <img
                          src={reelsState[reel.id]?.isSaved ? rsave2 : rsave1}
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], isSaved: !prev[reel.id].isSaved }
                          }))}
                          alt=""
                          className="w-5"
                        />
                      </div>
                    </button>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="absolute bottom-16 lg:bottom-3 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center gap-3">
                      <img
                        src={reel.author.profileImage}
                        alt={reel.author.name}
                        className="w-11 h-11 rounded-full ml-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">{reel.author.name}</h3>
                          <button className="text-maincl text-xs ml-1 bg-buttonclr bg-opacity-40 px-3 py-0.5 rounded-full hover:bg-white/70 transition-colors">
                            Follow
                          </button>
                        </div>
                        <p className="text-white/80 text-xs">{reel.author.title}</p>
                        <p className="text-white/80 text-xs">{reel.author.date}</p>
                      </div>
                    </div>
                    <div className={`mt-2 transition-all text-sm duration-300 ${
                      reelsState[reel.id]?.isExpanded ? 'h-auto' : 'h-[2.6em]'
                    } overflow-hidden relative`}>
                      <p className="text-white">{reel.description}</p>
                      {!reelsState[reel.id]?.isExpanded && reel.description.length > 70 && (
                        <div className="absolute bottom-0 right-0 bg-gradient-to-l from-black/10 pl-8 z-10">
                          <button 
                            onClick={() => setReelsState(prev => ({
                              ...prev,
                              [reel.id]: { ...prev[reel.id], isExpanded: true }
                            }))}
                            className="text-maincl hover:underline"
                          >
                            ..more
                          </button>
                        </div>
                      )}
                      {reelsState[reel.id]?.isExpanded && (
                        <button 
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], isExpanded: false }
                          }))}
                          className="text-maincl hover:underline ml-1"
                        >
                          less
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comments Panel */}
          <div 
            className={`hidden lg:block bg-white border-l h-[90vh] overflow-hidden transition-all duration-300 ${
              showComments ? 'w-[400px]' : 'w-0'
            }`}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Comments</h2>
                <button onClick={toggleComments}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Author info */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img 
                      src={reelsData[currentReelIndex].author.profileImage} 
                      alt={reelsData[currentReelIndex].author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{reelsData[currentReelIndex].author.name}</h3>
                      <p className="text-sm text-gray-600">{reelsData[currentReelIndex].author.title}</p>
                      <p className="text-xs text-gray-500">{reelsData[currentReelIndex].author.date}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">{reelsData[currentReelIndex].description}</p>
                </div>

                {/* Comments list */}
                <div className="p-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="mb-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={comment.author.profileImage}
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{comment.author.name}</h4>
                            <span className="text-xs text-gray-500">{comment.author.timeAgo}</span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.author.title}</p>
                          <p className="mt-1">{comment.content}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <button className="text-sm text-gray-500 flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {comment.likes}
                            </button>
                            <button className="text-sm text-gray-500">Reply</button>
                          </div>
                          {comment.replies.length > 0 && (
                            <div className="mt-2">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="ml-4 mb-2">
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={reply.author.profileImage}
                                      alt={reply.author.name}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                      <h4 className="font-semibold">{reply.author.name}</h4>
                                      <p className="text-sm text-gray-600">{reply.author.title}</p>
                                      <p className="text-xs text-gray-500">{reply.author.timeAgo}</p>
                                    </div>
                                  </div>
                                  <p className="mt-1">{reply.content}</p>
                                  <div className="mt-2 flex items-center gap-4">
                                    <button className="text-sm text-gray-500 flex items-center gap-1">
                                      <Heart className="w-4 h-4" />
                                      {reply.likes}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="text-blue-500 font-semibold text-sm">Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Comments Panel */}
      {showComments && (
        <div className="lg:hidden fixed  bg-black bg-opacity-50 z-50 transition-all duration-300 w-full h-full">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] max-h-[80vh] overflow-y-auto">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Comments</h2>
                <button onClick={toggleComments}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Author info */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img 
                      src={reelsData[currentReelIndex].author.profileImage} 
                      alt={reelsData[currentReelIndex].author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{reelsData[currentReelIndex].author.name}</h3>
                      <p className="text-sm text-gray-600">{reelsData[currentReelIndex].author.title}</p>
                      <p className="text-xs text-gray-500">{reelsData[currentReelIndex].author.date}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">{reelsData[currentReelIndex].description}</p>
                </div>

                {/* Comments list */}
                <div className="p-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="mb-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={comment.author.profileImage}
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{comment.author.name}</h4>
                            <span className="text-xs text-gray-500">{comment.author.timeAgo}</span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.author.title}</p>
                          <p className="mt-1">{comment.content}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <button className="text-sm text-gray-500 flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {comment.likes}
                            </button>
                            <button className="text-sm text-gray-500">Reply</button>
                          </div>
                          {comment.replies.length > 0 && (
                            <div className="mt-2">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="ml-4 mb-2">
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={reply.author.profileImage}
                                      alt={reply.author.name}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                      <h4 className="font-semibold">{reply.author.name}</h4>
                                      <p className="text-sm text-gray-600">{reply.author.title}</p>
                                      <p className="text-xs text-gray-500">{reply.author.timeAgo}</p>
                                    </div>
                                  </div>
                                  <p className="mt-1">{reply.content}</p>
                                  <div className="mt-2 flex items-center gap-4">
                                    <button className="text-sm text-gray-500 flex items-center gap-1">
                                      <Heart className="w-4 h-4" />
                                      {reply.likes}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="text-blue-500 font-semibold text-sm">Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          </div>

      <div className="lg:hidden">
        <Navigation />
      </div>
    </div>
  );
};

export default ReelsFeed;