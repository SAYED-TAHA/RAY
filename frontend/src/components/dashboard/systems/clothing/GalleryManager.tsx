/**
 * مدير معرض الصور للملابس
 * إدارة صور المنتجات والكولكشنات
 */

import React, { useState } from 'react';
import {
  Image, Upload, Trash2, Edit, Eye, Download, Share2,
  Grid, List, Search, Filter, Plus, Settings2, MoreVertical,
  Star, Heart, Share, Copy, Check, AlertCircle
} from 'lucide-react';

interface GalleryImage {
  id: string;
  productId: string;
  productName: string;
  url: string;
  thumbnail: string;
  uploadDate: string;
  size: number;
  views: number;
  likes: number;
  isMain: boolean;
  tags: string[];
}

const initialImages: GalleryImage[] = [
  {
    id: 'img-001',
    productId: 'prod-001',
    productName: 'تيشيرت بيزيك أسود',
    url: '/images/tshirt-black.jpg',
    thumbnail: '/images/tshirt-black-thumb.jpg',
    uploadDate: '2024-11-20',
    size: 2.5,
    views: 1250,
    likes: 145,
    isMain: true,
    tags: ['تيشيرت', 'أسود', 'بيزيك']
  },
  {
    id: 'img-002',
    productId: 'prod-001',
    productName: 'تيشيرت بيزيك أسود',
    url: '/images/tshirt-black-2.jpg',
    thumbnail: '/images/tshirt-black-2-thumb.jpg',
    uploadDate: '2024-11-20',
    size: 2.8,
    views: 890,
    likes: 98,
    isMain: false,
    tags: ['تيشيرت', 'أسود', 'بيزيك']
  },
  {
    id: 'img-003',
    productId: 'prod-002',
    productName: 'فستان صيفي مشجر',
    url: '/images/dress-floral.jpg',
    thumbnail: '/images/dress-floral-thumb.jpg',
    uploadDate: '2024-11-19',
    size: 3.2,
    views: 2100,
    likes: 320,
    isMain: true,
    tags: ['فستان', 'صيفي', 'مشجر']
  },
  {
    id: 'img-004',
    productId: 'prod-003',
    productName: 'بنطلون جينز Slim',
    url: '/images/jeans-slim.jpg',
    thumbnail: '/images/jeans-slim-thumb.jpg',
    uploadDate: '2024-11-18',
    size: 2.9,
    views: 1680,
    likes: 210,
    isMain: true,
    tags: ['بنطلون', 'جينز', 'Slim']
  }
];

const GalleryManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const filteredImages = images.filter(img => {
    const matchesSearch = img.productName.includes(searchTerm) || img.tags.some(tag => tag.includes(searchTerm));
    const matchesTag = !selectedTag || img.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(images.flatMap(img => img.tags)));

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const deleteImages = (ids: string[]) => {
    setImages(prev => prev.filter(img => !ids.includes(img.id)));
    setSelectedImages([]);
  };

  const setMainImage = (id: string) => {
    setImages(prev =>
      prev.map(img => ({
        ...img,
        isMain: img.id === id && img.productId === prev.find(i => i.id === id)?.productId
      }))
    );
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Image className="w-6 h-6 text-pink-600" />
            معرض الصور
          </h2>
          <p className="text-sm text-gray-500">إدارة صور المنتجات والكولكشنات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
          <Upload className="w-5 h-5" />
          رفع صور
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن صور..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* View Mode */}
        <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-600'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-600'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Settings */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <Settings2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Tags Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
            selectedTag === null
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          الكل
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
              selectedTag === tag
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => deleteImages([image.id])}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Main Badge */}
                {image.isMain && (
                  <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    الصورة الرئيسية
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm mb-2 truncate">
                  {image.productName}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <span>{image.views} مشاهدة</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {image.likes}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMainImage(image.id)}
                    className="flex-1 px-2 py-1 bg-pink-50 text-pink-600 rounded text-xs font-semibold hover:bg-pink-100"
                  >
                    تعيين رئيسية
                  </button>
                  <button className="flex-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold hover:bg-gray-200">
                    مشاركة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الصورة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المنتج</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المشاهدات</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإعجابات</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">تاريخ الرفع</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredImages.map(image => (
                <tr key={image.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image className="w-5 h-5 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{image.productName}</p>
                      <p className="text-xs text-gray-500">{image.size} MB</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{image.views}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{image.likes}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{image.uploadDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => deleteImages([image.id])}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">إجمالي الصور</p>
          <p className="text-2xl font-bold text-gray-900">{images.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">إجمالي المشاهدات</p>
          <p className="text-2xl font-bold text-gray-900">{images.reduce((sum, img) => sum + img.views, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">إجمالي الإعجابات</p>
          <p className="text-2xl font-bold text-gray-900">{images.reduce((sum, img) => sum + img.likes, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">حجم التخزين</p>
          <p className="text-2xl font-bold text-gray-900">{(images.reduce((sum, img) => sum + img.size, 0)).toFixed(1)} MB</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
