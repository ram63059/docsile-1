import * as React from "react";
import { PostProps } from "./types";

export const SocialPost: React.FC<PostProps> = ({
  avatar,
  name,
  bio,
  timeAgo,
  title,
  content,
  images,
  stats,
}) => {
  return (
    <div className="flex flex-col p-4 w-full bg-white rounded-lg border-neutral-200 shadow-[0px_0px_4px_rgba(0,0,0,0.1)]">
      <div className="flex gap-10 justify-between items-start w-full">
        <div className="flex gap-3 items-center w-[207px]">
          <img
            loading="lazy"
            src={avatar}
            alt={`${name}'s profile picture`}
            className="object-contain shrink-0 self-stretch my-auto aspect-[1.02] rounded-[66px] w-[41px]"
          />
          <div className="flex flex-col self-stretch my-auto w-[154px]">
            <div className="text-sm font-medium text-neutral-700">{name}</div>
            <div className="flex flex-col w-full text-xs max-w-[146px] text-neutral-500">
              <div className="overflow-hidden gap-2.5 w-full font-light">
                {bio}
              </div>
              <div>{timeAgo}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b0c6c09b547c5a77326d9ef26006e05fc149013218edce410b268eafb33ab92?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-[0.7]"
          />
          <div className="flex gap-2 justify-center items-center self-stretch px-1 my-auto w-5 h-5 rounded-3xl bg-slate-100 min-h-[20px] rotate-[-3.1415925661670165rad]">
            <div className="flex self-stretch my-auto min-h-[12px] rotate-[7.940934196053428e-24rad]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 w-full text-xs">
        <div className="leading-loose text-neutral-700">{title}</div>
        <div className="flex overflow-hidden relative gap-2.5 items-start mt-1 w-full font-light h-[38px]">
          <div className="z-0 leading-5 text-neutral-700 w-[259px]">
            {content}
          </div>
          <div className="absolute right-0 bottom-px z-0 h-[18px] text-neutral-500 w-[38px]">
            ...more
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-start mt-5">
        {images.map((image, index) => (
          <img
            key={index}
            loading="lazy"
            src={image}
            alt=""
            className="object-contain max-w-full rounded aspect-[1.79]"
          />
        ))}
      </div>
      <div className="flex mt-5 w-full min-h-0 bg-neutral-200" />
      <div className="flex gap-8 justify-between mt-5 w-full whitespace-nowrap">
        <div className="flex gap-1.5 items-start h-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/49ce398fca1f1832c1445775c49ceef087885ebf8036403bc48598f0b3f25910?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt=""
            className="object-contain shrink-0 w-4 aspect-square"
          />
          <div className="flex flex-col">
            <div className="text-xs font-light leading-3 text-neutral-500">
              Likes
            </div>
            <div className="mt-1.5 text-xs leading-loose text-neutral-700">
              {stats.likes}
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 items-start h-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c1414a42d95d2ffb19e1a4526744c2d60a9bfc23870d3fe5bccfb6bf9dd312?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt=""
            className="object-contain shrink-0 w-4 aspect-square"
          />
          <div className="flex flex-col">
            <div className="text-xs font-light leading-3 text-neutral-500">
              Comments
            </div>
            <div className="mt-1.5 text-xs leading-loose text-neutral-700">
              {stats.comments}
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 items-start my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd1ced903e13f07fbed37cce220e88be934d0c7a5a2d3984505c93c85366157c?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt=""
            className="object-contain shrink-0 w-4 aspect-square"
          />
          <div className="flex flex-col">
            <div className="text-xs font-light leading-3 text-neutral-500">
              Shares
            </div>
            <div className="mt-1.5 text-xs leading-loose text-neutral-700">
              {stats.shares}
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 items-start h-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/62eba23517205d3cf65f570cc527a3a178a2748fafa8b4efed0934b73412e072?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt=""
            className="object-contain shrink-0 w-4 aspect-square"
          />
          <div className="flex flex-col">
            <div className="text-xs font-light leading-3 text-neutral-500">
              Reposts
            </div>
            <div className="mt-1.5 text-xs leading-loose text-neutral-700">
              {stats.reposts}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
