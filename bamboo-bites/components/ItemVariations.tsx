import { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { TweakProps } from "@/interfaces";
import { SvgIcons } from "./SvgIcons";

interface MenuItemProps {
  variations: string[];
  setTweaks: (tweaks: TweakProps) => void;
}

const ItemVariations = ({ variations, setTweaks }: MenuItemProps) => {
  const [selectedProtein, setSelectedProtein] = useState<string>("");
  const variationsData = categorizeVariations(variations);

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    variationsData.allergens.reduce((acc: any, item) => {
      acc[item] = false;
      return acc;
    }, {})
  );

  const handleSelectProtein = (proteinName: string) => {
    setSelectedProtein(proteinName);
    updateTweaks(proteinName, checkedItems);
  };

  const handleToggleAllergen = (itemName: string) => {
    setCheckedItems((prev: any) => {
      const updatedCheckedItems = {
        ...prev,
        [itemName]: !prev[itemName],
      };
      updateTweaks(selectedProtein, updatedCheckedItems);
      return updatedCheckedItems;
    });
  };

  const updateTweaks = (
    protein: string,
    allergens: { [key: string]: boolean }
  ) => {
    setTweaks({ protein, allergens });
  };

  // Categorize variations on mount
  useEffect(() => {
    const variationsData = categorizeVariations(variations);
    setCheckedItems(
      variationsData.allergens.reduce((acc: any, item) => {
        acc[item] = false;
        return acc;
      }, {})
    );
  }, [variations]);

  function categorizeVariations(variations: string[]) {
    const proteins: string[] = [];
    const allergens: string[] = [];

    variations.forEach((variation) => {
      if (variation.toLowerCase().includes("free")) {
        allergens.push(variation);
      } else {
        proteins.push(variation);
      }
    });

    return { proteins, allergens };
  }

  const handleSvg = (item: string) => {
    switch (item.toLowerCase()) {
      case "vegan":
        return SvgIcons.VeganIcon;
      case "vegetarian":
        return SvgIcons.VegetarianIcon;

      case "beef":
        return SvgIcons.BeefIcon;

      case "pork":
        return SvgIcons.PorkIcon;

      case "salmon":
        return SvgIcons.SalmonIcon;
      case "chicken":
        return SvgIcons.ChickenIcon;

      case "tofu":
        return SvgIcons.TofuIcon;

      case "shrimp":
        return SvgIcons.ShrimpIcon;

      case "gluten free":
        return SvgIcons.GlutenFreeIcon;

      case "sesame free":
        return SvgIcons.SesameFreeIcon;

      case "soy free":
        return SvgIcons.SoyFreeIcon;

      case "egg free":
        return SvgIcons.EggFreeIcon;

      default:
        return null;
    }
  };

  return (
    <section className="variations-wrapper">
      {variationsData.proteins.length > 0 && (
        <ContentWrapper title="Variations" small>
          <ul className="variations-category">
            {variationsData.proteins.map((item) => (
              <li
                key={item}
                className="variationsItem"
                onClick={() => handleSelectProtein(item)}
              >
                <div>
                  {handleSvg(item)}
                  <p>{item}</p>
                </div>
                <input
                  type="radio"
                  name="protein"
                  value={item}
                  checked={selectedProtein === item}
                  onChange={() => handleSelectProtein(item)}
                  onClick={(e) => e.stopPropagation()}
                />
              </li>
            ))}
          </ul>
        </ContentWrapper>
      )}
      {variationsData.allergens.length > 0 && (
        <ContentWrapper title="Allergens" small>
          <ul className="variations-category">
            {variationsData.allergens.map((item) => (
              <li
                key={item}
                className="variationsItem"
                onClick={() => handleToggleAllergen(item)}
              >
                <div>
                  {handleSvg(item)}
                  <p>{item}</p>
                </div>
                <input
                  type="checkbox"
                  name={item}
                  value={item}
                  checked={checkedItems[item]}
                  onChange={() => handleToggleAllergen(item)}
                  onClick={(e) => e.stopPropagation()}
                />
              </li>
            ))}
          </ul>
        </ContentWrapper>
      )}
    </section>
  );
};

export default ItemVariations;
