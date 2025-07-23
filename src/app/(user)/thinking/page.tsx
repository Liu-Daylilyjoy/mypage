"use client"

import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress";
import ThinkingItem, { ThinkingItemProps } from "@/components/common/Thinking/ThinkingItem";
import useThinkingList from "@/hook/useThinkingList";
import { imageSize } from "@/config/ImageConfig";

export default function Thinking() {
  const { data: thinkingList = [] } = useThinkingList();

  return (
    <>
      <ScrollProgress />
      <div className="px-20 pt-30">
        <div className="max-w-5xl w-[90%] mx-auto relative thinking"
          style={{
            columns: `${imageSize.width}px auto`,
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