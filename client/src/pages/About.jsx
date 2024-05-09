import React from "react";
import TeamCard from "../components/TeamCard";

export default function About() {
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-10">
        <div className="text-justify text-themeBrown p-4">
          <section className="text-2xl merriweather-black pb-4 ">
            About STFT
          </section>
          <section className="text-lg merriweather-light pb-4">
            The Society of Technology Friendly Teachers Nepal (STFT Nepal) is a
            non-profit organization that aims to provide a platform for teachers
            to learn and share their knowledge about technology. Our goal is to
            help teachers integrate technology into their teaching practices to
            improve student learning outcomes. We offer a variety of resources
            and training programs to support teachers in their professional
            development journey. Join us today and become a part of our growing
            community of technology-friendly teachers!
          </section>
        </div>

        <div className="h-full w-full flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlLHdhdGVyfHx8fHx8MTcxNDExMjQ5Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600"
            alt="About Us Image"
            className="object-cover"
          />
        </div>
      </div>

      <div className="text-center text-2xl merriweather-black">Our Team</div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto mb-10 p-10">
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>
    </>
  );
}
