'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image, Trash2, Plus } from 'lucide-react';

interface MediaUploaderProps {
  media: {
    heroImage?: string;
    logo?: string;
    gallery: string[];
  };
  onChange: (media: any) => void;
  onPreview?: (media: any) => void;
}

export default function MediaUploader({ media, onChange, onPreview }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    setUploadProgress(0);

    // محاكاة رفع الملف
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // تحويل الملف إلى URL
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      const newMedia = { ...media, heroImage: imageUrl };
      onChange(newMedia);
      onPreview?.(newMedia);
      setUploading(false);
      setUploadProgress(0);
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    setUploadProgress(0);

    const newGallery = [...(media.gallery || [])];

    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        newGallery.push(imageUrl);

        const progress = Math.round(((fileIndex + 1) / files.length) * 100);
        setUploadProgress(progress);

        if (fileIndex === files.length - 1) {
          const newMedia = { ...media, gallery: newGallery };
          onChange(newMedia);
          onPreview?.(newMedia);
          setUploading(false);
          setUploadProgress(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = media.gallery.filter((_, i) => i !== index);
    const newMedia = { ...media, gallery: newGallery };
    onChange(newMedia);
    onPreview?.(newMedia);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, isGallery: boolean = false) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (isGallery) {
      handleGalleryUpload(e.dataTransfer.files);
    } else {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          إدارة الوسائط
        </h2>
      </div>

      {/* صورة البطل الرئيسية */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          الصورة الرئيسية (Hero Image)
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          هذه الصورة ستظهر في أعلى صفحتك
        </p>

        {media.heroImage ? (
          <div className="relative group">
            <img
              src={media.heroImage}
              alt="Hero"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={() => {
                const newMedia = { ...media, heroImage: undefined };
                onChange(newMedia);
                onPreview?.(newMedia);
              }}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, false)}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              اسحب الصورة هنا أو اضغط للاختيار
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              الصيغ المدعومة: JPG, PNG, WebP (الحد الأقصى: 5MB)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              اختر صورة
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              جاري الرفع... {uploadProgress}%
            </p>
          </div>
        )}
      </div>

      {/* شعار النشاط */}
      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          شعار النشاط (Logo)
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          سيظهر في رأس الصفحة والقوائم
        </p>

        {media.logo ? (
          <div className="relative group w-32">
            <img
              src={media.logo}
              alt="Logo"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => {
                const newMedia = { ...media, logo: undefined };
                onChange(newMedia);
                onPreview?.(newMedia);
              }}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-blue-500 transition"
          >
            <Plus className="w-8 h-8 text-gray-400" />
          </button>
        )}
      </div>

      {/* معرض الصور */}
      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              معرض الصور
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              أضف صور متعددة لعرض نشاطك
            </p>
          </div>
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
            {media.gallery.length}/12
          </span>
        </div>

        {media.gallery.length < 12 && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, true)}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              اسحب الصور هنا أو اضغط للاختيار
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              يمكنك رفع عدة صور في نفس الوقت
            </p>
            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  handleGalleryUpload(files);
                };
                input.click();
              }}
              disabled={uploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              اختر صور
            </button>
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              جاري الرفع... {uploadProgress}%
            </p>
          </div>
        )}

        {/* عرض الصور */}
        {media.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.gallery.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* نصائح */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
          💡 نصائح لأفضل النتائج
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>✓ استخدم صور عالية الجودة (1920x1080 أو أكبر)</li>
          <li>✓ تأكد من أن الصور تعكس هوية نشاطك</li>
          <li>✓ استخدم صور متنوعة في المعرض</li>
          <li>✓ الحد الأقصى للمعرض: 12 صورة</li>
        </ul>
      </div>
    </div>
  );
}
