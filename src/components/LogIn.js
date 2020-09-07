import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

import Cookies from "js-cookie";

const LogIn = (props) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="pageform">
        <form
          className="formcontent"
          id="login"
          onSubmit={async (event) => {
            event.preventDefault();

            if (email === "" || password === "") {
              alert("Veulliez remplir tout les champs");
            }

            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/user/log_in",
                {
                  email: email,
                  password: password,
                }
              );
              if (response.data.token) {
                Cookies.set("token", response.data.token);
                history.push("/");
                props.onLogIn();
              } else {
                alert("Error");
              }
            } catch (err) {
              console.error("Error");
              if (err.response.data.error === "Unauthorized") {
                alert("Mauvais mot de passe");
              }
            }
          }}
        >
          <h2>Connexion</h2>

          <div className="formline" />
          <label className="labellogin">Adresse email</label>
          <input
            className="saisieform"
            placeholder=""
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label className="labellogin">Mot de passe</label>
          <input
            className="saisieform"
            placeholder=""
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button
            className="buttonlogin"
            name="submit"
            type="submit"
            data-submit="...Sending"
          >
            Se connecter
          </button>

          <div className="formlinebas" />

          <div className="labellogincrea">Vous n'avez pas de compte ?</div>

          <button
            className="buttonsignup"
            name="submit"
            onClick={() => {
              history.push("/signup");
            }}
          >
            Creer un compte
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
