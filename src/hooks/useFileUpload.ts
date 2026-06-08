import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface UseFileUploadOptions {
  bucket: 'cvs' | 'portfolios' | 'assignments' | 'certifications' | 'avatars';
  userId: string;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<string | null>;
  isUploading: boolean;
  progress: number;
  error: Error | null;
}

export function useFileUpload({
  bucket,
  userId,
  onSuccess,
  onError,
}: UseFileUploadOptions): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      try {
        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
          throw new Error('File size must be less than 10MB');
        }

        // Validate file type
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'image/jpg',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedTypes.includes(file.type)) {
          throw new Error('Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX');
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${bucket}_${Date.now()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        // Upload file
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        // Save file metadata to database
        const { error: dbError } = await supabase.from('files').insert({
          user_id: userId,
          file_type: bucket === 'cvs' ? 'cv' : 
                    bucket === 'portfolios' ? 'portfolio' : 
                    bucket === 'assignments' ? 'assignment' :
                    bucket === 'certifications' ? 'certification' : 'other',
          file_name: file.name,
          file_url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
        });

        if (dbError) throw dbError;

        setProgress(100);
        onSuccess?.(publicUrl);
        return publicUrl;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Upload failed');
        setError(error);
        onError?.(error);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, userId, onSuccess, onError]
  );

  return {
    uploadFile,
    isUploading,
    progress,
    error,
  };
}

// Hook for fetching user's files
export function useUserFiles(userId: string | undefined) {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', userId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch files'));
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const deleteFile = useCallback(async (fileId: string, fileUrl: string) => {
    try {
      // Extract path from URL
      const urlParts = fileUrl.split('/');
      const filePath = urlParts.slice(-2).join('/');
      const bucket = urlParts[urlParts.length - 3];

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      // Update local state
      setFiles(files.filter(f => f.id !== fileId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete file'));
    }
  }, [files]);

  return {
    files,
    isLoading,
    error,
    fetchFiles,
    deleteFile,
  };
}
