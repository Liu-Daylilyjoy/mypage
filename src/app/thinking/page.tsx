"use client"

import useThinkingList from "@/hook/useThinkingList";
import { useEffect, useRef } from "react";

interface ThinkingItemProps {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
}

const itemWidth = 150;

export default function Thinking() {
  const { data: thinkingList = [], isLoading } = useThinkingList();

  const divContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divContainer.current) return;

    function setPositions() {
      let containerWidth = divContainer.current!.clientWidth;
      let columns = Math.floor(containerWidth / itemWidth);

      let spaceNumber = columns + 1;
      let space = (containerWidth - columns * itemWidth) / spaceNumber;

      let arr = new Array(columns).fill(0);

      for (let i = 0; i < divContainer.current!.children.length; i++) {
        let item = divContainer.current!.children[i] as HTMLElement;
        let minTop = Math.min(...arr);
        let minIndex = arr.indexOf(minTop);

        item.style.top = `${minTop}px`;
        item.style.left = `${minIndex * (space + itemWidth) + space}px`;

        arr[minIndex] += item.clientHeight + space;
      }

      let containerHeight = Math.max(...arr);
      divContainer.current!.style.height = `${containerHeight}px`;
    }
    setPositions();

    let timeId: NodeJS.Timeout | null = null;
    function resize() {
      if (timeId) {
        clearTimeout(timeId);
      }
      timeId = setTimeout(() => {
        setPositions();
      }, 300);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [divContainer.current, thinkingList]);

  return (
    <div className="px-20 pt-30">
      <div className="max-w-5xl w-[90%] mx-auto relative" ref={divContainer}>
        {thinkingList.map((thinking: ThinkingItemProps) => (
          <div key={thinking.id} onClick={() => { }}
            className='absolute transition-all break-words duration-500 bg-blue-200'
              style={{
                width: `${itemWidth}px`
              }}>
            {thinking.title}
          </div>
        ))}
      </div>
    </div>
  )
}