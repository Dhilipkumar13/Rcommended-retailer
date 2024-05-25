// src/Nav.js
import {Link} from 'react-router-dom';

const Nav = ({ search,setSearch }) => {
 
  return (
    <nav>
      <ul>
        <li> <Link to="/">Home </Link></li>
        <li><Link to="products" >Products</Link></li>
        <li><Link to="about">About</Link></li>
      </ul>
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <input 
        id='search'
        placeholder='Search'
        type='text'
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
      </form>
      <div>
        <h3>Recommended for you:</h3>
        
      </div>
    </nav>
  );
};

export default Nav;
