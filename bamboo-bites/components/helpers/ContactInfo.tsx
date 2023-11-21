const ContactInfo = () => {
  return (
    <section className="contact-container">
      <h2 className="h2-contact">WHERE TO FIND US</h2>
        <section className="address-map-container">
          <section className="address">
            <h3>BAMBOO BITES</h3>
            <br />
            <p>123 SUSHI STREET</p>
            <p>BROOKLYN, NY 11234 </p>
            <br />
            <p>PHONE ICON + (555) 123-4567</p>
          </section>
          <section className="map">
          <img className="about-img" src="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/mobile/map.png" alt="Bamboo Bites Street Map" />
          </section>
        </section>
        <h2 className="h2-contact">OPENING HOURS <br /> EVERY DAY 11 AM - 11 PM</h2>
        <section className="contact-form">
          <h3 className="h3-contact">Reach Out, We're Friendly!</h3>
          <p>CONTACT FORM</p>
        </section>
        <section className="social">
          <h3 className="h3-contact">Taste the Buzz on Social!</h3>
          <br />
          <p>SoMe ICONS HERE</p>
          
        </section>
    </section>
  );
};

export default ContactInfo;
