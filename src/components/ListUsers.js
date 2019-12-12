import React from "react";
import axios from "../utils/httpClient";
import { Link } from "react-router-dom";

class ListUsers extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.retrieveUsers();
  }

  handleRemove = id => {
    axios.delete(`/users/${id}`).then(() => this.retrieveUsers());
  };

  retrieveUsers() {
    axios.get("/users").then(({ data }) =>
      this.setState({
        users: data
      })
    );
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Clientes Incuba Bank</h1>

        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Número da conta</th>
              <th>Agência</th>
              <th>Saldo</th>
              <th>Cliente desde</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.agency}</td>
                <td>{user.balance}</td>
                <td>{user.createdAt}</td>
                <td>
                  <button>
                    <Link to={`/users/operations/${user.id}`}>Operações</Link>
                  </button>
                </td>
                <td>
                  <button onClick={() => this.handleRemove(user.id)}>
                    {" "}
                    Remover
                  </button>
                </td>
                <td>
                  <Link to={`/users/edit/${user.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="container-list-user">
          <button className="action-button">
            <Link to="/users/new">Novo cliente</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default ListUsers;
