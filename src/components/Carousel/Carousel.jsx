import React from "react";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const CarouselCards = ({ body }) => {
  return (
    <Carousel
      breakpoints={{
        700: {
          plugins: [
            "arrows",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 1,
              },
            },
          ],
        },
        950: {
          plugins: [
            "arrows",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 2,
              },
            },
          ],
        },
        1300: {
          plugins: [
            "arrows",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 3,
              },
            },
          ],
        },
        1800: {
          plugins: [
            "arrows",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 4,
              },
            },
          ],
        },
        2600: {
          plugins: [
            "arrows",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 5,
              },
            },
          ],
        },
      }}
    >
      {body}
    </Carousel>
  );
};

export default CarouselCards;
