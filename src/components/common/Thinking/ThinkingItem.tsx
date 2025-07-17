import { useEffect, useState } from "react";
import { imageWidth } from "@/config/ImageConfig";
import { loadImageFromBlob } from "@/lib/utils";

export interface ThinkingItemProps {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  cover: string;
}

const ThinkingItem: React.FC<{ thinking: ThinkingItemProps }> = ({ thinking }) => {
  const [cover, setCover] = useState<string>('');

  useEffect(() => {
    const fetchCover = async () => {
      const response = await fetch(`/api/thinkings/${thinking.cover}`);
      const blob = await response.blob();

      const img = await loadImageFromBlob(blob);
      const aspectRatio = img.height / img.width;
      const targetWidth = imageWidth*2;
      const targetHeight = Math.round(targetWidth * aspectRatio);

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCover(url);
          }
        },
        'image/jpeg',
        0.7
      );
    }
    fetchCover();
  }, []);

  return (
    <div key={thinking.id} className="break-inside-avoid mb-10">
      {
        cover ? <img src={cover} alt='header cover' className="w-full h-auto" loading="lazy" />
        : <div className="w-full h-auto flex justify-center items-center gap-2"><img src="/image/loading/loading.svg" alt="loading" className="w-10 h-10" />Loading cover...</div>
      }
      <h3 className="text-2xl font-bold text-center mt-2">{thinking.title}</h3>
      <p className="text-sm text-gray-500 mt-2">{thinking.detail}</p>
    </div>
  )
}

export default ThinkingItem;