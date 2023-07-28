import { Button } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardProfile from "../components/CardProfile/CardProfile";
import Card2 from "../components/Card2/Card2";

function Profile(props) {
  const { short } = useParams();
  const [card, setCard] = useState(null);
  useEffect(() => {
    fetch(
      `https://ap-southeast-1.aws.data.mongodb-api.com/app/ecard-vwdtg/endpoint/ecard?short=${short}`
    )
      .then(res => res.json())
      .then(data => setCard(data));
  }, []);
  // ajax get data
  //https://ap-southeast-1.aws.data.mongodb-api.com/app/ecard-vwdtg/endpoint/ecard?id=${short}
  //setCard(res.data)
  if (card) {
    switch (card.template) {
      case "Card2":
        return <Card2 card={card} />;

      default:
        return <CardProfile card={card} />;
    }
  }
}

export default Profile;
