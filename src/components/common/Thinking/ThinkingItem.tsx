import { imageSize } from "@/config/ImageConfig";
import CompressedImage from "@/components/common/CompressedImage/CompressedImage";
import { formatDate } from "@/lib/dateUtil";

export interface ThinkingItemProps {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  cover: string;
}

const ThinkingItem: React.FC<{ thinking: ThinkingItemProps }> = ({ thinking }) => {
  return (
    <div key={thinking.id} className="bg-background break-inside-avoid mb-10 border border-border shadow-secondary hover:shadow-lg hover:-translate-y-1.5 transition-all scale">
      <CompressedImage
        src={thinking.cover.startsWith('http') ? thinking.cover : `/api/thinkings/content/${thinking.cover}`}
        alt="header cover"
        className="w-full h-auto"
        targetWidth={imageSize.width * 2}
        quality={0.7}
      />
      <h3 className="px-6 pt-4 text-2xl font-bold border-t">{thinking.title}</h3>
      <p className="px-6 pb-4 text-sm text-gray-500 mt-2 whitespace-pre-wrap">{thinking.detail}</p>
      <div className="px-6 pb-4 mt-2 flex flex-col items-end justify-between text-xs text-muted-foreground mb-4">
        <span>Created at {formatDate(thinking.createdAt)}</span>
        <span>Updated at {formatDate(thinking.updatedAt)}</span>
      </div>
    </div>
  )
}

export default ThinkingItem;