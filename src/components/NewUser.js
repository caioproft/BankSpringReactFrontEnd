import React from "react";
import axios from "../utils/httpClient";
import { Link } from "react-router-dom";
import Field from "./Field";

class NewUser extends React.Component {
  state = {
    user: {
      name: "",
      email: "",
      number: "",
      agency: "",
      balance: 0
    },
    errors: {},
    globalError: ""
  };

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
    axios
      .post("/users", this.state.user)
      .then(() => this.props.history.push("/users"))
      .catch(({ response }) => {
        if (response.status === 400) {
          this.setState({
            errors: response.data
          });
        }
        this.setState({
          globalError: response.data.message
        });
      });
    event.preventDefault();
  };

  render() {
    const { user, errors, globalError } = this.state;
    return (
      <div>
        <h1 className="page-title">Novo Cliente</h1>

        {globalError ? <div>{globalError}</div> : <></>}

        <div className="form-container">
          <div className="form-item">
            <form onSubmit={this.handleSubmit}>
              <Field
                name="name"
                label="Nome"
                value={user.name}
                errors={errors["name"]}
                onChange={this.handleChange}
              />

              <Field
                name="email"
                label="E-mail"
                value={user.email}
                erros={errors["email"]}
                onChange={this.handleChange}
              />

              <Field
                name="number"
                label="Número da conta"
                value={user.number}
                error={errors["number"]}
                onChange={this.handleChange}
              />
              <Field
                name="agency"
                label="Número da agência"
                value={user.agency}
                error={errors["agency"]}
                onChange={this.handleChange}
              />

              <div>
                <Link to="/users">Voltar</Link>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default NewUser;
