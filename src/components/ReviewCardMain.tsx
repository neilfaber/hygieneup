'use client'
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

type IconProps = React.SVGProps<SVGSVGElement>;

function StarIcon(props: IconProps) {
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
}

function ThumbsUpIcon(props: IconProps) {
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
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
    );
}

type ReviewProps = {
  avatarSrc: string;
  avatarFallback: string;
  numFilledStars: number;
  rating: number;
  reviewText: string;
  numHelpful: number;
};

const Review: React.FC<ReviewProps> = ({
  avatarSrc,
  avatarFallback,
  numFilledStars,
  rating,
  reviewText,
  numHelpful,
}) => {
  const [helpfulCount, setHelpfulCount] = useState(numHelpful);
  const [hasClicked, setHasClicked] = useState(false);

  const handleThumbsUpClick = () => {
    if (hasClicked) {
      setHelpfulCount(helpfulCount - 1);
    } else {
      setHelpfulCount(helpfulCount + 1);
    }
    setHasClicked(!hasClicked);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={avatarSrc} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${
                  i < numFilledStars
                    ? "fill-primary"
                    : "fill-muted stroke-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} out of 5
          </span>
        </div>
      </div>
      <div className="mt-4 text-muted-foreground">
        <p>{reviewText}</p>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleThumbsUpClick}>
            <ThumbsUpIcon
              className={`w-5 h-5 ${
                hasClicked ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </button>
          <span className="text-sm text-muted-foreground">
            {helpfulCount} people found this review helpful
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
