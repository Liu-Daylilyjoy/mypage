'use client'

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, Image } from "lucide-react";
import Link from "next/link";
import CompressedImage from "@/components/common/CompressedImage/CompressedImage";
import { adminImageConfig } from "@/config/ImageConfig";
import usePhotoList from "@/hook/usePhotoList";
import { mutate } from "swr";

interface Photo {
  id: string;
  title: string;
  description: string;
  path: string;
  createdAt: string;
}

export default function PhotosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { data: photos = [], isLoading: loading } = usePhotoList();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 重新获取数据以更新列表
        mutate('/api/photos');
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleViewPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  // 模态框展开时,阻止背景页面滚动
  useEffect(() => {
    if (selectedPhoto) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [selectedPhoto]);

  const filteredPhotos = photos.filter((photo: Photo) =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="rotate-3d"><img src="/image/loading/loading.svg" alt="loading" className="w-10 h-10" /></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Photo Management</h1>
          <p className="text-muted-foreground mt-2">Manage your photos</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/photos/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            Upload Photo
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search photo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.length === 0 ? (
          <div className="col-span-full p-8 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No matching photo found' : 'No photos'}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/photos/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                Upload your first photo
              </Link>
            )}
          </div>
        ) : (
          filteredPhotos.map((photo: Photo) => (
            <div key={photo.id} className="bg-card border border-border overflow-hidden shadow-secondary hover:shadow-lg transition-shadow group">
              {/* Photo */}
              <div className="aspect-square bg-muted relative overflow-hidden">
                {photo.path ? (
                  <CompressedImage
                    src={`/api/photos/content/${photo.path}`}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    targetWidth={adminImageConfig.photo.targetWidth}
                    quality={adminImageConfig.photo.quality}
                    fallbackIcon={<Image size={48} />}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <Image size={48} />
                  </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleViewPhoto(photo)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-md hover:bg-white/30 transition-colors"
                    title="View"
                  >
                    <Eye size={16} className="text-white" />
                  </button>
                  <Link
                    href={`/admin/photos/edit/${photo.id}`}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-md hover:bg-white/30 transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} className="text-white" />
                  </Link>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-md hover:bg-white/30 transition-colors text-destructive"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {photo.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(photo.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="text-sm text-muted-foreground">
        Total <span className="font-bold text-primary">{filteredPhotos.length}</span> photos
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div className="relative max-w-4xl max-h-[90vh] w-full bg-transparent shadow-2xl overflow-y-auto scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedPhoto.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{selectedPhoto.description}</p>
              </div>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center p-4">
              <img
                src={`/api/photos/content/${selectedPhoto.path}`}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Footer */}
            <div className="p-4 text-sm text-right text-theme-color">
              Created: {formatDate(selectedPhoto.createdAt)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 