import { useEffect, useState } from "react";
interface MenuItem {
  id: string;
  item: string;
  price: number;
  desc: string;
}

const Products = () => {
  const [data, setData] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/menu"
        );
        const data = await response.json();
        setData(data.menu);
      } catch (error) {
        console.error(error, "Something went wrong");
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main>
      <section className="hero">
        <h1>Products</h1>
        <ul>
          {data &&
            data.map((food, index) => (
              <li key={index}>
                {food.item} + {food.price}$ + {food.desc}
              </li>
            ))}{" "}
        </ul>
      </section>
    </main>
  );
};

export default Products;
