import "./UsuarioCard.css"

const UsuarioCard = ({ usuario }) => {
    return (
        <li className="usuario-item"
            key={usuario.id}>
            {usuario.name} - {usuario.email}
        </li>
    );
}   
export default UsuarioCard;
