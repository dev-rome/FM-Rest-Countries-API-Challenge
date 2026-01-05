import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useCountries } from "../hooks/useCountries";
import type { Country } from "../types/country";
import { Navbar } from "../components/Navbar";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function CountryPage() {
  const { code } = useParams<{ code: string }>();
  const { countries, isLoading, error } = useCountries();

  const country: Country | undefined = useMemo(() => {
    return countries.find((country) => country.cca3 === code);
  }, [countries, code]);

  const nativeName = country?.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : country?.name.common;

  const borderCountries =
    country?.borders?.map((code) => {
      const match = countries.find((c) => c.cca3 === code);
      return match
        ? { code: match.cca3, name: match.name.common }
        : { code, name: code };
    }) ?? [];

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error}</div>;
  if (!country) return <div className="p-6">Country not found</div>;

  return (
    <>
      <Navbar />
      <main>
        <section className="mt-10 px-6 md:px-20 lg:mt-12">
          <div className="mx-auto max-w-7xl">
            <Link
              to="/"
              className="bg-surface mb-8 flex w-fit items-center gap-2 rounded-sm px-8 py-2 shadow-[0_2px_9px_0_rgba(0,0,0,0.0532)] lg:mb-12"
            >
              <FaLongArrowAltLeft />
              Back
            </Link>

            <div className="grid w-full grid-cols-1 gap-10 md:gap-14 xl:grid-cols-2">
              <img
                src={country.flags.png}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                className="aspect-3/2 w-full object-cover"
              />
              <div className="py-0 md:py-10">
                <h2 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl">
                  {country.name.common}
                </h2>
                <div className="mb-8 flex flex-col gap-8 md:mb-6 md:flex-row md:gap-32 xl:mb-16">
                  <div className="flex flex-col gap-2">
                    <p>
                      <span className="font-semibold">Native Name:</span>{" "}
                      {nativeName}
                    </p>
                    <p>
                      <span>Population:</span>{" "}
                      {country.population.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Region:</span>{" "}
                      {country.region}
                    </p>
                    <p>
                      <span className="font-semibold">Sub Region:</span>{" "}
                      {country.subregion ?? "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Capital:</span>{" "}
                      {country.capital?.join(", ") ?? "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>
                      <span className="font-semibold">Top Level Domain:</span>{" "}
                      {country.tld?.join(", ") ?? "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Currencies:</span>{" "}
                      {Object.values(country.currencies ?? {})
                        .map((c) => c.name)
                        .join(", ") || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Languages:</span>{" "}
                      {Object.values(country.languages ?? {}).join(", ") ||
                        "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mb-14 flex flex-wrap gap-2">
                  <span className="font-semibold">Border Countries:</span>{" "}
                  {borderCountries.length
                    ? borderCountries.map((border) => (
                        <Link
                          className="bg-surface shadow-[0_2px_9px_0_rgba(0,0,0,0.0532) rounded-xs px-6"
                          key={border.code}
                          to={`/country/${border.code}`}
                        >
                          {border.name}
                        </Link>
                      ))
                    : "None"}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
