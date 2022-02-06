import Card from "../Molecules/Card";
import React from "react";

function Cards() {
  const CardList = [
    {
      user: "John",
      likes: "59",
      img: "https://i.imgur.com/VfyMm9U.jpg",
      gps: "Zegarkownia",
      time: "4 hours", //temporary value
      comments: [
        { wojtek: "NO i spoko" },
        { wojtek: "Pog" },
        { wojtek: "Cudne" },
      ],
    },
    {
      user: "Wojtek",
      likes: "69",
      img: "https://i.imgur.com/DPjxaqI.png",
      gps: "Nie zegarkownia",
      time: "21 days", //temporary value
      comments: [{ michal: "Gites byku" }, { robert: "fajne" }, { xd: "Git" }],
    },
    {
      user: "Marcin",
      likes: "26",
      img: "https://i.imgur.com/1P3twio.png",
      gps: "Zegarkownia",
      time: "1", //temporary value
      comments: [{ michal: "fajne" }, { robert: "okok" }, { xd: "orajt" }],
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      {CardList.map((value, index) => (
        <Card key={index} value={value} />
      ))}
    </div>
  );
}

export default Cards;
