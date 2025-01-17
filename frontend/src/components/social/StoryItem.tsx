import * as React from "react";
import { StoryProps } from "./types";

export function StoryItem({ imageUrl, name }: StoryProps) {
  return (
    <div className="flex flex-col self-stretch my-auto">
      <img
        loading="lazy"
        src={imageUrl}
        alt={`${name}'s story`}
        className="object-contain aspect-square w-[72px]"
      />
      <div className="mt-1 text-xs text-center text-neutral-700">{name}</div>
    </div>
  );
}
