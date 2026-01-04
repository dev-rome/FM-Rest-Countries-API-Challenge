export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { common: string }>;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  cca3: string;
}
