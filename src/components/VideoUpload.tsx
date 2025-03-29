import { useState } from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext";

const VideoUpload = () => {
    const { token } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [video, setVideo] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
  
    interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
      target: HTMLInputElement & {
      files: FileList | null;
      };
    }

    const handleFileChange = (e: FileChangeEvent) => {
      if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!video) {
        setMessage("Please select a video file");
        return;
      }
  
      const formData = new FormData();
      formData.append("video", video);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
  
      setUploading(true);
      setMessage("");
  
      try {
        const response = await axios.post("https://video-project-kbd6.onrender.com/api/videos/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        setMessage("Video uploaded successfully!");
        console.log("Uploaded video:", response.data);
      } catch (error) {
        console.error("Error uploading video:", error);
        setMessage("Failed to upload video");
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
  
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
  
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
  
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
  
        <input type="file" accept="video/*" onChange={handleFileChange} className="mb-3" />
  
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
  
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    );
  };
  
  export default VideoUpload;