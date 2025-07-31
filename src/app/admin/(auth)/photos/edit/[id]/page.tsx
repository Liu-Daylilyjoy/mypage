"use client"

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronUpIcon, Save, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Maple3D from "@/components/common/Loading/Maple3D";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/shadcn/button"
import { Calendar } from "@/components/ui/shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover"

interface Photo {
  id: string;
  title: string;
  description: string;
  path: string;
  shotTime: Date;
  shotPlace: string;
}

export default function PhotoEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shotTime, setShotTime] = useState<Date | undefined>(undefined);
  const [shotPlace, setShotPlace] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`/api/photos/${id}`);
        if (response.ok) {
          const photoData = await response.json();
          setPhoto(photoData);
          setTitle(photoData.title);
          setDescription(photoData.description);
          setShotTime(new Date(photoData.shotTime));
          setShotPlace(photoData.shotPlace || '');
          setTime(new Date(photoData.shotTime).toLocaleTimeString());
        } else {
          toast.error('Failed to load photo');
        }
      } catch (error) {
        toast.error(`Failed to load photo: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    }
  }, [previewImage]);

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`/api/photos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          shotTime,
          shotPlace,
          path: photo!.path
        }),
      });

      if (response.ok) {
        toast.success('Updated successfully!');
      } else {
        if (response.status === 401) {
          router.push('/login');
        } else {
          toast.error('Failed to update photo');
        }
      }

      // 更新图片
      let newImgPath = '';
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadResponse = await fetch(`/api/photos/content/${photo!.path}/${id}`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          if (uploadResponse.status === 401) {
            router.push('/login');
            return;
          } else {
            toast.error('Failed to upload image');
            return;
          }
        }
        newImgPath = (await uploadResponse.json()).newImgPath;
      }
      router.push(`/admin/photos?refreshId=${id}&newPath=${newImgPath}`);
    } catch (error) {
      toast.error(`Failed to update photo: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setSelectedFile(file);
  };

  if (loading) {
    return <Maple3D />;
  }

  if (!photo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Photo not found</h2>
          <Link
            href="/admin/photos"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Photos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Photo</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/photos"
            className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-accent transition-colors"
            onClick={() => {
              if (previewImage) {
                URL.revokeObjectURL(previewImage);
              }
            }}
          >
            <X size={16} />
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full md:w-[600px] flex-shrink-0">
          <div className="relative group p-8">
            {previewImage ? (
              <Image
                src={previewImage}
                alt={photo?.title || 'Preview'}
                className="w-full aspect-square object-cover border border-border"
                width={1000}
                height={1000}
              />
            ) : photo?.path ? (
              <Image
                src={`/api/photos/content/${photo.path}?t=${Date.now()}`}
                alt={photo.title}
                className="w-full aspect-square object-cover border border-border"
                width={1000}
                height={1000}
              />
            ) : (
              <div className="w-full aspect-square bg-muted border border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Upload size={48} className="mx-auto mb-2" />
                  <p>No image uploaded</p>
                </div>
              </div>
            )}

            {/* Upload overlay */}
            <div className="absolute cursor-pointer inset-8 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer flex items-center justify-center w-full h-full text-white/60"
              >
                <Upload size={48} />
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 space-y-8 border-l border-border pl-8">
          <h2 className="text-xl font-semibold">Information</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="text-sm font-medium mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-theme-color"
                placeholder="Enter photo title"
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full h-full px-3 py-2 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-theme-color"
                placeholder="Enter photo description"
              />
            </div>

            <div className="flex gap-3 items-center border-t pt-8">
              <label htmlFor="shotTime">
                Shot Day
              </label>
              <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="shotTime"
                      className="rounded-none shadow-none"
                    >
                      {shotTime ? shotTime.toLocaleDateString() : "Select date"}
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={shotTime}
                      captionLayout="dropdown"
                      onSelect={(shotTime) => {
                        const [hours, minutes, seconds] = time!.split(':').map(Number);
                        const date = new Date(shotTime!);
                        date.setHours(hours, minutes, seconds);
                        setShotTime(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <label htmlFor="time-picker" className="px-1">
                Time
              </label>
              <div>
                <input
                  type="time"
                  id="time-picker"
                  step="1"
                  className="border p-[7px] text-sm"
                  value={time ? time : "00:00:00"}
                  onChange={(e) => {
                    const time = e.target.value;
                    const [hours, minutes, seconds] = time.split(':').map(Number);
                    const date = new Date(shotTime!);
                    date.setHours(hours, minutes, seconds);
                    setTime(time);
                    setShotTime(date);
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="shotPlace" className="text-sm font-medium mb-2">
                Shot Place
              </label>
              <input
                id="shotPlace"
                type="text"
                value={shotPlace}
                onChange={(e) => setShotPlace(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-theme-color"
                placeholder="Enter shooting location"
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
} 