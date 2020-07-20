import React, { useState } from "react";

// import { useHistory } from "react-router-dom";

import axios from "axios";

import Cookies from "js-cookie";

const Publish = (props) => {
  //   let history = useHistory();

  const [title, setTitle] = useState("");
  const [announce, setAnnounce] = useState("");
  const [price, setPrice] = useState("");
  //   const [picture, setPicture] = useState("");

  return (
    <>
      <div className="publication">
        <form
          className="formpublish"
          onSubmit={async (event) => {
            event.preventDefault();

            if (title === "" || announce === "" || price === "") {
              alert("Veulliez remplir tout les champs");
            }

            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/user/publish",
                {
                  title: title,
                  announce: announce,
                  price: price,
                  //   picture: picture,
                }
              );
              if (response.data.token) {
                Cookies.set("token", response.data.token);
                // history.push("/");
                props.onLogIn();
              } else {
                alert("Error");
              }
            } catch (err) {
              console.error("Error");
              if (err.response.data.error === "Unauthorized") {
                alert("veuillez vous connecter pour deposer une annonce");
              }
            }
          }}
        >
          <h2 className="titrepublish">Deposer une annonce</h2>
          <div className="formlinepublish" />
          <label className="labeltitreannonce">Titre de l'annonce *</label>
          <input
            className="saisieform"
            placeholder=""
            type="text"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label className="labellogin">Texte de l'annonce *</label>
          <input
            className="saisieformtexte"
            placeholder=""
            type="text"
            onChange={(event) => {
              setAnnounce(event.target.value);
            }}
          />
          <label className="labelprix">Prix *</label>

          <input
            className="saisieformprix"
            placeholder=""
            type="number"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <span>€</span>

          {/* <label className="labellogin">Photo *</label>
          <input
            className="saisieform"
            placeholder=""
            type="password"
            onChange={(event) => {
              setPicture(event.target.value);
            }}
          /> */}
          <button
            className="buttonlogin"
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Valider
          </button>
        </form>
      </div>
    </>
  );
};

export default Publish;
