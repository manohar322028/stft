import React from "react";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";
import Slider from "react-slick";
import NoticeHome from "../components/NoticeHome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const news = [
  {
    id: 1,
    imageUrl: "https://source.unsplash.com/1600x900/?nature,water",
    title: "News Title 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc.",
  },
  {
    id: 2,
    imageUrl: "https://source.unsplash.com/1600x900/?nature,water",
    title: "News Title 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc.",
  },
  {
    id: 3,
    imageUrl: "https://source.unsplash.com/1600x900/?nature,water",
    title: "News Title 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc.",
  },
  {
    id: 4,
    imageUrl: "https://source.unsplash.com/1600x900/?nature,water",
    title: "News Title 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc.",
  },
  {
    id: 5,
    imageUrl: "https://source.unsplash.com/1600x900/?nature,water",
    title: "News Title 5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc. Nullam nec nunc nec nulla auctor, tincidunt nunc nec, ultricies nunc.",
  },
];
export default function Home() {
  return (
    <div className="w-full">
      {/* hero */}
      <Hero />

      {/* news */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 ml-4">Latest News</h2>
        <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={1}>
          {news.map((newsItem) => (
            <NewsCard key={newsItem.id} {...newsItem} />
          ))}
        </Slider>
        <p className="text-right mr-4 text-lg mt-10 underline">
          Click Here for More News
        </p>
      </div>

      {/* notices */}
      <div className="container mx-auto px-4 pb-4">
        <h2 className="text-3xl font-bold mb-6 ml-4">Latest Notices</h2>
        <NoticeHome />
        <p className="text-right mr-4 text-lg mt-10 underline">
          Click Here for More Notices
        </p>
      </div>
    </div>
  );
}
