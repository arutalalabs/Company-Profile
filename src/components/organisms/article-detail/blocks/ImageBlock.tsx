'use client'

import { ImageBlockData } from '@/types/article'
import NextImage from 'next/image'

interface ImageBlockProps {
    data: ImageBlockData
}

/**
 * ImageBlock - Renders images with optional caption
 */
export function ImageBlock({ data }: ImageBlockProps) {
    const { file, caption, withBorder, withBackground } = data

    return (
        <figure className="my-8">
            <div
                className={`
                    relative flex w-full items-center justify-center overflow-hidden rounded-xl
                    ${withBorder ? 'border-2 border-gray-200' : ''}
                    ${withBackground ? 'bg-gray-100 p-4' : ''}
                `}
            >
                <div className="relative w-full aspect-video sm:max-h-[300px] lg:max-h-[440px] 2xl:max-h-[500px]">
                    <NextImage
                        src={file.url}
                        alt={caption || 'Article image'}
                        fill
                        sizes="(min-width: 1536px) 1100px, (min-width: 1024px) 900px, (min-width: 768px) 700px, 100vw"
                        className="mx-auto object-cover rounded-2xl shadow-2xl"
                        loading="lazy"
                    />
                </div>

            </div>
            {caption && (
                <figcaption className="text-sm text-[var(--color-neutral-500)] mt-3 text-center italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
