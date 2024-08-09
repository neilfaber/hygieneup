"use client";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type IconProps = React.SVGProps<SVGSVGElement>;

const StarIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

type ReviewCardProps = {
  children: React.ReactNode;
  numFilledStars?: number;
  avatarSrc?: string;
  avatarFallback?: string;
  username?: string;
  time?: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  children,
  numFilledStars = 5,
  avatarSrc = "/placeholder-user.jpg",
  avatarFallback = "AC",
  username = "Jane Smith",
  time = "1 week ago",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Avatar className="w-8 h-8 border">
          <AvatarImage src={avatarSrc} alt={username} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{username}</h4>
          <time className="text-sm">{time}</time>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2 text-gray-600">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < numFilledStars
                ? "fill-primary"
                : "text-gray-400 stroke-gray-500"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 text-gray-600 line-clamp-3">{children}</div>
    </div>
  );
};

export default ReviewCard;
