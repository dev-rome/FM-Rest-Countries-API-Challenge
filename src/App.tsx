import { useState, useEffect } from "react";
import type { Country } from "./types/country";
import { Navbar } from "./components/Navbar";
import { RegionDropDown } from "./components/RegionDropDown";
import { SearchInput } from "./components/SearchInput";
import { CountriesCard } from "./components/CountriesCard";

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3",
        );
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "" || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <main>
        <section className="mt-6 mb-8 px-4 md:my-12 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-2">
            <SearchInput value={searchTerm} onChange={handleSearchChange} />
            <RegionDropDown
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>
        </section>

        <section className="px-14 md:px-20">
          <div className="mx-auto max-w-7xl">
            {filteredCountries.length === 0 ? (
              <p className="text-center text-lg">No countries found!</p>
            ) : (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCountries.map((country) => (
                  <CountriesCard key={country.cca3} country={country} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
