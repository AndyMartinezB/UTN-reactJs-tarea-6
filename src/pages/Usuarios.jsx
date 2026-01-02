import { useState } from 'react'
import './Usuarios.css'
import { useFetch } from '../hooks/useFetch.js'
import UsuarioCard from '../components/UsuarioCard.jsx'

const Usuarios = () => {

    const { data: usuarios, loading, error, reload } = useFetch("https://jsonplaceholder.typicode.com/users");
    const [busqueda, setBusqueda] = useState("");     
    const usuariosFiltrados = usuarios ? usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase())
    ) : [];
    
    return (
    <section className="usuarios-page">
        
        <div className="usuarios-header">
            <h2>Usuarios</h2>
            <p>A continuación se listan los usuarios del sitio:</p>
        </div>
        
        <div className="usuarios-filtros">
            <input className="input-filtro"
                type="text"
                placeholder="Filtrar usuarios..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                disabled={loading}  
            />
            <button className="button-reload" onClick={() => reload()} disabled={loading}>Recargar</button>
        </div>

        {loading && <div className="loading">Cargando usuarios...</div>}
        {error && <div className="error-box">Se ha producido un error: {error.message}</div>}
        {/* me falta !loading && !error */}
        {usuarios.length === 0 ? (
            <div className="lista-usuarios-vacia">No hay usuarios disponibles.</div>
        ) : <ul className="lista-usuarios">
            {usuariosFiltrados.length === 0 ? (
                <li>No se encuentran usuarios con "{busqueda}".</li>
            ) : (
                usuariosFiltrados.map((usuario) => (
                    <UsuarioCard usuario={usuario} key={usuario.id} />
                ))
            )}
        </ul>}
        
    </section>
    );
}

export default Usuarios;