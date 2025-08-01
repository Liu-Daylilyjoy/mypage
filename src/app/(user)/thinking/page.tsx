"use client"

import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress";
import ThinkingItem, { ThinkingItemProps } from "@/components/common/Thinking/ThinkingItem";
import useThinkingList from "@/hook/useThinkingList";
import { imageSize } from "@/config/ImageConfig";
import Maple3D from "@/components/common/Loading/Maple3D";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Thinking() {
  const { data: thinkingList = [], isLoading } = useThinkingList();

  useGSAP(() => {
    if (thinkingList.length === 0) return;

    gsap.to(".scale", {
      opacity: 1,
      delay: 0.3
    })
  }, [thinkingList])

  if (isLoading) {
    return <Maple3D />
  }

  return (
    <>
      <ScrollProgress />
      <div className="px-20">
        <div className="max-w-5xl w-[90%] mx-auto relative thinking pt-30"
          style={{
            columns: `${imageSize.width}px auto`,
          }}
        >
          {thinkingList.map((thinking: ThinkingItemProps) => (
            <span key={thinking.id} className="scale opacity-0">
              <ThinkingItem thinking={thinking} />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}