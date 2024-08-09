import React from "react";
import { Button } from "./ui/button";

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

type StoreCardProps = {
  imageSrc: string;
  title: string;
  rating: number;
  category: string;
  description: string;
};

const StoreCard: React.FC<StoreCardProps> = ({
  imageSrc,
  title,
  rating,
  category,
  description,
}) => {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden">
      <img
        src={imageSrc}
        alt={title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
        style={{ aspectRatio: "400/250", objectFit: "cover" }}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <StarIcon className="w-5 h-5 fill-primary" />
          <span>{rating}</span>
          <span>|</span>
          <span>{category}</span>
        </div>
        <p className="mt-2 text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
