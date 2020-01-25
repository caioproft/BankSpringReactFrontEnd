import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome";
import NewUser from "./components/NewUser";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
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
              <Route path="/users" exact component={Users} />
              <Route path="/users/edit/:id" exact component={EditUser} />
              <Route path="/users/withdraw/:id" exact component={Withdraw} />
              <Route path="/users/deposit/:id" exact component={Deposit} />
              <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>
        </div>
      </>
    );
  }
}

export default App;
