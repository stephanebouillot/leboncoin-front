import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

const Offer = (props) => {
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState({});
  let history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://leboncoin-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error");
      }
    };

    fetchData();
  }, [id]);

  console.log(offer);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="zoom-annonce">
      <div className="gauche">
        <div className="detailzoom">
          <img alt={offer.title} src={offer.picture.secure_url}></img>
          <div className="infos">
            <div className="infos-top">
              <div className="title">{offer.title}</div>
              <div className="price">{offer.price} €</div>
            </div>
            <div className="created-price">{offer.created}</div>
          </div>
        </div>
        <span className="titredescription">Description</span>
        <div className="description">{offer.description}</div>
      </div>
      <div className="userpanier">
        <div className="username">{offer.creator.account.username}</div>
        <div className="panierline" />
        <button
          className="button-panier"
          type="submit"
          onClick={() =>
            history.push("/payment", {
              productId: offer._id,
              img: offer.picture.secure_url,
              title: offer.title,
              price: offer.price,
            })
          }
        >
          <i class="fa fa-shopping-cart" aria-hidden="true"></i> Acheter
        </button>
      </div>
    </div>
  );
};

export default Offer;
