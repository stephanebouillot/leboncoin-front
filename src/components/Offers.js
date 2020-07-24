import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Filters from "./Filters";

import NavBas from "./NavBas";
import axios from "axios";

const Offers = (props) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);

  const offersByPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leboncoin-api.herokuapp.com/offer/with-count",
          {
            params: {
              page: page,
              limit: offersByPage,
            },
          }
        );

        setOffers(response.data.offers);
        setCount(response.data.count);

        setLoading(false);
      } catch (err) {
        console.error("Error");
      }
    };
    fetchData();
  }, [page]);

  const changePage = async (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="ellipse"></div>
      <div className="ellipsebis"></div>
      <div className="content">
        <div className="blocsearch">
          <Filters />
        </div>

        <div className="Current-page">
          Page {page}/{Math.ceil(count / offersByPage)}
        </div>

        <ul className="annonces">
          {offers.map((offer) => (
            <Link to={`/offer/${offer._id}`} key={offer._id}>
              <li className="annonce">
                <img alt={offer.title} src={offer.picture.secure_url}></img>

                <div className="infos">
                  <div className="infos-top">
                    <div className="title">{offer.title}</div>
                    <div className="price">{offer.price} €</div>
                  </div>
                  <div className="created">
                    {new Date(offer.created).toLocaleString()}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <NavBas
        page={page}
        pages={Math.ceil(count / offersByPage)}
        changePage={changePage}
      />
    </>
  );
};

export default Offers;
