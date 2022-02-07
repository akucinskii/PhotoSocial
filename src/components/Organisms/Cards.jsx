import Card from "../Molecules/Card";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
function Cards({ session }) {
  const [cardList2, setCardList] = useState([]);

  useEffect(() => {
    getCards();
  }, [session]);

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
    <div className="flex flex-col-reverse gap-8">
      {cardList2.map((value) => (
        <Card
          key={value.id}
          id_atr={value.id}
          value={value}
          url={value.img_url}
        />
      ))}
    </div>
  );
}

export default Cards;
