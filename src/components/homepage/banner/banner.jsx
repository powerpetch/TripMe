import React from 'react';
import Typical from 'react-typical';
import applightWave from '../../../images/applight-wave.svg';
import './banner.css';
import world from '../../../assets/world-png.gif';
import '../../../animation/animate.css'; // Import animate.css
import SearchBar from '../searchbar';
import Background from '../../../images/back.mp4';

const Banner = () => (
  <section className="banner" data-scroll-index='0'>
    <div className="video-background">
      <video src={Background} autoPlay loop muted />
    </div>
    <div className="banner-overlay">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="banner-text">
              <h1 className="white">Discovery your</h1>
              <h2 className="white">
                Next{' '}
                <Typical
                  steps={['Adventure', 1000, 'Destination', 1000, 'Trip', 1000, 'Partner', 1000]}
                  loop={Infinity}
                  wrapper="span"
                />
              </h2>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <img src={world} className="img-fluid animate__animated animate__fadeInUp world-image" alt="world-spining"/>
          </div>
        </div>
      </div>
    </div>
    <span className="svg-wave">
      <img className="svg-hero" src={applightWave} alt="Wave"/>
    </span>
    <div className="search-bar-container">
      <SearchBar />
    </div>
  </section>
);

export default Banner;