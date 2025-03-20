import React from "react";
import '../../App.css';

const Tips = () => (
  <section className="faq section-padding prelative" data-scroll-index='5'>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="text-4xl sectioner-header text-center">
            <h3>Essential Travel Tips</h3>
            <span className="line"></span>
            <p>Make your journey safer, smoother, and more enjoyable with these practical travel tips.</p>
          </div>
          <div className="section-content">
            <div className="row">
              <div className="col-md-6 faq-content wow fadeInUp" data-wow-delay="0.2s">
                <h4>How should I protect my valuables while traveling?</h4>
                <p>Keep important documents and valuables in your hotel safe. Carry a photocopy of your passport instead of the original. Use anti-theft bags and keep your belongings close, especially in crowded areas.</p>
              </div>
              <div className="col-md-6 faq-content wow fadeInUp" data-wow-delay="0.2s">
                <h4>What's the best way to handle money abroad?</h4>
                <p>Inform your bank about travel plans to avoid card blocks. Use multiple payment methods (cash, cards). Get some local currency before arrival. Use ATMs inside banks for better security.</p>
              </div>
              <div className="col-md-6 faq-content wow fadeInUp" data-wow-delay="0.4s">
                <h4>How can I stay healthy while traveling?</h4>
                <p>Stay hydrated, especially during flights. Pack basic medications. Be cautious with street food. Get travel insurance that covers medical emergencies. Research local healthcare options before your trip.</p>
              </div>
              <div className="col-md-6 faq-content wow fadeInUp" data-wow-delay="0.4s">
                <h4>What should I pack for an international trip?</h4>
                <p>Pack versatile clothing layers. Bring universal power adapters, portable chargers, and essential medications. Download offline maps and important documents. Consider local weather and cultural dress codes.</p>
              </div>
              <div className="col-md-6 faq-content wow fadeInUp" data-wow-delay="0.6s">
                <h4>How can I save money while traveling?</h4>
                <p>Book flights and accommodations in advance. Use public transportation when safe. Look for free walking tours and local markets. Consider staying in hostels or using home-sharing services. Travel during off-peak seasons.</p>
              </div>
              <div className="col-md-6 faq-content wow fadeInUp" data-wow-delay="0.6s">
                <h4>How do I overcome language barriers?</h4>
                <p>Learn basic local phrases. Download offline translation apps. Keep important phrases saved on your phone. Use visual communication when needed. Consider hiring local guides for complex situations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Tips;