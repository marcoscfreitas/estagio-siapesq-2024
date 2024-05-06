import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import L from 'leaflet';


function App() {
  return (
    <Router>
      <div className="contentContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
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
      <img src='/siapesq.png' alt='icon' width='190px' height='190px' style={{ borderRadius: '50%' }} />
      <div className="formContainer">
        <h1>Olá, bem-vindo!</h1>
        <form>
          <label>E-mail</label><br />
          <input type='email' id='email' name='email' placeholder='Informe o E-mail...' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <br /><br />
          <label>Senha</label><br />
          <input type='password' id='senha' name='senha' placeholder='Digite sua Senha...' value={senha} onChange={(e) => setSenha(e.target.value)} required />
          <br />
          <p><a href="/recuperar-senha">Esqueceu a senha?</a></p>
          <button type="button" onClick={handleSubmit}>Entrar</button><br></br>
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
      <img src='/siapesq.png' alt='icon' width='190px' height='190px' style={{ borderRadius: '50%' }} />
      <div className="formContainer">
      <br></br>
        <form action='/'>
          <label>Nome</label><br />
          <input type='name' id='name' name='name' placeholder='Informe o Seu nome...' required/><br /><br />
          <label>E-mail</label><br />
          <input type='email' id='email' name='email' placeholder='Informe o E-mail...' required/><br /><br />
          <label>Senha</label><br />
          <input type='password' id='password' name='password' placeholder='Digite sua Senha...' required/><br /><br />
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
  const [map, setMap] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    if (!document.getElementById('map')._leaflet_id) {
      const newMap = L.map('map').setView([-32.0346, -52.0984], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(newMap);

      setMap(newMap);

      newMap.on('click', function (e) {
        const marker = L.marker(e.latlng).addTo(newMap);

        const popupContent = `
          <div>
            <b>Localização</b><br>
            Latitude: ${e.latlng.lat}<br>
            Longitude: ${e.latlng.lng}<br>
            <button class="deleteBtn">Excluir</button>
          </div>
        `;

        marker.bindPopup(popupContent).openPopup();

        const popup = marker.getPopup();
        const popupContentDiv = document.createElement('div');
        popupContentDiv.innerHTML = popup.getContent();
        const deleteBtn = popupContentDiv.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', function () {
          newMap.removeLayer(marker);
        });
        popup.setContent(popupContentDiv);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, latitude, longitude } = formData;

    if (!isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude)) && map) {
      const marker = L.marker([parseFloat(latitude), parseFloat(longitude)]).addTo(map);

      const popupContent = `
        <div>
          <b>${name}</b><br>
          ${description}<br>
          Latitude: ${latitude}<br>
          Longitude: ${longitude}<br>
          <button class="deleteBtn">Excluir</button>
        </div>
      `;

      marker.bindPopup(popupContent).openPopup();

      const popup = marker.getPopup();
      const popupContentDiv = document.createElement('div');
      popupContentDiv.innerHTML = popup.getContent();
      const deleteBtn = popupContentDiv.querySelector('.deleteBtn');
      deleteBtn.addEventListener('click', function () {
        map.removeLayer(marker);
      });
      popup.setContent(popupContentDiv);

      setFormData({
        name: '',
        description: '',
        latitude: '',
        longitude: ''
      });
    } else {
      alert('Coordenadas inválidas.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="mapContainer">
      <div id="map"></div>
      <div className='rightUI'><br></br>
        <Link to="/">
        <img src='/siapesq.png' alt='icon' width='190px' height='190px' style={{ borderRadius: '50%' }} /><br></br><br></br>
        </Link>
        <form className='formAdd' onSubmit={handleSubmit}>
          <h1>Adicionar Localização</h1>
          <label>Nome:</label><br></br>
          <input type="text" id="name" name="name" placeholder="Informe o Nome..." value={formData.name} onChange={handleChange} required /><br /><br />
          <label>Descrição:</label><br></br>
          <input type="text" id="description" name="description" placeholder="Descreva o Local..." value={formData.description} onChange={handleChange} required /><br /><br />
          <label>Latitude:</label><br></br>
          <input type="text" id="latitude" name="latitude" placeholder="Informe a Latitude..." value={formData.latitude} onChange={handleChange} required /><br /><br />
          <label>Longitude:</label><br></br>
          <input type="text" id="longitude" name="longitude" placeholder="Informe a Longitude..." value={formData.longitude} onChange={handleChange} required /><br /><br />
          <button type="submit">Adicionar</button>
        </form>

      </div>
    </div>
  );
}


export default App;
