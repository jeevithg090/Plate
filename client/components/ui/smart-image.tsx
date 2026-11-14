import { useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Rendered instead of the image if it fails to load. */
  fallback?: ReactNode;
  /** Classes for the default fallback box (ignored when `fallback` is set). */
  fallbackClassName?: string;
}

/**
 * An `<img>` that lazy-loads by default and degrades to a calm placeholder
 * instead of a broken-image icon when the remote file can't be loaded
 * (offline, blocked CDN, removed asset).
 */
export default function SmartImage({
  fallback,
  fallbackClassName,
  className,
  loading = "lazy",
  decoding = "async",
  alt = "",
  onError,
  ...props
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallback !== undefined) return <>{fallback}</>;
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn(
          "grid place-items-center bg-gradient-to-br from-brand-100 via-muted to-primary/15 text-muted-foreground dark:from-brand-900/60 dark:via-muted dark:to-primary/20",
          className,
          fallbackClassName,
        )}
      >
        <ImageOff className="h-6 w-6 opacity-50" aria-hidden />
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
