import React, { useState } from 'react';
import { X, Image, Plus, ChevronDown } from 'lucide-react';
import publicIcon from "../../assets/icon/public.svg"
import privateIcon from "../../assets/icon/private.svg"
import { FaCaretRight } from "react-icons/fa";



interface PostPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatar: string;
}

type Visibility = 'Public' | 'Private(Followers Only)';
type PostType = 'Post' | 'Question' | 'Resource' | 'Video';

const PostPopup: React.FC<PostPopupProps> = ({ isOpen, onClose, userAvatar }) => {
  const [postContent, setPostContent] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('Public');
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>('Post');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedMedia(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[700px] h-[600px] shadow-lg mx-auto flex flex-col justify-between  ">

        <div>

        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
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
                      className="flex items-center justify-between w-full px-5 py-1  hover:bg-gray-100 text-left"
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
                    <div className=''>
                    <p className='text-md text-gray-800 ' >comment settings</p>
                    <p className='text-xs text-gray-500'> Public</p>
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
                className="flex items-center gap-1 px-3 py-1 bg-buttonclr  rounded-2xl"
              >
                <span className="font-medium">{postType}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isTypeOpen && (
                <div className="absolute top-full right-0 mt-1 w-36 bg-white border rounded-lg shadow-lg py-1">
                  {['Post', 'Question', 'Resource', 'Video'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setPostType(type as PostType);
                        setIsTypeOpen(false);
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

        {/* Content */}
        <div className="flex-1 p-4">
          {postType === 'Video' ? (
            <div className="h-full flex flex-col">
              {!selectedMedia ? (
                <div 
                  className="flex-1 border-2 bg-buttonclr border-dashed border-gray-300 rounded-lg py-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={() => document.getElementById('mediaInput')?.click()}
                >
                  <Image className="w-8 h-8   text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Add Media</p>
                  <p className="text-sm text-gray-500">or drag and drop</p>
                  <input
                    id="mediaInput"
                    type="file"
                    accept="video/*"
                    onChange={handleMediaSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex-1 relative">
                  <video
                    src={URL.createObjectURL(selectedMedia)}
                    className="w-full h-full object-contain"
                    controls
                  />
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <textarea
                placeholder="Write a caption..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="mt-4 w-full h-20 resize-none outline-none border rounded-lg p-2"
              />
            </div>
          ) : (
            <textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full min-h-[150px] resize-none outline-none text-gray-700 placeholder-gray-500"
            />
          )}
        </div>
        </div>
       <div>

       

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center ">
          {postType !== 'Video' && (
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
                <Image className="w-5 h-5" />
                <span>Add Media</span>
              </button>
              <Plus className="w-4 h-4" />
            </div>
          )}
          <div className='flex flex-row  items-end '
          >
          <button
            className={`px-3 py-1 rounded-lg  font-medium ${
              (postContent.trim() || selectedMedia)
                ? 'bg-maincl text-white hover:bg-fillc'
                : 'bg-buttonclr text-gray-400 cursor-not-allowed'
            }`}
            disabled={!postContent.trim() && !selectedMedia}
          >
            {postType}
          </button>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default PostPopup; 