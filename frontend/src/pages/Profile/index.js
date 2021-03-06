import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoImg from './../../assets/logo.svg'

import api from './../../services/api';

// EXPORTS ---------------------------------------------------------------------
export default function Profile() {
  // FORM INPUT STATES ---------------------------------------------------------
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('sessionOngId');
  const ongName = localStorage.getItem('sessionOngName');

  // VAR FOR REDIRECT USER
  const history = useHistory();

  // ON PAGE LOAD
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data.data);
    });
  }, [ongId]);

  // AUX FUNCTIONS -------------------------------------------------------------
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      console.log('Incidente removido com sucesso');
      
      // UPDATE DISPLAYED CARDS
      api.get('profile', {
        headers: {
          Authorization: ongId
        }
      }).then(response => {
        setIncidents(response.data.data);
      });

    } catch (err) {
      console.log('Erro ao tentar deletar o incidente, tente novamente.')
    }
  };

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  };

  // EXPORT COMPONENT ----------------------------------------------------------
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};