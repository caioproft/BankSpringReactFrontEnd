import React from "react";
import { Link } from "react-router-dom";
import axios from "../utils/httpClient";
import Field from "./Field";

class EditUser extends React.Component {
  state = {
    user: {
      name: "",
      email: ""
    },
    errors: {}
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
      .put(`/users/${this.retrieveUserId()}`, this.state.user)
      .then(() => this.props.history.push("/users"))
      .catch(({ response }) => {
        if (response.status === 400) {
          this.setState({
            errors: response.data
          });
        }
      });
  };

  render() {
    const { user, errors } = this.state;

    return (
      <div>
        <h1 className="page-title">Alterar dados de cliente</h1>

        <div className="form-container">
          <div className="form-item">
            <form onSubmit={this.handleSubmit}>
              <Field
                name="name"
                label="Nome do cliente"
                value={user.name}
                errors={errors["name"]}
                onChange={this.handleChange}
              />

              <Field
                name="email"
                label="E-mail do cliente"
                value={user.email}
                errors={errors["email"]}
                onChange={this.handleChange}
              />

              <div>
                <Link to="/users">Voltar</Link>
                <button type="submit">Salvar alterações</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default EditUser;
