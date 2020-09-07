import React, { useState } from "react";
import Header from "./components/Header";
import Offers from "./components/Offers";
import Offer from "./components/Offer";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Publish from "./components/Publish";
import Payment from "./components/Payment";

import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Header
          loggedIn={loggedIn}
          onLogOut={() => {
            setLoggedIn(false);
          }}
        />

        <main>
          <Switch>
            <Route path="/" exact>
              <Offers />
            </Route>

            <Route path="/publish">
              <Publish
                onLogIn={() => {
                  setLoggedIn(true);
                }}
              />
            </Route>
            <Route path="/payment">
              <Payment
                onLogIn={() => {
                  setLoggedIn(true);
                }}
              />
            </Route>

            <Route path="/offer/:id">
              <Offer />
            </Route>
            <Route path="/login">
              <LogIn
                onLogIn={() => {
                  setLoggedIn(true);
                }}
              />
            </Route>
            <Route path="/signup">
              <SignUp
                onLogIn={() => {
                  setLoggedIn(true);
                }}
              />
            </Route>
            <Route path="/">
              <div>404</div>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
