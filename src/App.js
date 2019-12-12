import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import Welcome from "./components/Welcome";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Operations from "./components/Operations";
import Withdraw from "./components/Withdraw";
import Deposit from "./components/Deposit";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <div>
          <Header />
          <BrowserRouter>
            <Switch>
              <Route path={["/"]} exact component={Welcome} />
              <Route path="/users/new" exact component={NewUser} />
              <Route path="/users" exact component={ListUsers} />
              <Route path="/users/edit/:id" exact component={EditUser} />
              <Route
                path="/users/operations/:id"
                exact
                component={Operations}
              />
              <Route path="/users/withdraw/:id" exact component={Withdraw} />
              <Route path="/users/deposit/:id" exact component={Deposit} />
              <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
