import { useEffect, useState } from "react";
import Image from "next/image";

const OrderStatus = ({ orderStatus }: { orderStatus: string }) => {

  const icons = {
    pending: "https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/ramen_white+1.png",
    cooking: "https://cdn-icons-png.flaticon.com/512/113/113339.png",
    done: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAkFBMVEUgv1X////t6+oAvEnx7O0VvlANvU0Au0UavlL7/vwAukEAuDv07fDY8d73/fnz+/bs+O/P7tdv0Yvk9ukpwVvc591Tx3FKxmui4LOX3Kp41JM/xWms5LsAtzSG15y+6Mjm6uVezH00w2LH69CO2aPO49Njy4Gw3Lv87/Z7z5HD4Mm838Ok27KL0ZyX1KW05sKKcg8YAAAKj0lEQVR4nO2da3eqOhCGkZAQEQQBQdF6wVuttv3//+7Etna3ksAkhMs6q+/5sNc+q7vwMLlMJpOJMfgfyej6BXTqD6av+oPpq/5g+qo/mL7qDwak4dgPoijyvMlu/f6+3k08j/018P1hY49sBGYcRN56Oc+2i5g4o285JF5ss/1y7UXBuInnaocZR5P3eZbEyLERwdT4JYoJsh0UJ+H8fRdpB9IL40+W+2NOGMYDxSMTskm+3V93gdbHa4Txd/MwJTbBZRw/iNiPLsK5Th5tMDtmEoyAIHdhgpmBdrreQQ/McLnNKZYk+TIQpnky09N9dMD4GcaPXV2Kh32HTEdrqw/jhSOkDnIXckKva5ixFzoaUD5xjpOara0WzNg7I00oHzh2Vg+nDoy3N2x9KDfZxr5OY1OHiZYLu0av54vai2XUPsw6tIlulJuIHa5VXVFFmGifI+1m+RRF8V7ROGowuy1tCOUmTLdqToEKzHBuKE32EjjGXmVYU4AJEv0d/1HUThRcAnmYCdE4tYiFyKRxmPHyqeEmdhd9Wso2NUmYYDVqvIl904xWkk1NDiYKW2lid6FQboyWgvGOjcyTJTRbKe9GBmaStMzC/IFEZhiQgOmAhdGkEjRwmMmiAxZGs4DTgGGiuBMWRhODRwEoTACNIDVAQ6A0QBgfdWSXTxpfJ4yftDq/PAolMBoQjN/uXMmhCUE0EJjxvsM29ikCWhJAYJZGa/6YSNRY6oHZLTobyP6JLACLz2oYb9t5I7uJANy0Shh/33HnvwvtKweBSph3zXE+ddnvdWG8pmMXcGGjqqFVwPjH3hiGmaZqtqmAeR91TfBTo4qGVg4T1dlD0i+Ky13OcpiwR43sJjtUh9k5Xb/9o5zSqbMMZpz2ZiS7C6dlPloZzKwXU/9vkZkaTNAHn+xROC0JDJbArHrIwmj2KjBR2sNWdos9iYdnMcy+l4YpNY0Qpieef1ElawEhzKzJjb6iKPxxVDigiWCiNmPkGNlxTG3gli85inqNCGbdomFQ/nq6vFxOmQH6gJSu5WD8VWteGSXnw8Zy2X+by7Y8g/BL9kqwFBDAeHFbYxmlbxvL/JBlTUPIY3EsGAL4MMNlWy4mRa/mF8sNZwPaNnGW/BwOPkzQ1lYMJfPnfyym6b7EgIZGBPvqfJhJSxEZimfP5i89g0ZRxN+z4cIM5+10f4xn7m8W0z1BvqMz57YzLozfjr9MjOuDXRjMAQJDFtzxjAvjtdL9SXx9tAsbAqagRuFwxzMuzLwNGJJfCyg3GFB3dbguDRemja1Ykp9MqwjjXkAwJIXCjFsIlglYzOcz7EM+8WIBPJhd8zA4PvFQWCvLYT7hiBem4cFkjc8y2LgU+/5HKzsDx1F7BYRp3C/D8aUwJn8a5grdpMO8F+f8v6Bpw4hYLPMK/46I49FwYCYNT/8kfxGywIdRm+PRcGDmzVqGLF74/cW85hJTAuLMNByYrNFZBqUv3HHMlLIL+yacGDoHJlHt/xTwD1Hywkdx5VgMnEBgfMiKgvOWNs3zGFVkCTMW/vzy/Ca530jjoq9ZhIlUUhgwOp4O0+n0csZlPQ4lBwHLHLT6/wnD2eEswqzlUW4TOlvB32QeEvFgSFJtLEzFGE0RZin/a2l++B6g3Klwuw3nU+44ZrmvCiy0mIBShFGIMeOfg60rCrGQZMNnsVRYeDHnIkwmDYPOvyZBd8N1sJCIxXxTCjjiDAADCl39kjP93RPc6bn4qdGW38bMjew4docpTjRFmK3sr8aLR++E2eax35CjoL9sXtUOqxp4C4CRnjNRWHC1rM3598qbhFPBvP+qmmrAmTU1wNjnot9obVY/V3hIwGK5K+W0CQiM/H45yjhOMKP5bmmUZAIWK1MZx75girvoBRhfGoYU+sxXZ7jTiNqY9ZzVOIWH04I/U4AJ5DMZRhvuq5qvn/0GHbmhiw+7KKNwN9ELMJE8jM1rZx80tw9Pji6fxayXYIyL2846LGPYB8F0+EoxCi0+y6Zm3ARiGfk+w3r4QkiDhSznmqdWIX1mrLI2w6JlinndCOJjHCdB9pnVo5naQpOwxTD3rfkujDWtM47dYQqvrgmGucSipT23jYX14wwgGGnf7Ot3p6KgS9FaGx1JBiDfTN5r/vrlOZDGNbc6glkgrxka7S2IxPwxrciiJZaFzwCYubq3hA78EPLvNqYpw4jOATAKMYBvmlGlbaypljZmAGMAuzpPQBf+CP2P5agt+FvcodEUN7uL5pdSloM2FmoUc5s4EU3g3hVfOD+1wsI+GySiqR5r/hAR07gHXf3l9hxQrLnuLoBo69V0tfX9j8cUI008mFnNRxL+5qs71ZpdBNyfmdRNacDGqThCu9OF1k0s4M5Z/T1Nik6FUNpUcz6OzUkEaGi3efRgG/eg1y4GjjkvzoPRkZ85uv7sN9Yh1bxRavNStRvL0EDX7zHNsl60H/QGZ2hoyZ2hxuvBdC3Lct3pSX+W5AiaOzPQ8mxKkrfLy+Hwcg1h+coy4k2ZAhhNubMExWmSLFADxcMc7rntZjMBKcaKGxYVksgE9Pt5dOafSDFmJoQZznp3DPC3nBk8e3bg9d0y/Px5Qca5Tv9Wv9BWJuO8vbMASpI7CzDw8p6eOLsJ51KnNAb+vmenmn/KFtVsEJ5s6r6iiUiUkzVTDtNyjTkZievRCU8D9qDYDF8lJWiEMFF/z2kKj9CKT9DOezqe4WKMuRom6qJqXrVER7TKYXpqGk7wHwLj1wttNiNcVuqsrFLDsoftjJRV0yqtodG/XkOSsirbpdVNvPYKzQI1Kq1wVF53JuuZ82xzouVgmKBfbgA1yssEV9RqWverVpPIw4TB+H0qcFS3itYg6qbiLE9kUVXptLLy3LovhbQormhkkJqA856Yhszr1wRstzSIWOIyIDIwg0kf4psYUoQaUuH0Xe2sk07RuLJUIxBm2H23IfxqBgowg2HW8WxjZ6BbXIDFp0vOXrXBwt1aUoYZ6N/8gouAXxL4c0OZ062aWTgpP/VguqvdVladTRVm4HWz7iQJ/AYKiRsbOinfBinTrALT/r0gkixyt5y0Hk1HAIdMFWYQtDt72pJ3OcrBDMb7Nm8Gkr1SSxKGLdaeWuo45AniW9aDaeu6E4nLTWrADIKwmRSSn8IYduFEbZjBcJk3GxigOOenYDQAwxafIaRehqowDeUvbFOHGQSzRVO3NhpoMVO8XVcRhhkna+o+zUzNLHVgBsE6cbS3Newka/VLj9Vh2CA9ix2tbY068Uz90tZ6MINhtLc1+je2vYpUb2ytD8MUZbae2zUpsrM6VtEBc7vI0SB1px2KiSF7RWMjMLcUqDSuw4NxnO77cdf5TcP3MDXUrnVjNklDQTKcrPTAMHmzLMVI8vQ1RjjNZvVvbP+SNhjW2ibLVUIcBDQQ6/EoOS8nCg6lSBphmHxvPQtz9palTY51d/YjeThbexpJBrphmIaBt2MWitHIQeSRCROGMbJjZpGdF+jpKD+kHeamoR9Ek/VsdWSj3Ojp6WnEdPuDxOlxNVtPosDXDnJTIzCfGg7HY98Pgsib7HYTLwoC3x+Ph41gfKpBmPb1B9NX/cH0VX8wfdUfTF/1v4L5D4sqwV7o7/F5AAAAAElFTkSuQmCC"
  }

  let title, description, icon;
  
  switch (orderStatus) {
    case "pending":
      title = "We will handle your order shortly!";
      description = "Sit back, relax and enjoy our atmosphere";
      icon = icons.pending
      break;
    case "cooking":
      title = "Your food is being prepared";
      description = "Sit back and relax, your food will be done shortly";
      icon = icons.cooking
      break;
    default:
      title = "Your order is done!";
      description = "Enjoy your food!";
      icon = icons.done
        
  }

  const [pendingActive, setPendingActive] = useState(false);
  const [cookingActive, setCookingActive] = useState(false);
  const [doneActive, setDoneActive] = useState(false);

  useEffect(() => {
    switch (orderStatus) {
      case "pending":
        setPendingActive(true);
        setCookingActive(false);
        setDoneActive(false);
        break;
      case "cooking":
        setPendingActive(true);
        setCookingActive(true);
        setDoneActive(false);
        break;
      case "done":
        setPendingActive(true);
        setCookingActive(true);
        setDoneActive(true);
        break;
      default:
        setPendingActive(false);
        setCookingActive(false);
        setDoneActive(false);
    }
  }, [orderStatus]);

  return (
    <section className="order-status">
      <h3>{title}</h3>
      <p>{description}</p>
      <Image width={200} height={200} src={icon} alt="" />
      <section className="order-status__progress-bar">
        <div className={`circle ${pendingActive ? "active" : ""}`}>
          <p className={`${pendingActive ? "active" : ""}`}>Pending</p>
        </div>
        <div className={`circle ${cookingActive ? "active" : ""}`}>
          <p className={`${cookingActive ? "active" : ""}`}>Cooking</p>
        </div>
        <div className={`circle ${doneActive ? "active" : ""}`}>
          <p className={`${doneActive ? "active" : ""}`}>Ready</p>
        </div>
        <div
          className="line --completed"
          style={{
            width: `${(doneActive && "100%") || (cookingActive && "50%")}`,
          }}
        ></div>
        <div
          className="line --waiting"
          style={{
            width: `${
              doneActive
                ? "0%"
                : cookingActive
                ? "50%"
                : pendingActive
                ? "100%"
                : ""
            }`,
          }}
        ></div>
      </section>
    </section>
  );
};

export default OrderStatus;
