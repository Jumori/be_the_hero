import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from './../../assets/logo.svg';

import api from './../../services/api';

// EXPORTS ---------------------------------------------------------------------
export default function Register() {
  // FORM INPUT STATES ---------------------------------------------------------
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // VAR FOR REDIRECT USER
  const history = useHistory();

  // AUX FUNCTIONS -------------------------------------------------------------
  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      ong: {
        name, 
        email, 
        phone, 
        city, 
        uf
      }
    };

    // PUT A SPINNY THING ON IT

    try {
      const response = await api.post('ongs', data);
      
      // USE TOASTS TO DISPLAY RESPONSE
      console.log(response.data);

      history.push('/');
    } catch (err) {
      console.log('Erro no cadastro, tente novamente.');

      // USE TOASTS TO DISPLAY RESPONSE
    }

  };

  // RETURN COMPONENT ----------------------------------------------------------
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="button-link" to="/">
            <FiArrowLeft size={16} color="#E02041" /> 
            Voltar para o logon
          </Link>
        </section>
        
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="WhatsApp" 
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city} 
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }} 
              maxLength={2}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}