import Review from "@/components/ReviewCardMain";
import React from "react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="py-12 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid gap-8 mx-auto">
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="AB"
                numFilledStars={5}
                rating={5.0}
                reviewText="Acme Bistro Café is phenomenal! The variety of cuisines offered is impressive, and everything we tried was delicious. The service was top-notch and the ambiance perfect for a relaxing evening."
                numHelpful={25}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="CD"
                numFilledStars={4}
                rating={4.0}
                reviewText="Great spot for trying different cuisines under one roof. The sushi was fresh, and the pasta was cooked perfectly. A bit pricey, but worth it for the quality."
                numHelpful={18}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="EF"
                numFilledStars={3}
                rating={3.0}
                reviewText="The food was decent but didn't blow me away. The Asian dishes were better than the Italian ones. Service was friendly but slow, and the place was quite crowded."
                numHelpful={12}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="GH"
                numFilledStars={5}
                rating={5.0}
                reviewText="Absolutely loved Acme Bistro Café! The Indian dishes were authentic, and the desserts were heavenly. The staff was very attentive and made sure we had a great experience."
                numHelpful={30}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="IJ"
                numFilledStars={4}
                rating={4.0}
                reviewText="Nice ambiance and a diverse menu. The Mediterranean platter was a standout. The only downside was the noise level, which made it hard to have a conversation."
                numHelpful={15}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="KL"
                numFilledStars={2}
                rating={2.0}
                reviewText="Quite disappointed with my visit. The food took forever to arrive, and the steak was overcooked. Not the experience I was hoping for."
                numHelpful={9}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="MN"
                numFilledStars={5}
                rating={5.0}
                reviewText="A fantastic dining experience! The Mexican dishes were bursting with flavor, and the cocktails were well-crafted. Perfect place for a family dinner."
                numHelpful={22}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="OP"
                numFilledStars={4}
                rating={4.0}
                reviewText="Great selection of international dishes. The Thai curry was delicious, and the portion sizes were generous. The decor is stylish and modern."
                numHelpful={17}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="QR"
                numFilledStars={3}
                rating={3.0}
                reviewText="Mixed feelings about Acme Bistro Café. Some dishes were amazing, while others were just okay. The service was hit or miss, but the dessert menu was a highlight."
                numHelpful={14}
              />
            </Card>
            <Card className="p-6 rounded-lg shadow-lg">
              <Review
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="ST"
                numFilledStars={5}
                rating={5.0}
                reviewText="One of the best multi-cuisine restaurants I've been to! The tapas were delightful, and the sushi rolls were creative and fresh. Excellent service and a warm atmosphere."
                numHelpful={29}
              />
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
