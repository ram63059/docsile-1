import React, { useState } from 'react';
import { X,  ChevronLeft, ChevronRight } from 'lucide-react';
import like1 from "../../assets/icon/like1.svg"
import liked from "../../assets/icon/liked.svg"
import share from "../../assets/icon/share.svg"
import comment   from "../../assets/icon/comment1.svg"
import repost   from "../../assets/icon/repost.svg"

interface Author {
  name: string;
  avatar: string;
  bio: string;
  timeAgo?: string;
}

interface Comment {
  id: string;
  author: Author;
  content: string;
  timeAgo: string;
  likes: number;
  replies?: Array<{
    id: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
      timeAgo: string;
    };
    content: string;
    timeAgo: string;
    likes: number;
  }>;
}

interface PostExpandedViewProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    images: string[];
    author: Author;
    content: {
      title: string;
      description: string;
    };
    stats: {
      likes: number;
      comments: number;
      shares: number;
      reposts: number;
    };
    comments: Comment[];
    hashtags?: string[];
  };
}

const PostExpandedView: React.FC<PostExpandedViewProps> = ({ isOpen, onClose, post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [likedPost, setLikedPost] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

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

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('New comment:', commentText);
      setCommentText('');
    }
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyText.trim()) {
      console.log('New reply to comment', commentId, ':', replyText);
      setReplyText('');
      setShowReplyInput(null);
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };



  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-fontsm">
      <div className="bg-white w-[1000px] h-[600px] rounded-xl flex overflow-hidden">
        {/* Left Side - Image Carousel */}
        <div className="w-[55%] bg-black relative">
          <div className="relative h-full">
            <img
              src={post.images[currentImageIndex]}
              alt=""
              className="w-full h-full object-contain"
            />
            
            {currentImageIndex > 0 && (
              <button
                onClick={() => setCurrentImageIndex(prev => prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            
            {currentImageIndex < post.images.length - 1 && (
              <button
                onClick={() => setCurrentImageIndex(prev => prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full hover:bg-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {post.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-blue-500 w-3' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm text-gray-900">{post.author.name}</h3>
                <p className="text-xs  text-gray-500">{post.author.bio}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {/* Title and Description */}
              <h2 className="text-sm">{post.content.title}</h2>
              <p className="text-gray-600 text-sm">{post.content.description}</p>

              {/* Hashtags */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.hashtags.map((tag, idx) => (
                    <span key={idx} className="text-blue-600 text-sm hover:underline cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Interaction Stats */}
              <div className="flex items-start  justify-between  py-3">
                <div className="flex gap-12 ">
                  <button 
                    onClick={() => setLikedPost(!likedPost)}
                    className="flex items-center gap-2 text-gray-600"
                  >
                  
                    <img src={likedPost ? liked : like1} alt="" className='w-5' />
                    <div>

                    <p className='text-fontlit'>likes</p>
                    <span className='text-sm text-gray-800'>{likedPost ? post.stats.likes + 1 : post.stats.likes}</span>
                    </div>
                  </button>
                  <div className="flex items-center gap-2 text-gray-600">
                    <img src={comment} alt=""  className='w-5'/>

                    <div>
                      <p className='text-fontlit'>Comments</p>
                    <span className='text-sm text-gray-800'>{post.stats.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <img src={share} alt="" className='w-5' />
                    <div>
                      <p className='text-fontlit'>Shares</p>
                    <span className='text-sm text-gray-800'>{post.stats.shares}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <img src={repost} alt="" className='w-5' />
                    <div>
                      <p className='text-fontlit'>Reposts</p>
                    <span className='text-sm text-gray-800  ' >{post.stats.reposts}</span>
                    </div>
                  </div>
                </div>
               
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex gap-3">
                      <img
                        src={comment.author.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-buttonclr rounded-2xl rounded-tl-none px-3 py-2 relative">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <div>
                              <span className="text-xs  ">{comment.author.name}</span>
                                <span className="text-fontlit right-0 absolute pt-1 pr-3 text-gray-500">{comment.timeAgo}</span>

                              </div>
                              <p className="text-fontlit text-gray-500 line-clamp-1">{comment.author.bio}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{formatComment(comment.content)}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 ml-4">
                          <button 
                            onClick={() => handleLikeComment(comment.id)}
                            className="hover:text-gray-700"
                          >
                            {likedComments.has(comment.id) ? comment.likes + 1 : comment.likes} 
                            <img src={ likedComments?  liked : like1} alt="" />
                          </button>
                          <button 
                            onClick={() => setShowReplyInput(comment.id)}
                            className="hover:text-gray-700"
                          >
                            Reply
                          </button>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-2 ml-4">
                            <button
                              onClick={() => toggleReplies(comment.id)}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              {expandedReplies.has(comment.id)
                                ? 'Hide replies'
                                : `View all ${comment.replies.length} replies`}
                            </button>
                            
                            {expandedReplies.has(comment.id) && (
                              <div className="mt-3 space-y-3">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex gap-3">
                                    <img
                                      src={reply.author.avatar}
                                      alt=""
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <div className="flex-1">
                                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 relative">
                                        <div className="flex items-center justify-between mb-1">
                                          <div>
                                            <span className="font-medium">{reply.author.name}</span>
                                            <p className="text-xs text-gray-500">{reply.author.bio}</p>
                                          </div>
                                          <span className="text-sm text-gray-500">{reply.timeAgo}</span>
                                        </div>
                                        <p className="text-gray-600">{formatComment(reply.content)}</p>
                                      </div>
                                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 ml-4">
                                        <button className="hover:text-gray-700">
                                          {reply.likes} likes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Reply Input */}
                        {showReplyInput === comment.id && (
                          <div className="flex gap-3 items-center mt-3 ml-6">
                            <img
                              src={post.author.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                                autoFocus
                              />
                              <button 
                                onClick={() => handleSubmitReply(comment.id)}
                                className="px-4 py-2 bg-maincl text-white rounded-full text-sm font-medium"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div className="border-t p-4">
            <div className="flex gap-3 items-center">
              <img
                src={post.author.avatar}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add Comments..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                />
                <button 
                  onClick={handleSubmitComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExpandedView;