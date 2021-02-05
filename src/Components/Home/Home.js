import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = (props) => {

    return (
       <main className="home-container">
           <section className="home-shop-wrapper">
               <Link to="/shop"><button>Shop</button></Link>
           </section>
           <section className="featured-products">
                <h3>Featured products</h3>
           </section>
       </main>  
    )
}

export default Home