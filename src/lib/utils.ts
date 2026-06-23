import { toast } from 'sonner'
import { EntityError } from '@/lib/https'
import { UseFormSetError } from 'react-hook-form'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    // Sử dụng toast.error của sonner để tự động có màu đỏ (destructive)
    toast.error(error?.payload?.message ?? 'Lỗi không xác định', {
      description: 'Lỗi hệ thống', // Hoặc có thể đảo lại: Title là lỗi, description là message chi tiết
      duration: duration ?? 5000
    })
  }
}

//
const isBrowser = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem('accessToken') : null)

export const getRefreshTokenToLocalStorage = () => (isBrowser ? localStorage.getItem('refreshToken') : null)
