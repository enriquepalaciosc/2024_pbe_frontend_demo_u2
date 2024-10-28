import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function People() {
    const [people, setPeople] = useState([]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Datos de ejemplo
    const sampleData = [
        {
            id: 1,
            nombre: "Juan Pérez",
            edad: 30,
            habilitada: true,
            fecha_nacimiento: "1994-05-15"
        },
        {
            id: 2,
            nombre: "María García",
            edad: 25,
            habilitada: false,
            fecha_nacimiento: "1999-08-22"
        }
    ];

    useEffect(() => {
        // Simulamos la carga de datos
        //setPeople(sampleData);

        // Acá se importa en tiempo real
        const fetchPeople = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/personas/');
            setPeople(response.data);
          } catch (error) {
            console.error('Error al obtener personas:', error);
          }
        };
        fetchPeople();
    }, []);

    return (
        <div>
            <h2 className="mb-4">Listado de Personas</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Habilitada</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {people.map(person => (
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.nombre}</td>
                        <td>{person.edad}</td>
                        <td>
                <span className={`badge ${person.habilitada ? 'bg-success' : 'bg-danger'}`}>
                  {person.habilitada ? 'Sí' : 'No'}
                </span>
                        </td>
                        <td>{formatDate(person.fecha_nacimiento)}</td>
                        <td>
                            <Link to={`/personas/${person.id}`} className="btn btn-sm btn-primary">
                                Editar / ver perfil
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default People;