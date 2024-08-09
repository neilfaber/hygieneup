"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import StoreNavbar from "./StoreNavbar";
import Footer from "../Footer";
import Image from "next/image";
import { SVGProps } from "react";

export default function UserStoreInfo() {
  return (
    <>
      <StoreNavbar />
      <div className="flex min-h-screen flex-col bg-muted/40">
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <section className="mb-8">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-background p-6 shadow-lg md:flex-row md:items-start md:gap-8">
              <div className="flex-1">
                <h1 className="text-2xl flex font-bold sm:text-xl">
                  Acme Food Store{" "}
                  <ShieldCheck className="ml-2 text-black" size={25} />
                </h1>
                <p className="text-muted-foreground sm:text-sm pt-4">
                  Acme Food Store has been a fixture in the community for
                  over 50 years. We pride ourselves on providing high-quality,
                  fresh produce, meats, and pantry items at reasonable prices.
                  Our knowledgeable staff is always on hand to help you find
                  what you need and answer any questions you may have.
                  <br /> We source our products from local and regional
                  suppliers whenever possible, supporting the local economy and
                  reducing our environmental impact. Our commitment to
                  sustainability extends to our store operations as well, with
                  energy-efficient lighting, recycling programs, and more.
                  <br /> In addition to our grocery offerings, we also have a
                  full-service deli, bakery, and floral department. Our deli
                  features a wide selection of freshly prepared sandwiches,
                  salads, and hot entrees, perfect for a quick lunch or dinner.
                  Our bakery offers a tempting array of breads, pastries, and
                  custom-made cakes for any occasion.
                </p>
              </div>
              <div className="lg:mr-10">
                <Carousel className="w-full max-w-md md:w-auto">
                  <CarouselContent>
                    <CarouselItem>
                      <Image
                        src="/rest1.jpg"
                        alt="Store Image 1"
                        width={400}
                        height={300}
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <Image
                        src="/rest2.jpg"
                        alt="Store Image 2"
                        width={400}
                        height={300}
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <Image
                        src="/rest7.jpg"
                        alt="Store Image 3"
                        width={400}
                        height={300}
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </section>
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="sm:text-base">
                  Reviews Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LinechartChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="sm:text-base">Overall Rating</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4">
                <div className="text-6xl font-bold sm:text-4xl">4.8</div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-6 w-6 fill-primary" />
                  <StarIcon className="h-6 w-6 fill-primary" />
                  <StarIcon className="h-6 w-6 fill-primary" />
                  <StarIcon className="h-6 w-6 fill-primary" />
                  <StarIcon className="h-6 w-6 fill-muted stroke-muted-foreground" />
                </div>
                <div className="text-muted-foreground sm:text-sm">
                  Based on 15 reviews
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="sm:text-base">Total Reviews</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4">
                <div className="text-6xl font-bold sm:text-4xl">15</div>
                <div className="text-muted-foreground sm:text-sm">Reviews</div>
              </CardContent>
              <CardContent className="flex items-center justify-center">
                <Link
                  href="reviews"
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  View All
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

function LinechartChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Reviews",
            color: "black",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 3 },
            { month: "February", desktop: 1 },
            { month: "March", desktop: 4 },
            { month: "April", desktop: 5 },
            { month: "May", desktop: 5 },
            { month: "June", desktop: 1 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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

function UserIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
