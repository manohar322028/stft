import React, { useState, useEffect, useRef } from "react";
import TeamCard from "../components/TeamCard";

const server_url = import.meta.env.VITE_SERVER_URL;

export default function About() {
  const [about, setAbout] = useState(null);
  const [team, setTeam] = useState(null);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [isTextOverflow, setIsTextOverflow] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      await fetch(server_url + "/api/abouts/0")
        .then((res) => res.json())
        .then((data) => {
          setAbout(data);
        });
    };
    fetchAbout();
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      await fetch(server_url + "/api/teams/0")
        .then((res) => res.json())
        .then((data) => {
          setTeam(data);
        });
    };
    fetchTeam();
  }, []);

  const teamSort = (team) => {
    const positionOrder = [
      "Chairman",
      "Senior Vice Chairman",
      "Vice Chairman",
      "General Secretary",
      "Secretary",
      "Assistant Secretary",
      "Treasurer",
      "Assistant Treasurer",
      "Technical Co-ordinator",
    ];

    const sorted = team.sort((a, b) => {
      const positionA = positionOrder.indexOf(a.position);
      const positionB = positionOrder.indexOf(b.position);

      if (positionA === -1 && positionB === -1) {
        return a.name.localeCompare(b.name);
      }

      if (positionA === -1) return 1;
      if (positionB === -1) return -1;

      return positionA - positionB;
    });

    return sorted;
  };

  useEffect(() => {
    if (about) {
      const textElement = document.getElementById("about-text");
      const imageElement = document.getElementById("about-image");
      const isOverflowing =
        textElement.scrollHeight > imageElement.clientHeight;
      setIsTextOverflow(isOverflowing);
    }
  }, [about]);

  const handleReadMore = () => {
    setIsTextExpanded(true);
  };

  const handleReadLess = () => {
    setIsTextExpanded(false);
    if (document.getElementById("scroll")) {
      document.getElementById("scroll").scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-10">
        <div id="scroll" className="text-justify text-themeBrown p-4">
          <section className="text-2xl mukta-bold pb-4 text-themeBrown">
            संस्थाको परिचय
          </section>
          <section id="about-text" className="text-lg mukta-light pb-4">
            {about &&
              (isTextExpanded ? about.content : about.content.slice(0, 600))}
            {about && !isTextExpanded && isTextOverflow && (
              <span>
                ...{" "}
                <button onClick={handleReadMore} className="text-blue-500">
                  Read More
                </button>
              </span>
            )}
            {about && isTextExpanded && (
              <span>
                {" "}
                <button onClick={handleReadLess} className="text-blue-500">
                  Read Less
                </button>
              </span>
            )}
          </section>
        </div>

        <div className="h-full w-full flex justify-center items-center">
          <img
            id="about-image"
            src={(about && `/files/${about.image}`) || "hero-bg.png"}
            alt="About Us Image"
            className="object-cover"
          />
        </div>
      </div>

      <div className="text-center text-2xl mukta-bold">हाम्रो समाज</div>

      <div className="container flex flex-wrap justify-center items-center mx-auto mb-10 p-10">
        {team &&
          teamSort(team).map((member) => (
            <div
              key={member._id}
              className="flex justify-center w-full sm:w-1/2 md:w-1/3 p-4"
            >
              <TeamCard
                photo={
                  (member.image && `/files/${member.image}`) ||
                  "defaultprof.png"
                }
                name={member.name}
                position={member.position}
              />
            </div>
          ))}
      </div>
    </>
  );
}
