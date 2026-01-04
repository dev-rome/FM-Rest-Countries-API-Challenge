import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

export function RegionDropDown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const regions = [
    { value: "Africa", label: "Africa" },
    { value: "America", label: "America" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  const handleSelect = (value: string) => {
    setSelectedRegion(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayText =
    regions.find((r) => r.value === selectedRegion)?.label ||
    "Filter by Region";

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[200px]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-surface flex w-full items-center justify-between rounded-sm px-6 py-5 text-left shadow-[0_2px_9px_0_rgba(0,0,0,0.0532)] lg:cursor-pointer"
      >
        <span>{displayText}</span>
        <FaAngleDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="bg-surface absolute top-full right-0 left-0 z-10 mt-2 rounded-sm py-4 shadow-[0_2px_9px_0_rgba(0,0,0,0.0532)]">
          {regions.map((region) => (
            <button
              key={region.value}
              type="button"
              onClick={() => handleSelect(region.value)}
              className={`w-full px-6 py-1 text-left lg:cursor-pointer ${
                selectedRegion === region.value ? "font-semibold" : ""
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
