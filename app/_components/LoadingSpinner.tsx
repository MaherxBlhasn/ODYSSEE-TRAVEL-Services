'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
        {/* Spinning segment */}
        <div className="absolute inset-0 border-4 border-transparent border-l-orange-500 rounded-full animate-spin"></div>
        {/* Inner dot */}
        <div className="absolute inset-2 bg-orange-400 rounded-full animate-pulse"></div>
      </div>
      {text && (
        <p className={`mt-4 text-gray-600 font-medium ${textSizeClasses[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
}
