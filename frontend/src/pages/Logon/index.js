import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import logoImg from './../../assets/logo.svg';
import heroesImg from './../../assets/heroes.png';

import api from './../../services/api';

// EXPORTS ---------------------------------------------------------------------
export default function Logon() {
  // FORM INPUT STATES ---------------------------------------------------------
  const [id, setId] = useState('');

  // VAR FOR REDIRECT USER
  const history = useHistory();

  // AUX FUNCTIONS -------------------------------------------------------------
  async function handleLogin(e) {
    e.preventDefault();
    const data = {
      login: {
        id
      }
    };

    // PUT A SPINNY THING ON IT

    try {
      const response = await api.post('sessions', data);
      
      console.log(response);
      // USE TOASTS TO DISPLAY RESPONSE
      localStorage.setItem('sessionOngId', id);
      localStorage.setItem('sessionOngName', response.data.data.name);

      history.push('/profile');
    } catch (err) {
      console.log('Erro no login, tente novamente.');

      // USE TOASTS TO DISPLAY RESPONSE
    }

  };

  // RETURN COMPONENT ----------------------------------------------------------
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID" 
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="button-link" to="/register">
            <FiLogIn size={16} color="#E02041" /> 
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}