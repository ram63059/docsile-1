import * as React from "react";
import { NavItemProps } from "./types";

export function NavigationItem({ icon, label, isActive }: NavItemProps) {
  return (
    <div className="flex flex-col items-center w-[50px]">
      <img
        loading="lazy"
        src={icon}
        alt={label}
        className="object-contain w-6 aspect-square"
      />
      <div
        className={`mt-2 text-xs text-center text-neutral-500 ${
          isActive ? "font-medium" : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
}
