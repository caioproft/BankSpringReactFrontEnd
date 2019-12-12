import React from "react";
import { Link } from "react-router-dom";
import axios from "../utils/httpClient";

class Operations extends React.Component {
  state = {
    user: {
      name: "",
      email: "",
      number: "",
      agency: "",
      balance: ""
    }
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

  render() {
    const { user } = this.state;
    return (
      <div>
        <h1 className="page-title">Operações</h1>

        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Número da conta</th>
              <th>Agência</th>
              <th>Saldo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td>{user.agency}</td>
              <td>{user.balance}</td>
              <td>
                <button>
                  <Link to={`/users/withdraw/${user.id}`}>Sacar</Link>
                </button>
              </td>
              <td>
                <button>
                  <Link to={`/users/deposit/${user.id}`}>Depositar</Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <Link to="/users">Voltar</Link>
        </div>
      </div>
    );
  }
}

export default Operations;
