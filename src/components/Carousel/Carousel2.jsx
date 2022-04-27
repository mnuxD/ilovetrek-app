import React, { Component } from "react";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const CarouselCards2 = ({ body }) => {
  return (
    <div>
      <Carousel
        breakpoints={{
          600: {
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
          900: {
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
          1150: {
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
          1500: {
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
    </div>
  );
};

export default CarouselCards2;
