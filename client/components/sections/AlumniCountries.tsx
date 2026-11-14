import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";

// Country name -> ISO code for flags
const countryFlags: Record<string, string> = {
  USA: "us",
  US: "us",
  UK: "gb",
  Canada: "ca",
  CANADA: "ca",
  Australia: "au",
  Germany: "de",
  Ireland: "ie",
  "New Zealand": "nz",
  Netherland: "nl",
  Netherlands: "nl",
  Lithuania: "lt",
};

// Year-wise country counts (aggregated from provided data)
const rawDataByYear: Record<string, Record<string, number>> = {
  "2010-12": { USA: 67, CANADA: 11, UK: 0 },
  "2011-13": { USA: 34, Australia: 3 },
  "2012-14": { USA: 44, Australia: 7 },
  "2013-15": { USA: 73, Australia: 12, Germany: 4, UK: 4 },
  "2014-16": { USA: 44, Australia: 28, UK: 5, Canada: 1 },
  "2015-17": {
    USA: 35,
    Australia: 28,
    UK: 5,
    Canada: 2,
    Ireland: 1,
    Germany: 1,
    Netherland: 1,
  },
  "2016-18": { USA: 33, Australia: 41, Canada: 1, UK: 3, "New Zealand": 1, Lithuania: 1 },
  "2017-19": { USA: 31, Australia: 34, UK: 6, Canada: 1, Germany: 1, Lithuania: 1, Netherlands: 1 },
  "2018-20": { USA: 45, Australia: 29, UK: 5, Canada: 0 },
  "2019-21": { USA: 35, Australia: 5, UK: 10, Ireland: 3, US: 5 },
  "2020-22": { USA: 21, Australia: 6, US: 4, UK: 0 },
  "2021-23": { USA: 39, Australia: 8, UK: 2 },
  "2022-24": { USA: 8, Australia: 12, Canada: 1, US: 1 },
  "2023-25": { USA: 7, Australia: 14, US: 1, Canada: 0 },
};

function normalizeCountry(name: string): string {
  switch (name) {
    case "CANADA":
      return "Canada";
    case "US":
      return "USA";
    case "Netherland":
      return "Netherlands";
    default:
      return name;
  }
}

function buildAllCountries(data: Record<string, Record<string, number>>): string[] {
  const set = new Set<string>();
  Object.values(data).forEach((byCountry) => {
    Object.keys(byCountry).forEach((c) => set.add(normalizeCountry(c)));
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function toYearData(
  year: string,
  allCountries: string[],
  data: Record<string, Record<string, number>>,
) {
  const counts = data[year] || {};
  return allCountries.map((c) => ({ country: c, count: counts[c] ?? counts[c as keyof typeof counts] ?? counts[Object.keys(counts).find((k) => normalizeCountry(k) === c) as keyof typeof counts] ?? 0 }));
}

export default function AlumniCountries() {
  const years = useMemo(() => Object.keys(rawDataByYear), []);
  const allCountries = useMemo(() => buildAllCountries(rawDataByYear), []);
  const [year, setYear] = useState<string>(years[0]);

  const chartData = useMemo(() => toYearData(year, allCountries, rawDataByYear), [year, allCountries]);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Alumni — Year-wise Countries</h2>
      <p className="text-sm text-muted-foreground">Click a year to view the country-wise distribution with flags.</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {years.map((y) => (
          <Button
            key={y}
            size="sm"
            variant={y === year ? "default" : "outline"}
            onClick={() => setYear(y)}
          >
            {y}
          </Button>
        ))}
      </div>

      <div className="mt-4 rounded-lg border bg-card p-4">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 24 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" angle={-30} textAnchor="end" interval={0} height={50} />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value: number) => [value, "Students"]} />
              <Bar dataKey="count" fill="#42a5f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-base font-medium text-center mt-6">Countries (selected year)</h3>
      <div className="mt-2 max-h-72 overflow-auto mx-auto border rounded-md p-3 bg-background w-full md:w-[480px]">
        {chartData.map((row) => {
          const code = countryFlags[row.country] || countryFlags[normalizeCountry(row.country)];
          return (
            <div key={row.country} className="flex items-center justify-between py-1.5 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                {code ? (
                  <img
                    src={`https://flagcdn.com/w20/${code}.png`}
                    alt={`${row.country} flag`}
                    className="h-[14px] w-5 rounded-sm border"
                    loading="lazy"
                  />
                ) : null}
                <span className="text-sm">{row.country}</span>
              </div>
              <span className="text-sm tabular-nums">{row.count}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
