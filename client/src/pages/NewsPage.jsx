import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
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
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {news && news.title}
      </h1>

      <img
        src={news && `/files/${news.image}`}
        alt={news && news.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{news && new Date(news.createdAt).toLocaleDateString()}</span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: news && news.content }}
      ></div>
    </main>
  );
}
