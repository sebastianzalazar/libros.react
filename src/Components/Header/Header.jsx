import PropTypes from 'prop-types';
import './Header.css'; 
const Header = ({onSearchChange})=>{
    return (
        <header>
            <div className="titulo">mi bliblioteca virtual</div>
            <div className="search-bar">
                <input type="text"
                placeholder="buscar libro..."
                onChange={onSearchChange} />
                <button type="button">Buscar</button>
            </div>
        </header>
    );
};
Header.propTypes={
    onSearchChange:PropTypes.func.isRequired
}

export default Header