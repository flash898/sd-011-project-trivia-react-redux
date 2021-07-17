import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/login/Header';
import CardLogin from '../components/login/Card';
import '../style/login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <Header />
        <CardLogin />
        {/* <Link to="/settings">
          <button
            className="settings-button"
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link> */}
      </div>
    );
  }
}

export default Login;
