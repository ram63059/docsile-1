import * as React from "react";
import { NavItemProps } from "./types";

export const Navigation: React.FC<{ items: NavItemProps[] }> = ({ items }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-between items-center max-w-[480px] mx-auto px-5 py-3">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`flex flex-col items-center gap-1 ${
              item.isActive ? "text-slate-800" : "text-neutral-500"
            }`}
          >
            <img src={item.icon} alt="" className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
