import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music2, Play } from 'lucide-react';
import { CommentsSection } from './CommentSection';


interface Comment {
    id: string;
    user: User;
    text: string;
    likes: number;
    createdAt: string;
    replies: Reply[];
  }
  interface Reply {
    id: string;
    user: User;
    text: string;
    likes: number;
    createdAt: string;
  }
  interface Reel {
    id: string;
    user: User;
    videoUrl: string;
    caption: string;
    likes: number;
    comments: Comment[];
    music: string;
    views: number;
  }
  interface User {
    id: string;
    username: string;
    avatar: string;
  }
  


export const ReelsPlayer: React.FC = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reels: Reel[] = [
    {
      id: '1',
      user: {
        id: 'user1',
        username: 'travel_enthusiast',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
      },
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      caption: '🌴 Paradise found! #travel #wanderlust',
      likes: 1234,
      comments: [],
      music: '🎵 Summer Vibes - Tropical Mix',
      views: 5678,
    },
    {
      id: '2',
      user: {
        id: 'user2',
        username: 'food_lover',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      },
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      caption: '🍜 Cooking up something special! #foodie #cooking',
      likes: 2345,
      comments: [],
      music: '🎵 Kitchen Beats - Chef\'s Mix',
      views: 6789,
    },
    {
      id: '3',
      user: {
        id: 'user3',
        username: 'fitness_guru',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop',
      },
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      caption: '💪 Morning workout routine #fitness #wellness',
      likes: 3456,
      comments: [],
      music: '🎵 Workout Energy - Fitness Mix',
      views: 7890,
    },
  ];
  const currentReel = reels[currentReelIndex];
  const minSwipeDistance = 50;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      if (isPlaying) {
        video.play().catch(() => {
          setIsPlaying(false);
        });
      }
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleEnded = () => {
      if (currentReelIndex < reels.length - 1) {
        setCurrentReelIndex(prev => prev + 1);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentReelIndex, isPlaying, reels.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            videoRef.current?.play().catch(() => {
              setIsPlaying(false);
            });
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  const handleVideoPress = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > minSwipeDistance;

    if (isSwipe) {
      if (distance > 0 && currentReelIndex < reels.length - 1) {
        // Swipe up
        setCurrentReelIndex(prev => prev + 1);
      } else if (distance < 0 && currentReelIndex > 0) {
        // Swipe down
        setCurrentReelIndex(prev => prev - 1);
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentReelIndex < reels.length - 1) {
      // Scroll down
      setCurrentReelIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentReelIndex > 0) {
      // Scroll up
      setCurrentReelIndex(prev => prev - 1);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComments(true);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement share functionality
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[400px] h-[calc(100vh-80px)] bg-black overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* Video Player */}
        <div className="relative h-full" onClick={handleVideoPress}>
          <video
            ref={videoRef}
            src={currentReel.videoUrl}
            className="w-full h-full object-cover"
            loop
            playsInline
            preload="auto"
            muted
          />
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Play/Pause Overlay */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Play className="w-16 h-16 text-white opacity-75" />
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
            <div className="h-full bg-white" style={{ width: '0%' }} />
          </div>

          {/* User Info */}
          <div className="absolute bottom-20 left-4 text-white z-10">
            <div className="flex items-center space-x-2">
              <img
                src={currentReel.user.avatar}
                alt={currentReel.user.username}
                className="w-10 h-10 rounded-full border border-white/20"
              />
              <span className="font-semibold">{currentReel.user.username}</span>
            </div>
            <p className="mt-2 text-sm">{currentReel.caption}</p>
            <div className="flex items-center mt-2 space-x-2">
              <Music2 className="w-4 h-4" />
              <span className="text-sm">{currentReel.music}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-4 bottom-20 flex flex-col space-y-6">
            <button
              onClick={handleLike}
              className="flex flex-col items-center"
            >
              <Heart
                className={`w-8 h-8 ${liked ? 'text-red-500 fill-current' : 'text-white'}`}
              />
              <span className="text-white text-sm">{currentReel.likes}</span>
            </button>
            <button
              onClick={handleCommentClick}
              className="flex flex-col items-center"
            >
              <MessageCircle className="w-8 h-8 text-white" />
              <span className="text-white text-sm">
                {currentReel.comments.length}
              </span>
            </button>
            <button 
              onClick={handleShareClick}
              className="flex flex-col items-center"
            >
              <Share2 className="w-8 h-8 text-white" />
              <span className="text-white text-sm">Share</span>
            </button>
          </div>

          {/* Scroll Indicators */}
          {currentReelIndex > 0 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
              Swipe up ↑
            </div>
          )}
          {currentReelIndex < reels.length - 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
              Swipe down ↓
            </div>
          )}
        </div>

        {/* Comments Section */}
        {showComments && (
          <CommentsSection
            comments={currentReel.comments}
            onClose={() => setShowComments(false)}
          />
        )}
      </div>
    </div>
  );
};