import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Trash2, Image as ImageIcon } from 'lucide-react'

export function ImageUpload({ onChange, value }) {
  const [preview, setPreview] = useState(value ? URL.createObjectURL(value) : null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onChange(file)
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  })

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
  }

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg w-full h-64 object-cover border"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-muted'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isDragActive ? (
                <>Drop the image here</>
              ) : (
                <>Drag & drop an image, or click to select</>
              )}
            </p>
            <Button variant="outline" size="sm" type="button">
              Select Image
            </Button>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Upload a clear photo of the item (max 5MB)
      </p>
    </div>
  )
}