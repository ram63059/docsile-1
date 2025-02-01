const PostPopup: React.FC<PostPopupProps> = ({ isOpen, onClose, userAvatar }) => {
    // Previous state declarations remain the same...
    const [thumbnail, setThumbnail] = useState<File | null>(null);
  
    // Previous handlers remain the same...
  
    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        setThumbnail(file);
      }
    };
  
    // Add this new function to render the resource preview step
    const renderResourcePreview = () => {
      return (
        <div className="flex flex-col h-full">
          {/* PDF Preview Section */}
          <div className="bg-gray-50 rounded-lg mb-4 h-72">
            {pdfFile ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="p-4 flex flex-col items-center">
                  <FileText className="w-16 h-16 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 break-all text-center">{pdfFile.name}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400">No PDF uploaded</p>
              </div>
            )}
          </div>
  
          {/* Article Section */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="text-xs text-blue-500 mb-2">Article</div>
            <h2 className="text-lg font-medium mb-2">{postTitle}</h2>
            <p className="text-sm text-gray-600">{postContent}</p>
          </div>
  
          {/* Thumbnail Upload Section */}
          <div className="mt-auto">
            <button
              onClick={() => document.getElementById('thumbnailInput')?.click()}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <Image className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">Upload Thumbnail</span>
            </button>
            <input
              id="thumbnailInput"
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="hidden"
            />
            {thumbnail && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-600">{thumbnail.name}</span>
                <button
                  onClick={() => setThumbnail(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };
  
    // Update the main render content for step 2
    const renderMainContent = () => {
      if (currentStep === 2 && postType === 'Resource') {
        return renderResourcePreview();
      }
  
      return (
        <>
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
            <span className="text-xs text-gray-500 float-right">{wordCount} words remaining</span>
          </div>
  
          {/* Media Upload Section */}
          {renderMediaUpload()}
        </>
      );
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-[700px] h-[600px] shadow-lg mx-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {/* Previous header content remains the same... */}
          </div>
  
          {/* Main Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {renderMainContent()}
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
                    pdf: pdfFile,
                    thumbnail
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