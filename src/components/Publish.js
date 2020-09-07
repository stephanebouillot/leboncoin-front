import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

const Publish = (props) => {
  let history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState({});

  const Token = Cookies.get("token");
  // "2Y3XdUasPO13lBK3GmyKCl1kGdS4p3g25AFt2NqE0qA8vCvjCg4GFRDldQFBuCjk";

  return (
    <>
      <div className="publication">
        <form
          className="formpublish"
          onSubmit={async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("price", price);
            formData.append("description", description);

            if (title === "" || description === "" || price === "") {
              alert("Veuillez remplir tout les champs");
            }

            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/offer/publish",
                formData,

                {
                  headers: {
                    Authorization: "Bearer " + Token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(response);
              if (response.data.token) {
                // Cookies.set("token", response.data.token);
                history.push(`/offer/${response.data._id}`);
              }
            } catch (error) {
              console.error("Error");

              // if (error.response.data.error === "Unauthorized") {
              //   alert("veuillez vous connecter pour deposer une annonce");
              // }
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

          <label className="labellogin">Photo *{props.file}</label>
          <input
            className="saisieform"
            placeholder=""
            type="file"
            // value={props.file}
            onChange={(event) => {
              setFile(event.target.files[0]);
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
