import React from 'react';
import ReactPlayer from 'react-player';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={video.videoUrl}
          controls
          width="100%"
          height="100%"
          className="rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{video.title}</h2>
        <p className="text-gray-600">{video.description}</p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;