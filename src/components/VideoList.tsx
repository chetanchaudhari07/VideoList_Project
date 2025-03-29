import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Video } from '../types';
import { Search, Tag } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import Logout from './Logout';

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchTags, setSearchTags] = useState('');
  const [page, setPage] = useState(1);
  const { token } = useAuth();


  const fetchVideos = async () => {
    try {
      const params: any = { page };
      if (searchTitle) params.title = searchTitle;
      if (searchTags) params.tags = searchTags.split(",").map(tag => tag.trim());

      const response = await axios.get('https://video-project-kbd6.onrender.com/api/videos/user-videos', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      console.log('Fetched videos:', response.data);
      setVideos(response.data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [searchTitle, searchTags, token, page]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by tags (comma-separated)..."
                  value={searchTags}
                  onChange={(e) => setSearchTags(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <Logout />
            </div>

          </div>
        </div>

        {selectedVideo ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <button
              onClick={() => setSelectedVideo(null)}
              className="mb-4 text-indigo-600 hover:text-indigo-800"
            >
              ← Back to list
            </button>
            <VideoPlayer video={selectedVideo} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300" : "bg-indigo-500 text-white hover:bg-indigo-700"}`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>


  );
};

export default VideoList;