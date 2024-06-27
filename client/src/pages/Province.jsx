import React from "react";
import TeamCard from "../components/TeamCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function About() {
  const [about, setAbout] = useState(null);
  const [team, setTeam] = useState(null);
  const { province } = useParams();

  useEffect(() => {
    const fetchAbout = async () => {
      await fetch(`/api/abouts/${province}`)
        .then((res) => res.json())
        .then((data) => {
          setAbout(data);
        });
    };
    fetchAbout();
  }, [province]);

  useEffect(() => {
    const fetchTeam = async () => {
      await fetch(`/api/teams/${province}`)
        .then((res) => res.json())
        .then((data) => {
          setTeam(data);
        });
    };
    fetchTeam();
  }, [province]);

  const teamSort = (team) => {
    var rest = [];
    var chairman;
    var seniorViceChairman;
    var viceChairman;
    var GeneralSecretary;
    var Secretary;
    var AssistantSecretary;
    var Treasurer;
    var AssistantTreasurer;
    var TechnicalCoordinator;
    team.forEach((member) => {
      if (member.position === "Chairman") {
        chairman = member;
      } else if (member.position === "Senior Vice Chairman") {
        seniorViceChairman = member;
      } else if (member.position === "Vice Chairman") {
        viceChairman = member;
      } else if (member.position === "General Secretary") {
        GeneralSecretary = member;
      } else if (member.position === "Secretary") {
        Secretary = member;
      } else if (member.position === "Assistant Secretary") {
        AssistantSecretary = member;
      } else if (member.position === "Treasurer") {
        Treasurer = member;
      } else if (member.position === "Assistant Treasurer") {
        AssistantTreasurer = member;
      } else if (member.position === "Technical Co-ordinator") {
        TechnicalCoordinator = member;
      } else {
        rest.push(member);
      }
    });

    rest = rest.sort((a, b) => a.name - b.name);

    const list = [
      chairman,
      seniorViceChairman,
      viceChairman,
      GeneralSecretary,
      Secretary,
      AssistantSecretary,
      Treasurer,
      AssistantTreasurer,
      TechnicalCoordinator,
      ...rest,
    ];

    const sorted = list.filter((item) => item !== undefined && item !== null);
    return sorted;
  };

  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-10">
        <div className="text-justify text-themeBrown p-4">
          <section className="text-2xl merriweather-black pb-4 ">
            About STFT {about && about.province_name}
          </section>
          <section className="text-lg merriweather-light pb-4">
            {about && about.content}
          </section>
        </div>

        <div className="h-full w-full flex justify-center items-center">
          <img
            src={(about && `/files/${about.image}`) || "hero-bg.png"}
            alt="About Us Image"
            className="object-cover"
          />
        </div>
      </div>

      <div className="text-center text-2xl merriweather-black">Our Team</div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto mb-10 p-10">
        {team &&
          teamSort(team).map(
            (member) =>
              member && (
                <TeamCard
                  key={member._id}
                  photo={
                    (member.image && `/files/${member.image}`) ||
                    "defaultprof.png"
                  }
                  name={member.name}
                  position={member.position}
                />
              )
          )}
      </div>
    </>
  );
}
