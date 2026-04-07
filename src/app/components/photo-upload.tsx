import { useRef, useState } from 'react';
import { Camera, Upload, X, Image } from 'lucide-react';

interface PhotoUploadProps {
  photos: string[];
  onAdd: (photos: string[]) => void;
  label?: string;
  maxPhotos?: number;
}

export function PhotoUpload({ photos, onAdd, label = 'Photos', maxPhotos = 10 }: PhotoUploadProps) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);

  const readFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = maxPhotos - photos.length;
    const toRead = Array.from(files).slice(0, remaining);
    if (!toRead.length) return;

    const readers = toRead.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then(onAdd);
  };

  const canAdd = photos.length < maxPhotos;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-xs text-gray-500">
          {photos.length}/{maxPhotos} photos
        </span>
      </div>

      {/* Existing Photos */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {photos.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-700 cursor-pointer group"
              onClick={() => setPreviewing(src)}
            >
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Image className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Buttons */}
      {canAdd && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 border border-dashed border-gray-600 hover:border-red-600 rounded-lg py-3 text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            <Camera className="w-4 h-4" />
            Take Photo
          </button>
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 border border-dashed border-gray-600 hover:border-red-600 rounded-lg py-3 text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      )}

      {/* Hidden inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={(e) => readFiles(e.target.files)}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => readFiles(e.target.files)}
      />

      {/* Lightbox */}
      {previewing && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewing(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setPreviewing(null)}
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={previewing}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
