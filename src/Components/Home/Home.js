import React from 'react';
import './Home.css';

const Home = (props) => {

    return (
       <main className="home-container">
           <section className="home-shop-wrapper">
               <button>Shop</button>
           </section>
           <section className="featured-products">
                <h3>Featured products</h3>
           </section>
       </main>  
    )
}

export default Home