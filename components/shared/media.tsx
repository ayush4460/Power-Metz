import React from "react"
import Image from "next/image"
import { cn } from "@/lib/cn"

export const ResponsiveImage = ({ src, alt, width, height, fill, className, priority, objectFit = "cover", quality = 100, unoptimized = true }: { src: string, alt: string, width?: number, height?: number, fill?: boolean, className?: string, priority?: boolean, objectFit?: "cover" | "contain" | "fill", quality?: number, unoptimized?: boolean }) => {
  if (unoptimized) {
    return (
      <div className={cn("relative overflow-hidden flex items-center justify-center", fill ? "w-full h-full" : "", className)}>
        <img
          src={src}
          alt={alt}
          style={{
            width: fill ? "100%" : (width || 800),
            height: fill ? "100%" : (height || 600),
            objectFit: objectFit
          }}
          className={cn("transition-opacity duration-500")}
        />
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", fill ? "w-full h-full" : "", className)}>
      <Image
        src={src}
        alt={alt}
        width={!fill ? width || 800 : undefined}
        height={!fill ? height || 600 : undefined}
        fill={fill}
        priority={priority}
        quality={quality}
        className={cn("transition-opacity duration-500", objectFit === "cover" ? "object-cover" : objectFit === "contain" ? "object-contain" : "object-fill")}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

export const ImageOverlay = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6", className)}>
    {children}
  </div>
)

export const GalleryGrid = ({ images, className }: { images: { src: string, alt: string }[], className?: string }) => (
  <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
    {images.map((img, i) => (
      <div key={i} className="aspect-square relative rounded-lg overflow-hidden group">
        <ResponsiveImage src={img.src} alt={img.alt} fill />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
    ))}
  </div>
)

export const Video = ({ src, poster, autoPlay = true, loop = true, muted = true, className }: { src: string, poster?: string, autoPlay?: boolean, loop?: boolean, muted?: boolean, className?: string }) => (
  <video
    src={src}
    poster={poster}
    autoPlay={autoPlay}
    loop={loop}
    muted={muted}
    playsInline
    className={cn("w-full h-full object-cover rounded-xl", className)}
  />
)
