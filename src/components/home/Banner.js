import React from 'react';
import "./Banner.css";

const backOfficeNname="UberPets";

const Banner = () => {
  return (
    <div className="banner">
      <div className="containerBanner">
        <h1 className="logo-font">
          {backOfficeNname}
        </h1>
        <p>Traslade sus mascotas de forma segura</p>
      </div>
    </div>
  );
};

export default Banner;
