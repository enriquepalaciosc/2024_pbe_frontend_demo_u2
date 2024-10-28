// PeopleProfile.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PeopleProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        edad: '',
        habilitada: false,
        fecha_nacimiento: ''
    });

    useEffect(() => {
        // Datos de ejemplo
        const samplePerson = {
            id: id,
            nombre: "Juan Pérez",
            edad: 30,
            habilitada: true,
            fecha_nacimiento: "1994-05-15"
        };

        // setFormData(samplePerson);

        // Cuando tengas tu API, usa esto:
        const fetchPerson = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/personas/perfil/${id}`);
            setFormData(response.data);
          } catch (error) {
            console.error('Error al obtener persona:', error);
            navigate('/personas');
          }
        };
        fetchPerson();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/personas/${id}`, formData);
            navigate('/personas');
        } catch (error) {
            console.error('Error al actualizar persona:', error);
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
                <h2 className="mb-4">Perfil de Persona</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.id}
                            readOnly
                        />
                    </div>
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
                            id="habilitadaProfile"
                        />
                        <label className="form-check-label" htmlFor="habilitadaProfile">
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
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/personas')}
                        >
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PeopleProfile;