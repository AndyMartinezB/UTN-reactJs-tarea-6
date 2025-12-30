import { useState, useEffect } from 'react'
const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    if (loading) return <div className= "spinning">Cargando usuarios...</div>;
    if (error) return <div className = "error-box">Se ha producido un error: {error.message}</div>;
    if (usuarios.length === 0) return <div className="lista-usuarios-vacia">No hay usuarios disponibles.</div>;
    return (
    <>
    <div>
        <h1>Usuarios</h1>
        <p>A continuación se listan los usuarios del sitio:</p>
    </div>
    <ul>
        {usuarios.map((usuario) => (
            <li key={usuario.id}>
                {usuario.name} - {usuario.email}
            </li>
        ))}
    </ul>
    </>
    );
}

export default Usuarios;