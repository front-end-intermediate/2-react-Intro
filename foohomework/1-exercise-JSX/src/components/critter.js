import React from "react";

const message = {
  content: "Just ate at “Les Corbeaux En Colère”. Wonderful little venue!",
  published: "January 21st at 9:45pm",
  author: {
    avatarSrc: "009.png",
    avatarDescription: "Cartoon bear",
    name: "Ben Thorn",
    handle: "benjaminthorn",
  },
};

const profileUrl = `/users/${message.author.handle}`;
const imageAlt = `${message.author.avatarDescription} (user profile photo)`;

export const Critter = () => {
  return (
    <article>
      {/*
        Stuff here!
      */}
    </article>
  );
};
