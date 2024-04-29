"use client";

import { useEffect, useState } from "react";
import styles from "./filters.module.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Filters = ({ options }) => {
  const [selectedProps, setSelectedProps] = useState({
    sectors: [],
    countries: [],
    cities: [],
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCheckboxChange = (type, value) => {
    if (selectedProps[type].indexOf(value) > -1) {
      const filteredValues = selectedProps[type].filter(
        (prop) => prop !== value
      );
      setSelectedProps({ ...selectedProps, [type]: filteredValues });
    } else {
      setSelectedProps({
        ...selectedProps,
        [type]: [...selectedProps[type], value],
      });
    }
  };

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (selectedProps.cities.length) {
      current.set("cities", selectedProps.cities.join(","));
    } else {
      current.delete("cities");
    }
    if (selectedProps.sectors.length) {
      current.set("sectors", selectedProps.sectors.join(","));
    } else {
      current.delete("sectors");
    }
    if (selectedProps.countries.length) {
      current.set("countries", selectedProps.countries.join(","));
    } else {
      current.delete("countries");
      current.delete("cities");
    }
    const query = current.toString() ? `?${current.toString()}` : "";

    router.push(`${pathname}${query}`);
  }, [selectedProps]);

  return (
    <div
      className={`${styles.filtersContainer} ${
        isFilterOpen ? styles.openedFilter : ""
      }`}
    >
      <div
        className={styles.filterSlider}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        Filter
      </div>
      <div className={styles.filtersWrapper}>
        <div className={styles.filterGroup}>
          <h3>Sectors</h3>
          {options.sectors.map((sector) => (
            <label className={styles.checkbox} key={sector}>
              <input
                type="checkbox"
                value={sector}
                onChange={() => handleCheckboxChange("sectors", sector)}
              />
              {sector}
            </label>
          ))}
        </div>
        <div className={styles.filterGroup}>
          <h3>Countries</h3>
          {Object.keys(options.countries).map((country) => (
            <label className={styles.checkbox} key={country}>
              <input
                type="checkbox"
                value={country}
                onChange={() => handleCheckboxChange("countries", country)}
              />
              {country}
            </label>
          ))}
        </div>
        {!!selectedProps.countries.length && (
          <div className={styles.filterGroup}>
            <h3>Cities</h3>
            {selectedProps.countries.map((country) =>
              options.countries[country].map((city) => {
                return (
                  <label className={styles.checkbox} key={city}>
                    <input
                      type="checkbox"
                      value={city}
                      onChange={() => handleCheckboxChange("cities", city)}
                    />
                    {city}
                  </label>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
