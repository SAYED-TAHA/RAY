
import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon, File } from 'lucide-react';

interface FileUploaderProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onUpload?: (files: FileList | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label = "رفع ملفات", accept = "image/*", multiple = false, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prev => multiple ? [...prev, ...newFiles] : newFiles);
    if (onUpload) onUpload(fileList);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative
          ${isDragging ? 'border-ray-blue bg-blue-50' : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
        />
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-white text-ray-blue shadow-md' : 'bg-gray-100 text-gray-400'}`}>
            <UploadCloud className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-gray-700 mb-1">{label}</h4>
          <p className="text-sm text-gray-400">اضغط للرفع أو اسحب الملفات هنا</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {files.map((file, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-2 rounded-xl relative group shadow-sm">
              <button 
                onClick={() => removeFile(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md z-10"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="aspect-square bg-gray-50 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                {file.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <File className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 truncate">{file.name}</p>
              <p className="text-[10px] text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
