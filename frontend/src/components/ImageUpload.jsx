import React, { useState } from 'react';
import { Upload, Link, X, ShieldCheck, Check, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export const ImageUpload = ({ value, onChange, label = "Product Photo" }) => {
  const [mode, setMode] = useState('upload'); // 'upload' or 'url'
  const [uploading, setUploading] = useState(false);

  // Method 2 Secure Backend Photo Upload Handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      // Sends file to Java Spring Boot Backend (POST /api/upload)
      const uploadedUrl = await api.uploadFile(file);
      onChange(uploadedUrl);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#C86D51]" />
          <label className="block text-xs font-semibold text-[#543831]">{label}</label>
        </div>

        <div className="flex gap-1 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mode === 'upload'
                ? 'bg-[#2A1B17] text-white'
                : 'bg-[#F7F4EF] text-[#8C7A70] hover:bg-[#EFEBE9]'
            }`}
          >
            Backend Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mode === 'url'
                ? 'bg-[#2A1B17] text-white'
                : 'bg-[#F7F4EF] text-[#8C7A70] hover:bg-[#EFEBE9]'
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {/* Backend Upload File Input */}
      {mode === 'upload' ? (
        <div className="relative">
          {value ? (
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E8DFD8] bg-[#F7F4EF]">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                <Check className="w-3 h-3 text-green-400" />
                <span>Uploaded via Java Backend</span>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#E8DFD8] hover:border-[#C86D51] rounded-2xl cursor-pointer bg-[#FDFBF7] hover:bg-[#F7F4EF] transition-all p-4 text-center">
              <Upload className="w-6 h-6 text-[#C86D51] mb-1" />
              <span className="text-xs font-bold text-[#2A1B17]">Select Photo to Upload</span>
              <span className="text-[10px] text-[#8C7A70] mt-0.5">Uploads securely through Java Spring Boot API</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-white/90 rounded-2xl flex flex-col items-center justify-center text-xs font-bold text-[#2A1B17] gap-2">
              <Loader2 className="w-6 h-6 text-[#C86D51] animate-spin" />
              <span>Uploading through Java Backend...</span>
            </div>
          )}
        </div>
      ) : (
        /* Paste URL Input */
        <div className="relative">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A70]" />
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8DFD8] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#C86D51]"
          />
        </div>
      )}
    </div>
  );
};
