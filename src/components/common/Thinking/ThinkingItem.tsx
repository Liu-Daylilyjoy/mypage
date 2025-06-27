import { useEffect, useState } from "react";

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
      const data = await response.json();
      setCover(data.data);
    }
    fetchCover();
  }, []);

  return (
    <div key={thinking.id} className="break-inside-avoid">
      <img src={cover || '/image/loading/loading.png'} alt='header cover' className="w-full h-auto" loading="lazy" />
      <h3 className="text-2xl font-bold text-center">{thinking.title}</h3>
      <p className="text-sm text-gray-500">{thinking.detail}</p>
    </div>
  )
}

export default ThinkingItem;