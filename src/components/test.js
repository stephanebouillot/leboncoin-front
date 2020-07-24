import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import url from "../url";

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true); //Etat pour le chargement des données
  const [products, setProducts] = useState([]); // Etat pour définir la liste des produits à afficher
  const [skip, setSkip] = useState(1); // Etat pour définir le skip
  const [count, setCount] = useState(); // Etat pour définir le nombre total de résultats
  const [title, setTitle] = useState(""); // Etat pour définir ce que j'écris dans l'input de recherche title
  const [maxPrice, setMaxPrice] = useState(0); // Etat pour définir ce que j'écris dans l'input de recherche maxPrice
  const [minPrice, setMinPrice] = useState(0); // Etat pour définir ce que j'écris dans l'input de recherche minPrice
  const [sort, setSort] = useState("");

  // Pour la pagination, je créée un tableau vide me permettant de stocker le nombre de pages
  // En fonction de la limit correspondant au nombre de résultats par page
  const skipTab = [];
  const limit = 4;

  console.log("skip =====>", skip);

  // je créé un tableau contenant le nombre de pages de ma recherche
  for (let i = 0; i < count / limit; i++) {
    skipTab.push(i + 1);
  }
  console.log("skiptab ====>", skipTab);
  console.log("count ====", count);

  const sortTab = ["price-desc", "price-asc"];
  const dropdown = [<option default>Trier...</option>];
  for (let i = 0; i < sortTab.length; i++) {
    dropdown.push(<option value={sortTab[i]}>{sortTab[i]}</option>);
  }

  // Je définis une chaîne de caractère correspondant à l'url qui s'affiche en fonction de ce que j'entre dans mes critères de recherche
  let search = "";
  if (title) {
    if (search.length > 0) {
      search = search + "&title=" + title;
    } else {
      search = "&title=" + title;
    }
  }
  if (maxPrice) {
    if (search.length > 0) {
      search = search + "&maxPrice=" + maxPrice;
    } else {
      search = "&maxPrice=" + maxPrice;
    }
  }
  if (minPrice) {
    if (search.length > 0) {
      search = search + "&minPrice=" + minPrice;
    } else {
      search = "&minPrice=" + minPrice;
    }
  }
  if (sort) {
    if (search.length > 0) {
      search = search + "&sort=" + sort;
    } else {
      search = "&sort=" + sort;
    }
  }

  // Je définis ma recherche avec l'url concatené à mon skip, limit ainsi que search
  const fetchData = async () => {
    const response = await axios.get(
      url.url + "/offers/with-count?skip=" + skip + search
    );
    // Je mets à jour le nombre de résultats de ma recherche pour afficher le bon nombre de pages
    // Ainsi que la valeur de product correspondant à la liste de resultats de ma recherche
    setCount(response.data.count);
    setProducts(response.data.offers);
    console.log("response.data ===>", response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  console.log(products);

  return (
    <div className="page">
      <div className="ellipse"></div>
      <form
        className="search"
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <div className="input-searchtitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="grey"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Que recherchez-vous ?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div className="input-searchnumber">
          <input
            type="Number"
            placeholder="Prix min"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          ></input>
        </div>
        <div className="input-searchnumber">
          <input
            type="Number"
            placeholder="Prix max"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          ></input>
        </div>
        <select
          className="sort"
          placeholder="trier..."
          onChange={(event) => setSort(event.target.value)}
        >
          {dropdown}
        </select>
        <input
          className="searchButton"
          type="submit"
          value="Rechercher"
          placeholder="rechercher"
        ></input>
      </form>
      <div className="search-results">
        {isLoading === true ? (
          <p>En cours de chargement</p>
        ) : (
          <div className="list-products">
            {/* J'importe ma fonction pour convertir le format de la date */}
            {products.map((product) => {
              const dateCreated = new Date(product.created);
              const date =
                dateCreated.toLocaleDateString() +
                " à " +
                dateCreated.toLocaleTimeString();
              return (
                <Link className="product" to={"/offer/" + product._id}>
                  <>
                    <img className="product-image" src={product.files[0]}></img>
                    <div className="product-details">
                      <h1>{product.title}</h1>
                      <h2>{product.price}€</h2>
                      <h3>{date}</h3>
                    </div>
                  </>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <div className="boutons">
        {skipTab.map((pageNumber) => {
          return (
            <button
              className="bouton"
              onClick={() => {
                setSkip(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
