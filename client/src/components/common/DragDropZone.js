import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check } from 'lucide-react';

const DragDropZone = ({ 
  onDrop, 
  acceptedTypes = ['image/*'], 
  maxFiles = 1, 
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "" 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const errors = [];
    
    // Check file type
    if (!acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    })) {
      errors.push(`${file.name} is not an accepted file type`);
    }
    
    // Check file size
    if (file.size > maxSize) {
      errors.push(`${file.name} is too large (max ${maxSize / 1024 / 1024}MB)`);
    }
    
    return errors;
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const newErrors = [];
    const validFiles = [];

    newFiles.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        newErrors.push(...fileErrors);
      } else {
        validFiles.push(file);
      }
    });

    if (files.length + validFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} file(s) allowed`);
    } else {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onDrop(updatedFiles);
    }

    setErrors(newErrors);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onDrop(updatedFiles);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Drag & Drop Zone */}
      <motion.div
        ref={fileInputRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragOver 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-105' 
            : 'border-gray-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <motion.div
          animate={{ 
            scale: isDragOver ? 1.1 : 1,
            rotate: isDragOver ? 5 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        </motion.div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or click to browse
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {acceptedTypes.join(', ')} • Max {maxSize / 1024 / 1024}MB • {maxFiles} file(s)
          </p>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 space-y-2"
          >
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Selected Files ({files.length}/{maxFiles})
            </h4>
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-red-700 dark:text-red-300">
                Errors ({errors.length})
              </h4>
              <button
                onClick={clearErrors}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DragDropZone;
