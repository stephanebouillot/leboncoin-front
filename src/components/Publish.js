import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

// import Cookies from "js-cookie";

const Publish = (props) => {
  let history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");

  return (
    <>
      <div className="publication">
        <form
          className="formpublish"
          onSubmit={async (event) => {
            event.preventDefault();

            if (title === "" || description === "" || price === "") {
              alert("Veulliez remplir tout les champs");
            }

            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/offer/publish",

                {
                  headers: {
                    Authorization: "Bearer  ${token}",
                    "Content-Type": "multipart/form-data",
                  },
                },

                {
                  title: title,
                  description: description,
                  price: price,
                  picture: picture,
                  created: new Date(),
                }
              );
              if (response.data.token) {
                // Cookies.set("token", response.data.token);
                history.push("/");
                props.onLogIn();
              } else {
                alert("Error");
              }
            } catch (error) {
              console.error("Error");
              if (error.response.data.error === "Unauthorized") {
                alert("veuillez vous connecter pour deposer une annonce");
              }
            }
          }}
        >
          <h2 className="titrepublish">Deposer une annonce</h2>
          <div className="formlinepublish" />
          <label className="labeltitreannonce">
            Titre de l'annonce *{props.title}
          </label>
          <input
            className="saisieform"
            placeholder=""
            type="text"
            value={props.title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label className="labellogin">
            Texte de l'annonce *{props.description}
          </label>
          <input
            type="textarea"
            className="saisieformtexte"
            placeholder=""
            value={props.description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <label className="labelprix">Prix *{props.price}</label>

          <input
            className="saisieformprix"
            placeholder=""
            type="number"
            value={props.price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <span>€</span>

          <label className="labellogin">Photo *{props.picture}</label>
          <input
            className="saisieform"
            placeholder=""
            type="file"
            value={props.picture}
            onChange={(event) => {
              setPicture(event.target.value);
            }}
          />
          <button className="buttonlogin" name="submit" type="submit">
            Valider
          </button>
        </form>
      </div>
    </>
  );
};

export default Publish;
// Headers :
// "Authorization": "Bearer ${token}"
//  "Content-Type": "multipart/form-data"
