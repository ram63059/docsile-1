import * as React from "react";
import { PostProps } from "./types";

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
  onLike,
  onComment,
  onShare,
  onRepost,
  onMoreOptions
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <article className="flex flex-col p-4 w-full bg-white rounded-lg shadow-[0px_0px_4px_rgba(0,0,0,0.1)]">
      <div className="flex gap-10 justify-between items-start w-full">
        <div className="flex gap-3 items-center">
          <img
            loading="lazy"
            src={avatar}
            className="object-cover w-[41px] h-[41px] rounded-full"
            alt={`${name}'s avatar`}
          />
          <div className="flex flex-col">
            <div className="text-sm font-medium text-neutral-700">{name}</div>
            <div className="text-xs font-light text-neutral-500 line-clamp-1">
              {bio}
            </div>
            <div className="text-xs text-neutral-500">{timeAgo}</div>
          </div>
        </div>
        <button 
          onClick={onMoreOptions}
          className="p-2 hover:bg-slate-50 rounded-full"
          aria-label="More options"
        >
          <svg width="14" height="4" viewBox="0 0 14 4" fill="none">
            <circle cx="2" cy="2" r="2" fill="#4B5563"/>
            <circle cx="7" cy="2" r="2" fill="#4B5563"/>
            <circle cx="12" cy="2" r="2" fill="#4B5563"/>
          </svg>
        </button>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium text-neutral-700">{title}</h2>
        <p className={`mt-1 text-xs text-neutral-700 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {content}
        </p>
        {content.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-neutral-500 mt-1"
          >
            {isExpanded ? 'Show less' : '...more'}
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-1">
        <img
          src={images[0]}
          className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg"
          alt="Post image 1"
        />
        <div className="col-span-2 grid gap-1">
          {images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-full h-[72px] object-cover rounded-lg"
              alt={`Post image ${index + 2}`}
            />
          ))}
        </div>
      </div>

      <div className="h-px mt-5 bg-neutral-200" />

      <div className="flex justify-between mt-5">
        <button 
          onClick={onLike}
          className="flex items-center gap-1.5 group"
          aria-label={`Like post. Current likes: ${likes}`}
        >
          <div className="w-4 h-4 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M8 15L6.84 13.921C2.72 10.1 0 7.6 0 4.5C0 1.6 2.16 0 4.95 0C6.48 0 7.93 0.7 8 2C8.07 0.7 9.52 0 11.05 0C13.84 0 16 1.6 16 4.5C16 7.6 13.28 10.1 9.16 13.921L8 15Z" fill="#9CA3AF"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light text-neutral-500">Likes</span>
            <span className="text-xs text-neutral-700">{likes}</span>
          </div>
        </button>

        <button 
          onClick={onComment}
          className="flex items-center gap-1.5 group"
          aria-label={`Comment on post. Current comments: ${comments}`}
        >
          <div className="w-4 h-4 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M14 7.5C14 3.91 11.09 1 7.5 1C3.91 1 1 3.91 1 7.5C1 11.09 3.91 14 7.5 14C8.46 14 9.37 13.82 10.2 13.5L14 15L12.5 11.2C13.82 10.37 14 9.46 14 7.5Z" fill="#9CA3AF"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light text-neutral-500">Comments</span>
            <span className="text-xs text-neutral-700">{comments}</span>
          </div>
        </button>

        <button 
          onClick={onShare}
          className="flex items-center gap-1.5 group"
          aria-label={`Share post. Current shares: ${shares}`}
        >
          <div className="w-4 h-4 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M12 10C11.4 10 10.9 10.2 10.4 10.4L6.4 8.4C6.4 8.3 6.5 8.1 6.5 8C6.5 7.9 6.4 7.7 6.4 7.6L10.4 5.6C10.9 5.8 11.4 6 12 6C13.7 6 15 4.7 15 3C15 1.3 13.7 0 12 0C10.3 0 9 1.3 9 3C9 3.1 9.1 3.3 9.1 3.4L5.1 5.4C4.6 5.2 4.1 5 3.5 5C1.8 5 0.5 6.3 0.5 8C0.5 9.7 1.8 11 3.5 11C4.1 11 4.6 10.8 5.1 10.6L9.1 12.6C9.1 12.7 9 12.9 9 13C9 14.7 10.3 16 12 16C13.7 16 15 14.7 15 13C15 11.3 13.7 10 12 10Z" fill="#9CA3AF"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light text-neutral-500">Shares</span>
            <span className="text-xs text-neutral-700">{shares}</span>
          </div>
        </button>

        <button 
          onClick={onRepost}
          className="flex items-center gap-1.5 group"
          aria-label={`Repost. Current reposts: ${reposts}`}
        >
          <div className="w-4 h-4 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M14 7V11H2V7H0V11C0 12.1 0.9 13 2 13H14C15.1 13 16 12.1 16 11V7H14ZM8 9L13 4L8 -1V3H3V5H8V9Z" fill="#9CA3AF"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light text-neutral-500">Reposts</span>
            <span className="text-xs text-neutral-700">{reposts}</span>
          </div>
        </button>
      </div>
    </article>
  );
};