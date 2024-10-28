import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import People from './People';
import PeopleAdd from './PeopleAdd';
import PeopleProfile from './PeopleProfile';

function App() {
    return (
        <Router>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                    <div className="container">
                        <span className="navbar-brand">Gestión de Personas</span>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/personas">Listar Personas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/personas/agregar">Añadir Persona</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <Routes>
                        <Route path="/personas" element={<People />} />
                        <Route path="/personas/agregar" element={<PeopleAdd />} />
                        <Route path="/personas/:id" element={<PeopleProfile />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App
