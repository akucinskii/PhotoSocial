import Card from "../Molecules/Card";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
function Cards({ session, username }) {
  const [cardList2, setCardList] = useState([]);
  useEffect(() => {
    getCards();
  }, [session]);

  //get every card from the database.
  async function getCards() {
    try {
      let { data, error, status } = await supabase
        .from("Posts")
        .select(
          `
      id,
      heart_count,
      description,
      img_url,
      gps,
      created_at,
      profiles:profile_id (id, username, avatar_url)
      `
        )
        .order("created_at", { ascending: true })
        .limit(10);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCardList(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="flex flex-col-reverse items-center gap-8">
      {/*  display every card */}
      {cardList2.map((value) => (
        <Card
          key={value.id}
          id_atr={value.id}
          value={value}
          url={value.img_url}
        />
      ))}
      {!username && (
        <div className="flex items-center align-center w-3/4">
          <h1 className="text-center text-bold text-lg">
            To like or create posts, u need to set your username first in{" "}
            <i className="bx bx-user"></i> tab.
          </h1>
        </div>
      )}
    </div>
  );
}

export default Cards;
