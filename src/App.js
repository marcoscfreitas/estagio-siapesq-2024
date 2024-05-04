import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import L from 'leaflet';

function App() {
  return (
    <Router>
      <div className="appContainer">
        <div className="contentContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/mapa" element={<Mapa />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    window.location.href = '/mapa';
  };

  return (
    <div className="pageContainer">
      <div className="formContainer">
        <br /><br />
        <h1>Olá, bem-vindo!</h1>
        <form>
          <label>E-mail</label><br />
          <input type='email' id='email' name='email' placeholder='Informe o E-mail...' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <br /><br />
          <label>Senha</label><br />
          <input type='password' id='senha' name='senha' placeholder='Digite sua Senha...' value={senha} onChange={(e) => setSenha(e.target.value)} required />
          <br /><br />
          <p><a href="/recuperar-senha">Esqueceu a senha?</a></p>
          <br />
          <button type="button" onClick={handleSubmit}>Enviar</button>
          <p>
            <Link to="/cadastro">Ainda não possui Cadastro?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Cadastro() {
  return (
    <div className="pageContainer">
      <div className="formContainer">
        <br></br>
        <h1>Cadastre-se!</h1>
        <form>
          <label>Nome</label><br />
          <input type='name' id='name' name='name' placeholder='Informe o Seu nome...' required /><br /><br />
          <label>E-mail</label><br />
          <input type='email' id='email' name='email' placeholder='Informe o E-mail...' required /><br /><br />
          <label>Senha</label><br />
          <input type='password' id='password' name='password' placeholder='Digite sua Senha...' required /><br /><br />
          <label>Confirmar Senha</label><br />
          <input type='password' id='password' name='password' placeholder='Digite sua Senha...' required /><br /><br />
          <button>Enviar</button>
          <p>
            <Link to="/">Já possui Cadastro? Faça login.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Mapa() {
  useEffect(() => {
    if (!document.getElementById('map')._leaflet_id) {
      const map = L.map('map').setView([-32.0346, -52.0984], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      function removeMarker(e) {
        map.removeLayer(e.target);
      }

      map.on('click', function (e) {
        const marker = L.marker(e.latlng).addTo(map);

        marker.bindPopup('Localização: ' + e.latlng.toString()).openPopup();

        marker.on('dblclick', removeMarker);
      });
    }
  }, []);

  return (
    <div className="mapContainer">
      <div id="map"></div>
      <p>
        <Link to="/">Voltar para o Login</Link>
      </p>
    </div>
  );
}

export default App;
