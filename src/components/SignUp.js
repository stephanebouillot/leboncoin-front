import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

const SignUp = (props) => {
  let history = useHistory();
  const [username, setUserName] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [confirmpassword, setConfirmPassword] = useState(props.confirmpassword);

  return (
    <div className="inscription">
      <div className="formGauche">
        <div className="titregauche">Pourquoi creer un compte ?</div>

        <div className="paragraf">
          <div>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
          </div>

          <div className="paragrafcontain">
            <div className="titreparaf">Gagnez du temps</div>
            <p>
              props.onSucess(response) Publiez vos annonces rapidement, avec vos
              informations pré-remplies chaque fois que vous souhaitez déposer
              une nouvelle annonce.
            </p>
          </div>
        </div>

        <div className="paragraf">
          <div>
            <i class="fa fa-bell-o" aria-hidden="true"></i>
          </div>

          <div className="paragrafcontain">
            <div className="titreparaf">Soyez les premiers informés</div>
            <p>
              Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
              qui vous intéresse.
            </p>
          </div>
        </div>
        <div className="paragraf">
          <div>
            <i class="fa fa-eye" aria-hidden="true"></i>
          </div>

          <div className="paragrafcontain">
            <div className="titreparaf">Visibilité</div>
            <p>
              Suivez les statistiques de vlet history = useHistory();os annonces
              (nombre de fois où votre annonce a été vue, nombre de contacts
              reçus).
            </p>
          </div>
        </div>
      </div>
      {/* formulaire */}
      <div className="formDroite">
        <div className="titredroit">Creez un compte</div>

        <div className="formlineinscription" />
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (password !== confirmpassword) {
              alert("Le Mot de passe est different");
            } else if (
              username === "" ||
              email === "" ||
              password === "" ||
              confirmpassword === ""
            ) {
              alert("veuillez remplir les champs vides");
            }
            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/user/sign_up",
                {
                  username: username,
                  email: email,
                  password: password,
                  confirmpassword: confirmpassword,
                }
              );
              if (response.data.token) {
                Cookies.set("token", response.data.token);
                history.push("/");
                props.onLogIn();
              } else if (response.data.message) {
                alert(response.data.message);
              } else {
                console.log(response.data);
                alert("Error");
              }
            } catch (err) {
              console.error(err.response.data);
            }
          }}
          className="registerform"
          id="login"
          action=""
        >
          <label className="labelincription">Pseudo *{props.username}</label>
          <input
            className="saisieforminscription"
            type="text"
            value={username}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />

          <label className="labelincription">
            Adresse email *{props.email}
          </label>
          <input
            className="saisieforminscription"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <label className="labelincription">
            Mot de passe *{props.password}
          </label>
          <input
            className="saisieforminscription"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label className="labelincription">
            Confirmer le mot de passe {props.confirmpassword}
          </label>
          <input
            className="saisieforminscription"
            type="password"
            value={confirmpassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />

          <div>
            <input type="checkbox" name="accept" value="accept"></input>
            <label for="accept">
              J’accepte les Conditions Générales de Vente et les Conditions
              Générales d’Utilisation
            </label>
          </div>

          <button
            className="buttonsignupinscription"
            name="submit"
            type="submit"
          >
            Creer mon compte Personnel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
