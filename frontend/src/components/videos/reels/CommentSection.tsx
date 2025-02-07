import React, { useState } from 'react';
import { X, Heart, Send } from 'lucide-react';

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
  
interface User {
    id: string;
    username: string;
    avatar: string;
  }
  
interface CommentsSectionProps {
  comments: Comment[];
  onClose: () => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments: initialComments,
  onClose,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        username: 'current_user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      },
      text: newComment,
      likes: 0,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        username: 'current_user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      },
      text: replyText,
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-90 z-20">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Comments</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex items-start space-x-2">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.username}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <p className="text-white font-semibold text-sm">
                      {comment.user.username}
                    </p>
                    <p className="text-white text-sm">{comment.text}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <button className="text-gray-400 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </button>
                    <button className="text-gray-400 text-xs">
                      {comment.likes} likes
                    </button>
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="text-gray-400 text-xs"
                    >
                      Reply
                    </button>
                  </div>
                </div>
                <button>
                  <Heart className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-10 space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start space-x-2">
                      <img
                        src={reply.user.avatar}
                        alt={reply.user.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-800 rounded-lg p-2">
                          <p className="text-white font-semibold text-sm">
                            {reply.user.username}
                          </p>
                          <p className="text-white text-sm">{reply.text}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <button className="text-gray-400 text-xs">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </button>
                          <button className="text-gray-400 text-xs">
                            {reply.likes} likes
                          </button>
                        </div>
                      </div>
                      <button>
                        <Heart className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {replyingTo === comment.id && (
                <div className="ml-10 flex items-center space-x-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Add a reply..."
                    className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm"
                  />
                  <button
                    onClick={() => handleAddReply(comment.id)}
                    className="text-blue-500"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2"
            />
            <button
              onClick={handleAddComment}
              className="text-blue-500"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};