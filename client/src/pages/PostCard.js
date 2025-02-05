import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaImage, FaShare } from "react-icons/fa";

const PostCard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (imageUrl) {
      setPreview(imageUrl);
    } else {
      setPreview("");
    }
  }, [selectedFile, imageUrl]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl("");
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (selectedFile) {
      formData.append("image", selectedFile);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setTitle("");
        setContent("");
        setImageUrl("");
        setSelectedFile(null);
        setPreview("");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-10 backdrop-blur-sm bg-opacity-95">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-poppins font-bold mb-2 text-green-700 tracking-tight flex items-center gap-3">
                Create Your Story
                <span className="text-green-500">✨</span>
              </h1>
              <h6 className="text-sm font-poppins text-black test-semibold mb-8">
                Share your thoughts with the community!
              </h6>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="transform transition-all duration-200 hover:scale-[1.01]">
                <label className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block font-poppins w-full rounded-xl border-gray-500 bg-gray-200 shadow-lg focus:border-green-400 focus:ring-green-400 p-4 text-lg transition-all duration-200"
                  placeholder="Give your post a title..."
                  required
                />
              </div>

              <div className="transform transition-all duration-200 hover:scale-[1.01]">
                <label className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 block w-full font-poppins rounded-xl border-gray-500 bg-gray-200 shadow-sm focus:border-green-400 focus:ring-green-400 p-4 text-lg transition-all duration-200"
                  placeholder="Share your thoughts with the community..."
                  required
                />
              </div>

              <div className="space-y-6">
                <label className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
                  Add Visual Content
                </label>

                <div className="border-3 border-dashed border-gray-500 rounded-xl p-8 bg-gray-200 hover:bg-gray-100 transition-all duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-3 text-green-600 hover:text-green-500 transition-colors"
                  >
                    <FaImage className="w-8 h-8" />
                    <span className="font-medium font-poppins">Upload an image</span>
                  </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm text-gray-500 font-medium">
                      OR
                    </span>
                  </div>
                </div>

                <input
                  type="url"
                  placeholder="Paste an image URL here"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  className="block w-full rounded-xl border-gray-500 bg-gray-200 shadow-sm focus:border-green-400 focus:ring-green-400 p-4 transition-all duration-200"
                />

                {preview && (
                  <div className="mt-6 rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:shadow-xl">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full object-cover max-h-96"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 font-poppins text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02] font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Share Your Post</span>
                <FaShare className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
