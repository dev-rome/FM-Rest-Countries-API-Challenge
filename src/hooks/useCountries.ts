import { useState, useEffect } from "react";
import type { Country } from "../types/country";

const COUNTRIES_URL =
  "https://restcountries.com/v3.1/independent?status=true";

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(COUNTRIES_URL);
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data: Country[] = await res.json();
        setCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);
  return { countries, isLoading, error };
}
