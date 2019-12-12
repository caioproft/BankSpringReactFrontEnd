import React from "react";
import axios from "../utils/httpClient";
import Field from "./Field";
import { Link } from "react-router-dom";

class Deposit extends React.Component {
  state = {
    user: {
      balance: ""
    },
    errors: ""
  };

  componentDidMount() {
    axios
      .get(`/users/${this.retrieveUserId()}`)
      .then(({ data }) => {
        this.setState({
          user: data
        });
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          this.props.history.push("/not-found");
        }
      });
  }

  retrieveUserId = () => this.props.match.params.id;

  handleChange = event => {
    let field = event.target.name;
    let value = event.target.value;

    this.setState(({ user }) => ({
      user: {
        ...user,
        [field]: value
      }
    }));
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .put(`/users/deposit/${this.retrieveUserId()}`, this.state.user)
      .then(() => this.props.history.push("/users"))
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 400) {
          this.setState({
            errors: response.data
          });
        }
        this.setState({
          errors: response.data.message
        });
      });
  };

  render() {
    const { user, errors } = this.state;
    return (
      <div>
        <h1 className="page-title">Realizar Depósito</h1>

        <div className="form-container">
          <div className="form-item">
            <form onSubmit={this.handleSubmit}>
              <Field
                name="balance"
                label="Saldo do cliente"
                value={user.balance}
                errors={errors["balance"]}
              />

              <Field
                name="depositValue"
                label="Valor do depósito"
                errors={errors}
                onChange={this.handleChange}
              />

              <div>
                <Link to="/users">Voltar</Link>
                <button type="submit">Depositar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Deposit;
