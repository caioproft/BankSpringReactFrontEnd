import React from "react";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-box">
        <h1>Bem vindo ao IncubaBank</h1>
        <a href="/users">
          <button>Entrar</button>
        </a>
      </div>
    );
  }
}

export default Welcome;
