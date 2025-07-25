import { useEffect, useState, useRef } from "react";
import { loadImageFromBlob } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";

interface CompressedImageProps {
  src: string;
  alt: string;
  className?: string;
  targetWidth?: number;
  quality?: number;
  fallbackIcon?: React.ReactNode;
}

const CompressedImage: React.FC<CompressedImageProps> = ({
  src,
  alt,
  className = "",
  targetWidth = 300,
  quality = 0.7,
  fallbackIcon = <ImageIcon size={48} />
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

    // Cleanup function to revoke object URL
    return () => {
      if (prevCompressedSrc.current) {
        URL.revokeObjectURL(prevCompressedSrc.current);
      }
      prevCompressedSrc.current = compressedSrc;
    };
  }, [src, targetWidth, quality]);

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