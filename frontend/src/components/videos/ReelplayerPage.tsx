import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Heart, MoreVertical } from 'lucide-react';
import rcomment from "../../assets/icon/rcomment.svg";
import rshare from "../../assets/icon/rshare.svg";
import rsave1 from "../../assets/icon/rsave1.svg";
import rsave2 from "../../assets/icon/rsave2.svg";
import pause from "../../assets/icon/pause.svg";
import { Navigation } from './Navigation';

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

  return (
    <div 
      className="relative h-screen w-full max-w-md mx-auto bg-black font-fontsm overflow-hidden"
      onWheel={handleWheel}
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
        >
      {/* Video Container */}
          <div className="relative h-full w-full bg-black flex items-center justify-center">
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
              className="absolute bottom-16 left-0 right-0 h-1 bg-gray-800 cursor-pointer"
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
        
        <button className="flex flex-col items-center text-white">
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
            <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
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
    
    <div className="">
      <Navigation />
      </div>
    </div>
  );
};

export default ReelsFeed;