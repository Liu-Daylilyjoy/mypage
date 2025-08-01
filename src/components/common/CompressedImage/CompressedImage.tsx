import { useEffect, useState, useRef } from "react";
import { loadImageFromBlob } from "@/lib/blobUtil";
import { Image as ImageIcon } from "lucide-react";

interface CompressedImageProps {
  src: string;
  alt: string;
  className?: string;
  targetWidth?: number;
  quality?: number;
  fallbackIcon?: React.ReactNode;
  enableCache?: boolean;
}

// 全局缓存，避免重复压缩相同的图片
const compressionCache = new Map<string, string>();

// 限制缓存大小的函数
const limitCacheSize = (maxSize: number = 100) => {
  if (compressionCache.size > maxSize) {
    const entries = Array.from(compressionCache.entries());
    // 删除前 20% 的缓存项
    const deleteCount = Math.floor(maxSize * 0.2);
    for (let i = 0; i < deleteCount; i++) {
      const [key, url] = entries[i];
      URL.revokeObjectURL(url);
      compressionCache.delete(key);
    }
  }
};

const CompressedImage: React.FC<CompressedImageProps> = ({
  src,
  alt,
  className = "",
  targetWidth = 300,
  quality = 0.7,
  fallbackIcon = <ImageIcon size={48} />,
  enableCache = true
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState<string>('');
  const prevCompressedSrc = useRef<string | null>(null);

  useEffect(() => {
    let compressedSrc: string | null = null;

    const compressImage = async () => {
      try {
        setLoading(true);
        setError(false);

        const cacheKey = `${src}_${targetWidth}_${quality}`;

        if (enableCache && compressionCache.has(cacheKey)) {
          const cachedUrl = compressionCache.get(cacheKey)!;
          setUrl(cachedUrl);
          setLoading(false);
          return;
        }

        const response = await fetch(src);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const blob = await response.blob();
        const img = await loadImageFromBlob(blob);

        const aspectRatio = img.height / img.width;
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
              compressedSrc = URL.createObjectURL(blob);
              if (enableCache) {
                compressionCache.set(cacheKey, compressedSrc);
                // 限制缓存大小
                limitCacheSize();
              }
              setUrl(compressedSrc);
            } else {
              setError(true);
            }
            setLoading(false);
          },
          'image/jpeg',
          quality
        );
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    if (src) {
      compressImage();
    }

    return () => {
      // 只有当这个 URL 不是来自缓存时才清理
      if (prevCompressedSrc.current && !enableCache) {
        URL.revokeObjectURL(prevCompressedSrc.current);
      }
      prevCompressedSrc.current = compressedSrc;
    };
  }, [src, targetWidth, quality, enableCache]);

  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-full py-4'>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center text-muted-foreground bg-muted ${className}`}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default CompressedImage; 