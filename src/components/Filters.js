import React, { useState } from "react";

// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Filters = () => {
  // let history = useHistory();
  // const [loading, setLoading] = useState(true);
  // const [count, setCount] = useState(0);
  const [offers, setOffers] = useState([]);

  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [sort, setSort] = useState("");

  let search = "";
  if (title) {
    if (search.length > 0) {
      search = search + "&title=" + title;
    } else {
      search = "&title=" + title;
    }
  }
  if (priceMax) {
    if (search.length > 0) {
      search = search + "&priceMax=" + priceMax;
    } else {
      search = "&priceMax=" + priceMax;
    }
  }
  if (priceMin) {
    if (search.length > 0) {
      search = search + "&priceMin=" + priceMin;
    } else {
      search = "&priceMin=" + priceMin;
    }
  }
  if (sort) {
    if (search.length > 0) {
      search = search + "&sort=" + sort;
    } else {
      search = "&sort=" + sort;
    }
  }

  return (
    <>
      <div>
        <form
          className="formcontent"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const response = await axios.get(
                "https://leboncoin-api.herokuapp.com/offer/with-count?" +
                  search,
                {
                  title: title,
                  priceMin: priceMin,
                  priceMax: priceMax,
                  sort: sort,
                }
              );
              if (response.data) {
                // console.log(response.data);

                setOffers(response.data.offers);
                // setCount(response.data.count);

                // setLoading(false);
                // Cookies.set("token", response.data.token);
                // history.push("/");
                // props.onLogIn();import {Link} from "react-router-dom";
              } else {
                alert("Error");
              }
            } catch (err) {
              console.error("Error");
              // if (err.response.data.error === "Unauthorized") {
              //   alert("Mauvais mot de passe");
              // }
            }
          }}
        >
          <div className="blocrecherche">
            <input
              className="input"
              type="string"
              placeholder="Que recherchez vous ?"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
            <button className="button-search" type="submit">
              Rechercher
            </button>
          </div>
          <div className="criteres">
            Prix entre
            <input
              className="prixmini"
              type="number"
              placeholder="prix mini"
              value={priceMin}
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            ></input>
            <input
              className="prixmini"
              type="number"
              placeholder="prix max"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            ></input>
            <select
              className="menuchoix"
              name="nom"
              size="0"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
              }}
            >
              <option value="date-desc"> Tri : Plus recent </option>
              <option value="date-asc">Tri : Moins recent </option>
              <option value="price-asc">Tri : Moins cher </option>
              <option value="price-desc">Tri : Plus cher </option>
            </select>
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
        </form>
      </div>
    </>
  );
};

export default Filters;
