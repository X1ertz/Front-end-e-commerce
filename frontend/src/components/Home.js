// ✅ src/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../asset/css/home.css';

const Home = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <section className="section-1">
        <div className="container">
          <h1>Modern Online Clothing Store</h1>    
          <p>A modern online clothing store is a digital platform where customers can browse, select, and purchase apparel from the comfort of their homes. These stores utilize cutting-edge web technologies, stylish UI/UX designs, and seamless e-commerce functionalities to enhance the shopping experience.</p>
          <p>By combining aesthetic design, advanced technology, and efficient logistics, a modern online clothing store delivers a seamless and enjoyable shopping experience for fashion enthusiasts worldwide.</p>
        </div>
      </section>

      <section className="section-2">
        <div className="container2">
          <h1>Section 2</h1>
          <p>นี่คือเนื้อหาของ Section 2</p>
        </div>
      </section>

      <section className="section-3">
        <div className="container3">
          <h1>Section 3</h1>
          <p>นี่คือเนื้อหาของ Section 3</p>
        </div>
      </section>

      <section className="section-4">
        <div className="container4">
          <h1>Section 4</h1>
          <p>นี่คือเนื้อหาของ Section 4</p>
        </div>
      </section>
    </>
  );
};

export default Home;
