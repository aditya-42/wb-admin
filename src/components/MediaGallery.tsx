"use client";

import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-zoom.css";

import lgVideo from "lightgallery/plugins/video";
import lgZoom from "lightgallery/plugins/zoom";

type MediaItem = {
  media_url: string;
  media_type: string;
};

const getMediaUrl = (file: string, type?: string): string => {
  if (file.startsWith("http")) return file;
  const folder = type?.startsWith("video") ? "postVideos" : "postImages";
  return `https://gdhndglrjbuojsgcziyg.supabase.co/storage/v1/object/public/uploads/${folder}/${file}`;
};

export default function MediaGallery({ media }: { media: MediaItem[] }) {
  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold">Attached Media</h2>
      <LightGallery plugins={[lgVideo, lgZoom]} mode="lg-fade" speed={500}>
        {media.map((item, idx) => {
          const url = getMediaUrl(item.media_url, item.media_type);

          return item.media_type.startsWith("image") ? (
            <a key={idx} href={url} data-sub-html={`Image ${idx + 1}`}>
              <img
                src={url}
                className="w-40 h-32 object-cover rounded border"
                alt={`Image ${idx + 1}`}
              />
            </a>
          ) : (
            <a
              key={idx}
              data-lg-size="1280-720"
              data-video={`{"source": [{"src":"${url}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`}
              data-poster="/video-thumb.jpg"
            >
              <img
                src="/video-thumb.jpg"
                className="w-40 h-32 object-cover rounded border"
                alt="Video preview"
              />
            </a>
          );
        })}
      </LightGallery>
    </div>
  );
}
