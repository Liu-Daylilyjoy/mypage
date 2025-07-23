import { imageSize } from "@/config/ImageConfig";
import CompressedImage from "@/components/common/CompressedImage/CompressedImage";

export interface ThinkingItemProps {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  cover: string;
}

const ThinkingItem: React.FC<{ thinking: ThinkingItemProps }> = ({ thinking }) => {
  return (
    <div key={thinking.id} className="break-inside-avoid mb-10">
      <CompressedImage
        src={`/api/thinkings/content/${thinking.cover}`}
        alt="header cover"
        className="w-full h-auto"
        targetWidth={imageSize.width * 2}
        quality={0.7}
      />
      <h3 className="text-2xl font-bold text-center mt-2">{thinking.title}</h3>
      <p className="text-sm text-gray-500 mt-2">{thinking.detail}</p>
    </div>
  )
}

export default ThinkingItem;