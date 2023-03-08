import { Button } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardProfile from "../components/CardProfile/CardProfile";

function Profile(props) {
  const { short } = useParams();
  const [card, setCard] = useState(null);
  useEffect(() => {
    fetch(
      `https://ap-southeast-1.aws.data.mongodb-api.com/app/ecard-vwdtg/endpoint/ecard?short=${short}`
    )
      .then((res) => res.json())
      .then((data) => setCard(data));
  }, []);
  // ajax get data
  //https://ap-southeast-1.aws.data.mongodb-api.com/app/ecard-vwdtg/endpoint/ecard?id=${short}
  //setCard(res.data)
  return (
    card && (
      <div className="relative card-container">
        <CardProfile card={card} />
      </div>
    )
  );
}

export default Profile;
