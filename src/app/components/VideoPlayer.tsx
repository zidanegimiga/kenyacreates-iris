'use client'

import Image from 'next/image'
import { useState } from 'react'

interface YouTubeEmbedProps {
  url: string
  className?: string
}

function extractYouTubeID(url: string): string | null {
  const patterns = [
    /(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&]|$)/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m && m[1]) return m[1]
  }
  return null
}

export default function VideoPlayer({
  url,
  className = '',
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const videoId = extractYouTubeID(url)

  if (!videoId) {
    console.warn(`YouTubeEmbed: could not parse ID from "${url}"`)
    return null
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <div className={`relative w-full ${className} bg-black`}>
      <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
        {playing ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          />
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer rounded-lg overflow-hidden"
            onClick={() => setPlaying(true)}
          >
            <Image
              src={thumbnail}
              alt="Video thumbnail"
              className="object-cover"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="flex items-center space-x-2 bg-white/90 text-black p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}