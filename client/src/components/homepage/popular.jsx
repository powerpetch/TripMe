import React from "react";
import '../../App.css';

const Popular = () => (
    <section class="team section-padding" data-scroll-index='3'>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="sectioner-header text-center">
          <h3>Our Team</h3>
          <span class="line"></span>
          <p>Sed quis nisi nisi. Proin consectetur porttitor dui sit amet viverra. Fusce sit amet lorem faucibus, vestibulum ante in, pharetra ante.</p>
        </div>
        <div class="section-content text-center">
          <div class="row">
            <div class="col-md-4">
              <div class="team-detail wow bounce" data-wow-delay="0.2s"> <img src="images/user1.jpg" class="img-fluid"/>
                <h4>Nitu Singh</h4>
                <p>Marketing Specialist</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-detail wow bounce" data-wow-delay="0.4s"> <img src="images/user2.jpg" class="img-fluid"/>
                <h4>Yogesh Singh</h4>
                <p>CEO & Founder</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-detail wow bounce" data-wow-delay="0.6s"> <img src="images/user3.jpg" class="img-fluid"/>
                <h4>Nisha Sharma</h4>
                <p>Web Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
);

export default Popular;