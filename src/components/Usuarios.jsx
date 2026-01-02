import { useState, useEffect } from 'react'
import './Usuarios.css'

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if(!res.ok) throw new Error("Error al obtener los usuarios");
                const data = await res.json();
                setUsuarios(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);
    const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.includes(busqueda)
    );

    if (loading) return <div className= "spinning">Cargando usuarios...</div>;
    if (error) return <div className = "error-box">Se ha producido un error: {error.message}</div>;
    if (usuarios.length === 0) return <div className="lista-usuarios-vacia">No hay usuarios disponibles.</div>;
    //if (busqueda.length > 0)
   
    return (
    <>
    <div>
        <h2>Usuarios</h2>
        <p>A continuación se listan los usuarios del sitio:</p>
    </div>
    <div className="filtro-usuarios">
        <input className="input-filtro"
            type="text"
            placeholder="Filtrar usuarios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}  
        />

    </div>
    <ul className="lista-usuarios">

        {usuariosFiltrados.length === 0 ? (
            <li>No se encuentran usuarios con "{busqueda}".</li>
        ) : (
            usuariosFiltrados.map((usuario) => (
                <li key={usuario.id}>
                    {usuario.name} - {usuario.email}
                </li>
            ))
        )}
    </ul>
    </>
    );
}

export default Usuarios;