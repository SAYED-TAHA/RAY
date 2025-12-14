import React, { useState } from 'react';
import { Camera, Plus, X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

interface MerchantGalleryManagerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  isOwner?: boolean;
}

const MerchantGalleryManager: React.FC<MerchantGalleryManagerProps> = ({ 
  images, 
  onImagesChange, 
  isOwner = false 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    
    // Simulate upload - في الواقع ستكون هنا API call
    setTimeout(() => {
      const newImages = Array.from(files).map((file, index) => 
        URL.createObjectURL(file)
      );
      onImagesChange([...images, ...newImages]);
      setIsUploading(false);
    }, 1000);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button for Owner */}
      {isOwner && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-ray-blue transition">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="gallery-upload"
          />
          <label 
            htmlFor="gallery-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              {isUploading ? 'جاري الرفع...' : 'اضغط لإضافة صور'}
            </span>
            <span className="text-xs text-gray-400">
              JPG, PNG حتى 5MB للصورة الواحدة
            </span>
          </label>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            
            {/* Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex items-center justify-center gap-2">
              <button
                onClick={() => setPreviewImage(image)}
                className="bg-white/90 p-2 rounded-full hover:bg-white transition"
              >
                <Camera className="w-4 h-4 text-gray-800" />
              </button>
              {isOwner && (
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="bg-red-500/90 p-2 rounded-full hover:bg-red-500 transition"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantGalleryManager;
