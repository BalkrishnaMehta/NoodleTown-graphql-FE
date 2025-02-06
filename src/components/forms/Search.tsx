import { useState, ChangeEvent, useEffect, useRef } from "react";
import { cities } from "../../utils/data";
import { findNearestPlace } from "../../utils/loc";
import styles from "../../styles/forms/Search.module.css";
import SearchResults from "../Home/SearchResults";

import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import errorToasting from "../../utils/errorToasting";
import { useLazyQuery } from "@apollo/client";
import { GET_SEARCH_RESULTS } from "../../apollo/graphql/queries/restaurantQueries";
import SearchResult from "../../models/SearchResult";

const Search = () => {
  const [city, setCity] = useState("Ahmedabad");
  const [showResult, setShowResult] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchData, { error, data }] = useLazyQuery<
    { searchItems: SearchResult[] },
    { city: string; query: string }
  >(GET_SEARCH_RESULTS, {
    fetchPolicy: "network-only",
  });

  const searchResults: SearchResult[] = debouncedQuery
    ? data?.searchItems || []
    : [];

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const nearest_city = findNearestPlace(
        cities,
        pos.coords.latitude,
        pos.coords.longitude
      );
      setCity(nearest_city.name);
    });
  }, []);

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    if (debouncedQuery) {
      searchData({
        variables: { query: debouncedQuery, city: e.target.value },
      });
    }
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 500);
  };

  useEffect(() => {
    if (debouncedQuery) {
      searchData({ variables: { query: debouncedQuery, city } });
    }
  }, [debouncedQuery, city, searchData]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResult(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const resultsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate="visible"
      className={`col ${styles.search_container}`}>
      <motion.div
        variants={searchBarVariants}
        className={`row align-center gap-1 ${styles.search_bar} ${
          searchResults.length > 0 && showResult && styles.border_bottom_none
        }`}>
        <motion.select
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          name="city"
          id="cities"
          value={city}
          onChange={handleCityChange}>
          {cities.map((city) => (
            <option value={city.name} key={city.name}>
              {city.name}
            </option>
          ))}
        </motion.select>
        <div className={styles.divider}></div>
        <div className={styles.search_input_container}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="search"
            id="search"
            placeholder="Search for restaurant, cuisine, place"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={() => setShowResult(true)}
          />

          <SearchIcon size={18} className={styles.search_icon} />

          {searchQuery && (
            <X
              size={18}
              className={styles.cross_icon}
              onClick={() => {
                setSearchQuery("");
                setDebouncedQuery("");
              }}
            />
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {searchResults.length > 0 && showResult && (
          <motion.div
            variants={resultsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.search_results}>
            <SearchResults results={searchResults} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Search;
