import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState({});
  const { postSlug } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news/${postSlug}`);
        const data = await res.json();

        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="self-center">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {/* Image Container */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={news.image ? `/files/${news.image}` : "/placeholder.png"}
          alt={news.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl mt-4 p-3 text-center  merriweather-black text-themeBrown max-w-2xl mx-auto lg:text-3xl">
        {news.title}
      </h1>

      {/* Date */}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-xs">
        <span>Posted on {new Date(news.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <div
        className="p-3 mx-auto w-full post-content prose max-w-none mb-12 text-themeBlack"
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></div>
    </main>
  );
}
