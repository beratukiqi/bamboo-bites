import Image from "next/image";
import ContactForm from "../ContactForm";
import { SvgIcons } from "../SvgIcons";

const socials = [
  {
    path: "/facebook",
    Icon: SvgIcons.FacebookIcon,
  },
  {
    path: "/instagram",
    Icon: SvgIcons.InstagramIcon,
  },
  {
    path: "/snapchat",
    Icon: SvgIcons.SnapchatIcon,
  },
  {
    path: "/tiktok",
    Icon: SvgIcons.TikTokIcon,
  },
];

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
          <section className="phone">
            {SvgIcons.PhoneIcon}
            <p> (555) 123-4567</p>
          </section>
        </section>
        <section className="map">
          <Image
            width={200}
            height={200}
            className="about-img"
            src="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/mobile/map.png"
            alt="Bamboo Bites Street Map"
          />
        </section>
      </section>
      <h2 className="h2-contact">
        OPENING HOURS <br /> EVERY DAY 11 AM - 11 PM
      </h2>
      <section className="contact-form-container">
        <ContactForm />
      </section>
      <section className="social">
        <h3>Taste the Buzz on Social!</h3>
        <br />
        <section className="social-container">
          {socials.map((item) => (
            <a href={item.path}> {item.Icon} </a>
          ))}
        </section>
      </section>
    </section>
  );
};

export default ContactInfo;
