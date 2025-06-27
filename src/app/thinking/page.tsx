"use client"

import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress";
import ThinkingItem, { ThinkingItemProps } from "@/components/common/Thinking/ThinkingItem";
import useThinkingList from "@/hook/useThinkingList";
import { useEffect, useRef } from "react";

const itemWidth = 300;

export default function Thinking() {
  const { data: thinkingList = [], isLoading } = useThinkingList();

  const divContainer = useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollProgress />
      <div className="px-20 pt-30">
        <div className="max-w-5xl w-[90%] mx-auto relative" ref={divContainer}
          style={{
            columns: `${itemWidth}px auto`,
          }}
        >
          {thinkingList.map((thinking: ThinkingItemProps) => (
            <ThinkingItem key={thinking.id} thinking={thinking} />
          ))}
        </div>
      </div>
    </>
  )
}