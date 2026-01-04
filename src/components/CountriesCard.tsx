import type { Country } from "../types/country";

interface CountriesCardProps {
  country: Country;
}

export function CountriesCard({ country }: CountriesCardProps) {
  return (
    <div className="bg-surface mx-auto w-full max-w-[265px] rounded-sm shadow-[0_2px_9px_0_rgba(0,0,0,0.0532)]">
      <img
        src={country.flags.png}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        className="h-40 w-full object-cover"
      />
      <div className="p-6">
        <h2 className="mb-4 text-lg font-extrabold">{country.name.common}</h2>
        <p className="mb-1">
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p>
          <span className="font-semibold">Capital:</span>{" "}
          {country.capital?.[0] || "N/A"}
        </p>
      </div>
    </div>
  );
}
