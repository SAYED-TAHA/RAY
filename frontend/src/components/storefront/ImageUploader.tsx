'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { uploadBannerImage, uploadGalleryImages } from '@/services/storefrontService';

interface ImageUploaderProps {
  merchantId: string;
  type: 'banner' | 'gallery';
  onSuccess: (imageUrl: string | string[]) => void;
  onError: (error: string) => void;
  currentImage?: string;
  currentGallery?: string[];
}

export default function ImageUploader({
  merchantId,
  type,
  onSuccess,
  onError,
  currentImage,
  currentGallery,
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setLoading(true);
    try {
      if (type === 'banner') {
        const file = files[0];
        if (!file) throw new Error('لم يتم تحديد صورة');
        const result = await uploadBannerImage(merchantId, file);
        onSuccess(result.bannerImage);
      } else {
        const fileArray = Array.from(files);
        const result = await uploadGalleryImages(merchantId, fileArray);
        onSuccess(result.galleryImages);
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'خطأ في رفع الصورة');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (type === 'banner') {
    return (
      <div className="space-y-4">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            disabled={loading}
          />

          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">جاري الرفع...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                اسحب الصورة هنا أو انقر للاختيار
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, WebP (الحد الأقصى 5MB)</p>
            </div>
          )}
        </div>

        {currentImage && (
          <div className="relative w-full h-40 rounded-xl overflow-hidden">
            <img
              src={currentImage}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
          disabled={loading}
        />

        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">جاري الرفع...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              اسحب الصور هنا أو انقر للاختيار
            </p>
            <p className="text-xs text-gray-500">حتى 12 صورة (الحد الأقصى 5MB لكل صورة)</p>
          </div>
        )}
      </div>

      {currentGallery && currentGallery.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {currentGallery.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <img
                src={image}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  // سيتم إضافة حذف الصورة لاحقاً
                }}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
