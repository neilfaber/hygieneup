"use client";
import { ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Review from "./ReviewCardMain";
import { SVGProps } from "react";
import { Description } from "@radix-ui/react-dialog";

function ClockIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LocateIcon(props: SVGProps<SVGSVGElement>) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
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

function ThumbsUpIcon(props: SVGProps<SVGSVGElement>) {
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

export default function Component() {
  const [userData, setUserData] = useState([]);
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url('/store2.png')`,
    filter: "brightness(0.5)",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/review/get/product_id/1",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user data successfully:", data);

          // Update userData with the fetched data
          setUserData(data);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch user data:", errorData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    const rating = (e.target as any).rating.value;
    const review = (e.target as any).review.value;

    const userData = {
      rating: rating,
      description: review,
      product_id: 1,
    };

    console.log(userData);

    try {
      const response = await fetch("http://127.0.0.1:5000/review/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);
        return JSON.stringify(data);
      } else {
        const errorData = await response.json();
        console.error("Failed to create user:", errorData);
        // Handle error by setting error state or displaying error message
        // setError(errorData.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error by setting error state or displaying error message
      // setError("An error occurred while creating the user.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full">
        <section className="relative py-12 md:py-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={backgroundStyle}
          ></div>
          <div className="relative container mx-auto px-4 md:px-6 max-w-5xl grid md:grid-cols-2 gap-8 justify-center items-center">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  Acme Bistro
                  <ShieldCheck className="ml-2" size={27} />
                </h1>
                <p className="text-white">
                  Your one-stop shop for all you need. Fresh produce, quality
                  meats, and a wide selection of pantry items.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-muted text-white" />
                    <StarIcon className="w-5 h-5 fill-muted text-white" />
                    <StarIcon className="w-5 h-5 fill-muted text-white" />
                    <StarIcon className="w-5 h-5 fill-muted text-white" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                  <span className="text-sm text-white">4.2 out of 5</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <LocateIcon className="w-5 h-5 text-white" />
                  <span className="text-sm text-white">
                    123, Gandhi Road, Malad-West
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <ClockIcon className="w-5 h-5 text-white" />
                  <span className="text-sm text-white">
                    Mon-Sat: 8am-9pm, Sun: 9am-7pm
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/store-know-more" passHref>
                <Button size="lg" className="bg-black">
                  Know more
                </Button>
              </Link>
              <Link
                href="http://surl.li/itpacw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="ml-4">
                  File a complaint
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex justify-between flex-col md:flex-row items-center mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <Label htmlFor="sort">Sort by:</Label>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-8">
              {(userData[0]) ?? (
                <Card className="p-6 rounded-lg shadow-lg">
                  <Review
                    avatarSrc="/placeholder-user.jpg"
                    avatarFallback="CH"
                    numFilledStars={5}
                    rating={5}
                    reviewText="Just Amazing"
                    numHelpful={18}
                  />
                </Card>
               )} 
              <Card className="p-6 rounded-lg shadow-lg">
                <Review
                  avatarSrc="/placeholder-user.jpg"
                  avatarFallback="CN"
                  numFilledStars={4}
                  rating={4}
                  reviewText="Nice ambiance and a diverse menu. The Mediterranean platter was a standout. The only downside was the noise level, which made it hard to have a conversation."
                  numHelpful={18}
                />
              </Card>
              <Card className="p-6 rounded-lg shadow-lg">
                <Review
                  avatarSrc="/placeholder-user.jpg"
                  avatarFallback="CN"
                  numFilledStars={3}
                  rating={3}
                  reviewText="The food was decent but didn't blow me away. The Asian dishes were better than the Italian ones. Service was friendly but slow, and the place was quite crowded."
                  numHelpful={30}
                />
              </Card>
              <Card className="p-6 rounded-lg shadow-lg">
                <Review
                  avatarSrc="/placeholder-user.jpg"
                  avatarFallback="CN"
                  numFilledStars={5}
                  rating={5}
                  reviewText="Great selection of international dishes. The Thai curry was delicious, and the portion sizes were generous. The decor is stylish and modern."
                  numHelpful={25}
                />
              </Card>
            </div>
            <div className="flex justify-end mt-6">
              <Link href="/reviews" passHref>
                <Button variant="outline">View more</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Write a Review</h2>
            </div>
            <div className="grid gap-8">
              <Card className="p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="rating">Rating</Label>
                    <RadioGroup id="rating" name="rating" defaultValue="3">
                      <div className="flex items-center gap-2 overflow-x-scroll md:overflow-auto">
                        <Label
                          htmlFor="rating-1"
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                        >
                          <RadioGroupItem id="rating-1" value="1" />1
                        </Label>
                        <Label
                          htmlFor="rating-2"
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                        >
                          <RadioGroupItem id="rating-2" value="2" />2
                        </Label>
                        <Label
                          htmlFor="rating-3"
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                        >
                          <RadioGroupItem id="rating-3" value="3" />3
                        </Label>
                        <Label
                          htmlFor="rating-4"
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                        >
                          <RadioGroupItem id="rating-4" value="4" />4
                        </Label>
                        <Label
                          htmlFor="rating-5"
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                        >
                          <RadioGroupItem id="rating-5" value="5" />5
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="review">Review</Label>
                    <Textarea
                      id="review"
                      name="review"
                      placeholder="Write your review here..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Submit Review</Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
