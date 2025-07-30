'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploadZoneProps {
  onFilesUpload: (files: File[]) => Promise<string[]>
  acceptedTypes: string[]
  maxFiles: number
  maxSizePerFile: number // en MB
  type: 'logo' | 'brandGuide' | 'images'
  className?: string
}

interface UploadedFile {
  file: File
  url?: string
  status: 'uploading' | 'success' | 'error'
  progress: number
}

export default function FileUploadZone({
  onFilesUpload,
  acceptedTypes,
  maxFiles,
  maxSizePerFile,
  type,
  className = ''
}: FileUploadZoneProps) {
  
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Validar tipo
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return `Tipo de archivo no permitido. Solo: ${acceptedTypes.join(', ')}`
    }

    // Validar tamaño
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizePerFile) {
      return `Archivo muy grande. Máximo: ${maxSizePerFile}MB`
    }

    return null
  }

  const handleFiles = useCallback(async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)
    
    // Validar límite de archivos
    if (files.length + fileArray.length > maxFiles) {
      alert(`Máximo ${maxFiles} archivos permitidos`)
      return
    }

    // Validar cada archivo
    const validFiles: File[] = []
    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        alert(`${file.name}: ${error}`)
        continue
      }
      validFiles.push(file)
    }

    if (validFiles.length === 0) return

    // Agregar archivos al estado con status "uploading"
    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      status: 'uploading',
      progress: 0
    }))

    setFiles(prev => [...prev, ...newUploadedFiles])
    setIsUploading(true)

    try {
      // Simular progreso de upload
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setFiles(prev => prev.map(f => 
          newUploadedFiles.includes(f) 
            ? { ...f, progress: i }
            : f
        ))
      }

      // Realizar upload real
      const urls = await onFilesUpload(validFiles)
      
      // Actualizar estado con URLs exitosas
      setFiles(prev => prev.map(f => {
        const index = newUploadedFiles.findIndex(nf => nf.file === f.file)
        if (index !== -1) {
          return {
            ...f,
            url: urls[index],
            status: 'success',
            progress: 100
          }
        }
        return f
      }))

    } catch (error) {
      console.error('Upload error:', error)
      
      // Marcar archivos como error
      setFiles(prev => prev.map(f => 
        newUploadedFiles.includes(f) 
          ? { ...f, status: 'error', progress: 0 }
          : f
      ))
      
      alert('Error al subir archivos. Intenta de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }, [files, maxFiles, onFilesUpload])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles)
    }
  }, [handleFiles])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getIcon = () => {
    switch (type) {
      case 'logo':
        return '🎨'
      case 'brandGuide':
        return '📋'
      case 'images':
        return '🖼️'
      default:
        return '📁'
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'logo':
        return 'Subir Logo'
      case 'brandGuide':
        return 'Manual de Marca'
      case 'images':
        return 'Imágenes de Referencia'
      default:
        return 'Subir Archivos'
    }
  }

  const getDescription = () => {
    switch (type) {
      case 'logo':
        return 'PNG, SVG o PDF de tu logo actual'
      case 'brandGuide':
        return 'PDF con guía de marca, colores, tipografías'
      case 'images':
        return 'Fotos que representen tu marca o estilo'
      default:
        return 'Arrastra archivos aquí'
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Zona de upload */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
          isDragOver 
            ? 'border-blue-500 bg-blue-500/10' 
            : files.length > 0
              ? 'border-green-500/50 bg-green-500/5'
              : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedTypes.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="text-4xl">{getIcon()}</div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {getTitle()}
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              {getDescription()}
            </p>
            <p className="text-gray-500 text-xs">
              Máximo {maxFiles} archivo{maxFiles > 1 ? 's' : ''} • 
              {maxSizePerFile}MB cada uno • 
              {acceptedTypes.join(', ')}
            </p>
          </div>

          {files.length === 0 && (
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm font-medium">Arrastra archivos o haz clic</span>
            </div>
          )}
        </div>

        {isDragOver && (
          <motion.div
            className="absolute inset-0 bg-blue-500/20 rounded-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-blue-400 text-lg font-semibold">
              Suelta los archivos aquí
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Lista de archivos */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {files.map((fileItem, index) => (
              <motion.div
                key={`${fileItem.file.name}-${index}`}
                className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                
                {/* Icono de estado */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  fileItem.status === 'success' 
                    ? 'bg-green-500' 
                    : fileItem.status === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                }`}>
                  {fileItem.status === 'success' ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : fileItem.status === 'error' ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                </div>

                {/* Información del archivo */}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">
                    {fileItem.file.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{(fileItem.file.size / (1024 * 1024)).toFixed(1)} MB</span>
                    {fileItem.status === 'uploading' && (
                      <span>• {fileItem.progress}%</span>
                    )}
                    {fileItem.status === 'success' && (
                      <span className="text-green-400">• Subido</span>
                    )}
                    {fileItem.status === 'error' && (
                      <span className="text-red-400">• Error</span>
                    )}
                  </div>
                </div>

                {/* Barra de progreso para uploading */}
                {fileItem.status === 'uploading' && (
                  <div className="w-20">
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${fileItem.progress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </div>
                )}

                {/* Botón de eliminar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="w-6 h-6 text-gray-400 hover:text-red-400 transition-colors"
                  disabled={isUploading}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}