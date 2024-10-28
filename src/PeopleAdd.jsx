import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PeopleAdd() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        habilitada: true,
        fecha_nacimiento: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/personas', formData);
            navigate('/personas');
        } catch (error) {
            console.error('Error al crear persona:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2 className="mb-4">Añadir Nueva Persona</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            minLength="5"
                            maxLength="50"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Edad</label>
                        <input
                            type="number"
                            className="form-control"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            min="10"
                            max="110"
                            required
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="habilitada"
                            checked={formData.habilitada}
                            onChange={handleChange}
                            id="habilitada"
                        />
                        <label className="form-check-label" htmlFor="habilitada">
                            Habilitada
                        </label>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fecha_nacimiento"
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PeopleAdd;