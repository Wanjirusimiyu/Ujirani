import React from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const PostCard = ({ location, time, content, images, likes, comments, shares }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        <span className="font-bold">{location}</span>
        <span className="text-gray-500 text-sm">{time}</span>
      </div>
      <p className="text-gray-700 mt-2">{content}</p>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Item ${index + 1}`} className="rounded" />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-6 text-gray-500">
          <span className="flex items-center space-x-1">
            <FaHeart className="text-red-500" />
            <span>{likes}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaComment className="text-blue-500" />
            <span>{comments}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaShare className="text-green-500" />
            <span>{shares}</span>
          </span>
        </div>
        <button className="text-green-500 hover:underline">Add comment</button>
      </div>
    </div>
  );
};

export default PostCard;
