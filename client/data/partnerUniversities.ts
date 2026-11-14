/**
 * Partner universities shown on the Transfer page map.
 *
 * `alumniCohorts` holds aggregate counts only (no personal details) of
 * ICAS students who transferred to each partner through the 2+2 pathway.
 */

export interface PartnerUniversity {
  id: string;
  name: string;
  location: string;
  lat: number;
  lon: number;
}

export interface AlumniCohort {
  total: number;
  cs: number;
  mech: number;
  other: number;
  /** First year of the earliest cohort, if known. */
  firstCohort: number | null;
  /** Final year of the most recent cohort, if known. */
  latestCohort: number | null;
}

export const partnerUniversities: PartnerUniversity[] = [
  {
    "id": "msoe",
    "name": "Milwaukee School of Engineering",
    "location": "Milwaukee, WI, USA",
    "lat": 43.045,
    "lon": -87.906
  },
  {
    "id": "andrews",
    "name": "Andrews University",
    "location": "Berrien Springs, Michigan, USA",
    "lat": 41.9475,
    "lon": -86.3597
  },
  {
    "id": "ndsu",
    "name": "North Dakota State University",
    "location": "Fargo, North Dakota, USA",
    "lat": 46.897,
    "lon": -96.802
  },
  {
    "id": "suny-buffalo",
    "name": "University at Buffalo (SUNY)",
    "location": "Buffalo, NY, USA",
    "lat": 43.0008,
    "lon": -78.789
  },
  {
    "id": "missouri",
    "name": "University of Missouri",
    "location": "Columbia, MO, USA",
    "lat": 38.9456,
    "lon": -92.3295
  },
  {
    "id": "drexel",
    "name": "Drexel University",
    "location": "Philadelphia, PA, USA",
    "lat": 39.9566,
    "lon": -75.1899
  },
  {
    "id": "dayton",
    "name": "University of Dayton",
    "location": "Dayton, Ohio, USA",
    "lat": 39.7392,
    "lon": -84.179
  },
  {
    "id": "wright-state",
    "name": "Wright State University",
    "location": "Dayton, Ohio, USA",
    "lat": 39.7793,
    "lon": -84.0646
  },
  {
    "id": "siu",
    "name": "Southern Illinois University Carbondale",
    "location": "Carbondale, IL, USA",
    "lat": 37.715,
    "lon": -89.219
  },
  {
    "id": "uwm",
    "name": "University of Wisconsin-Milwaukee",
    "location": "Milwaukee, WI, USA",
    "lat": 43.0753,
    "lon": -87.8828
  },
  {
    "id": "montana-state",
    "name": "Montana State University",
    "location": "Bozeman, Montana, USA",
    "lat": 45.6689,
    "lon": -111.0466
  },
  {
    "id": "unt",
    "name": "University of North Texas",
    "location": "Denton, Texas, USA",
    "lat": 33.2104,
    "lon": -97.1536
  },
  {
    "id": "iit",
    "name": "Illinois Institute of Technology",
    "location": "Chicago, IL, USA",
    "lat": 41.8349,
    "lon": -87.627
  },
  {
    "id": "uiuc",
    "name": "University of Illinois Urbana-Champaign",
    "location": "Urbana, IL, USA",
    "lat": 40.102,
    "lon": -88.2272
  },
  {
    "id": "uic",
    "name": "University of Illinois Chicago",
    "location": "Chicago, IL, USA",
    "lat": 41.8708,
    "lon": -87.6505
  },
  {
    "id": "scsu",
    "name": "St. Cloud State University",
    "location": "St. Cloud, MN, USA",
    "lat": 45.548,
    "lon": -94.149
  },
  {
    "id": "usa",
    "name": "University of South Alabama",
    "location": "Mobile, Alabama, USA",
    "lat": 30.6954,
    "lon": -88.1106
  },
  {
    "id": "purdue",
    "name": "Purdue University",
    "location": "West Lafayette, IN, USA",
    "lat": 40.4237,
    "lon": -86.9212
  },
  {
    "id": "uw-madison",
    "name": "University of Wisconsin-Madison",
    "location": "Madison, WI, USA",
    "lat": 43.0766,
    "lon": -89.4125
  },
  {
    "id": "umd",
    "name": "University of Maryland",
    "location": "College Park, MD, USA",
    "lat": 38.9869,
    "lon": -76.9426
  },
  {
    "id": "arizona",
    "name": "University of Arizona",
    "location": "Tucson, AZ, USA",
    "lat": 32.2319,
    "lon": -110.9501
  },
  {
    "id": "arizona-state",
    "name": "Arizona State University",
    "location": "Tempe, AZ, USA",
    "lat": 33.421999,
    "lon": -111.933
  },
  {
    "id": "iowa-state",
    "name": "Iowa State University",
    "location": "Ames, Iowa, USA",
    "lat": 42.0267,
    "lon": -93.6465
  },
  {
    "id": "nebraska",
    "name": "University of Nebraska-Lincoln",
    "location": "Lincoln, NE, USA",
    "lat": 40.8202,
    "lon": -96.7005
  },
  {
    "id": "virginia-tech",
    "name": "Virginia Tech",
    "location": "Blacksburg, VA, USA",
    "lat": 37.2296,
    "lon": -80.4244
  },
  {
    "id": "utd",
    "name": "University of Texas at Dallas",
    "location": "Richardson, TX, USA",
    "lat": 32.9858,
    "lon": -96.7501
  },
  {
    "id": "ohio-state",
    "name": "Ohio State University",
    "location": "Columbus, OH, USA",
    "lat": 40.0076,
    "lon": -83.0301
  },
  {
    "id": "penn-state",
    "name": "Pennsylvania State University",
    "location": "University Park, PA, USA",
    "lat": 40.7982,
    "lon": -77.8599
  },
  {
    "id": "rutgers",
    "name": "Rutgers University",
    "location": "New Brunswick, NJ, USA",
    "lat": 40.5007,
    "lon": -74.4479
  },
  {
    "id": "columbia",
    "name": "Columbia University",
    "location": "New York, NY, USA",
    "lat": 40.8075,
    "lon": -73.9626
  },
  {
    "id": "nyu",
    "name": "New York University",
    "location": "New York, NY, USA",
    "lat": 40.7295,
    "lon": -73.9965
  },
  {
    "id": "cornell",
    "name": "Cornell University",
    "location": "Ithaca, NY, USA",
    "lat": 42.4534,
    "lon": -76.4735
  },
  {
    "id": "boston",
    "name": "Boston University",
    "location": "Boston, MA, USA",
    "lat": 42.3505,
    "lon": -71.1054
  },
  {
    "id": "minnesota",
    "name": "University of Minnesota-Twin Cities",
    "location": "Minneapolis, MN, USA",
    "lat": 44.974,
    "lon": -93.227
  },
  {
    "id": "florida",
    "name": "University of Florida",
    "location": "Gainesville, Florida, USA",
    "lat": 29.648,
    "lon": -82.349
  },
  {
    "id": "vanderbilt",
    "name": "Vanderbilt University",
    "location": "Nashville, Tennessee, USA",
    "lat": 36.1447,
    "lon": -86.8027
  },
  {
    "id": "rochester",
    "name": "University of Rochester",
    "location": "Rochester, NY, USA",
    "lat": 43.128,
    "lon": -77.629
  },
  {
    "id": "case-western",
    "name": "Case Western Reserve University",
    "location": "Cleveland, OH, USA",
    "lat": 41.505,
    "lon": -81.608
  },
  {
    "id": "uc-berkeley",
    "name": "University of California-Berkeley",
    "location": "Berkeley, CA, USA",
    "lat": 37.871,
    "lon": -122.259
  },
  {
    "id": "massachusetts",
    "name": "University of Massachusetts",
    "location": "Amherst, MA, USA",
    "lat": 42.386,
    "lon": -72.53
  },
  {
    "id": "usc",
    "name": "University of Southern California",
    "location": "Los Angeles, CA, USA",
    "lat": 34.022,
    "lon": -118.285
  },
  {
    "id": "texas-am",
    "name": "Texas A & M University",
    "location": "College Station, TX, USA",
    "lat": 30.618,
    "lon": -96.336
  },
  {
    "id": "georgia-tech",
    "name": "Georgia Tech",
    "location": "Atlanta, GA, USA",
    "lat": 33.775,
    "lon": -84.396
  },
  {
    "id": "wichita-state",
    "name": "Wichita State University",
    "location": "Wichita, KS, USA",
    "lat": 37.719,
    "lon": -97.289
  },
  {
    "id": "embry-riddle",
    "name": "Embry-Riddle Aeronautical University",
    "location": "Daytona Beach, FL, USA",
    "lat": 29.186,
    "lon": -81.059
  },
  {
    "id": "south-dakota",
    "name": "South Dakota State University",
    "location": "Brookings, SD, USA",
    "lat": 44.316,
    "lon": -96.797
  },
  {
    "id": "stony-brook",
    "name": "Stony Brook University",
    "location": "Stony Brook, NY, USA",
    "lat": 40.914,
    "lon": -73.126
  },
  {
    "id": "cal-state",
    "name": "California State University, Long Beach",
    "location": "Long Beach, CA, USA",
    "lat": 33.784,
    "lon": -118.114
  },
  {
    "id": "washington-state",
    "name": "Washington State University",
    "location": "Pullman, WA, USA",
    "lat": 46.729,
    "lon": -117.181
  },
  {
    "id": "washington-seattle",
    "name": "University of Washington",
    "location": "Seattle, WA, USA",
    "lat": 47.655,
    "lon": -122.303
  },
  {
    "id": "kettering",
    "name": "Kettering University",
    "location": "Flint, MI, USA",
    "lat": 43.016,
    "lon": -83.705
  },
  {
    "id": "marquette",
    "name": "Marquette University",
    "location": "Milwaukee, WI, USA",
    "lat": 43.038,
    "lon": -87.929
  },
  {
    "id": "brown",
    "name": "Brown University",
    "location": "Providence, RI, USA",
    "lat": 41.826,
    "lon": -71.402
  },
  {
    "id": "colorado-boulder",
    "name": "University of Colorado Boulder",
    "location": "Boulder, CO, USA",
    "lat": 40.007,
    "lon": -105.266
  },
  {
    "id": "colorado-state",
    "name": "Colorado State University",
    "location": "Fort Collins, CO, USA",
    "lat": 40.575,
    "lon": -105.083
  },
  {
    "id": "san-jose",
    "name": "San Jose State University",
    "location": "San Jose, CA, USA",
    "lat": 37.336,
    "lon": -121.881
  },
  {
    "id": "north-florida",
    "name": "University of North Florida",
    "location": "Jacksonville, FL, USA",
    "lat": 30.268,
    "lon": -81.507
  },
  {
    "id": "san-francisco",
    "name": "San Francisco State University",
    "location": "San Francisco, CA, USA",
    "lat": 37.721,
    "lon": -122.479
  },
  {
    "id": "kansas-state",
    "name": "Kansas State University",
    "location": "Manhattan, KS, USA",
    "lat": 39.19,
    "lon": -96.58
  },
  {
    "id": "syracuse",
    "name": "Syracuse University",
    "location": "Syracuse, NY, USA",
    "lat": 43.038,
    "lon": -76.13
  },
  {
    "id": "uta",
    "name": "University of Texas at Arlington",
    "location": "Arlington, TX, USA",
    "lat": 32.735,
    "lon": -97.11
  },
  {
    "id": "northeastern",
    "name": "Northeastern University",
    "location": "Boston, MA, USA",
    "lat": 42.339,
    "lon": -71.089
  },
  {
    "id": "unc-charlotte",
    "name": "University of North Carolina at Charlotte",
    "location": "Charlotte, NC, USA",
    "lat": 35.305,
    "lon": -80.735
  },
  {
    "id": "mst",
    "name": "Missouri University of Science and Technology",
    "location": "Rolla, MO, USA",
    "lat": 37.951,
    "lon": -91.772
  },
  {
    "id": "indiana",
    "name": "Indiana University",
    "location": "Bloomington, IN, USA",
    "lat": 39.165,
    "lon": -86.526
  },
  {
    "id": "akron",
    "name": "University of Akron",
    "location": "Akron, OH, USA",
    "lat": 41.083,
    "lon": -81.512
  },
  {
    "id": "florida-tech",
    "name": "Florida Institute of Technology",
    "location": "Melbourne, FL, USA",
    "lat": 28.064,
    "lon": -80.623
  },
  {
    "id": "virginia-state",
    "name": "Virginia State University",
    "location": "Petersburg, VA, USA",
    "lat": 37.234,
    "lon": -77.427
  },
  {
    "id": "massachusetts-amherst",
    "name": "University of Massachusetts Amherst",
    "location": "Amherst, MA, USA",
    "lat": 42.386,
    "lon": -72.53
  },
  {
    "id": "deakin",
    "name": "Deakin University",
    "location": "Melbourne/Geelong, VIC, Australia",
    "lat": -37.8474,
    "lon": 144.9586
  },
  {
    "id": "uq",
    "name": "University of Queensland",
    "location": "Brisbane, QLD, Australia",
    "lat": -27.4975,
    "lon": 153.0137
  },
  {
    "id": "unsw",
    "name": "University of New South Wales",
    "location": "Sydney, NSW, Australia",
    "lat": -33.917,
    "lon": 151.231
  },
  {
    "id": "uts",
    "name": "University of Technology Sydney",
    "location": "Sydney, NSW, Australia",
    "lat": -33.883,
    "lon": 151.2
  },
  {
    "id": "qut",
    "name": "Queensland University of Technology",
    "location": "Brisbane, QLD, Australia",
    "lat": -27.478,
    "lon": 153.028
  },
  {
    "id": "rmit",
    "name": "RMIT University",
    "location": "Melbourne, VIC, Australia",
    "lat": -37.807,
    "lon": 144.963
  },
  {
    "id": "anu",
    "name": "Australian National University",
    "location": "Canberra, ACT, Australia",
    "lat": -35.277,
    "lon": 149.118
  },
  {
    "id": "usyd",
    "name": "University of Sydney",
    "location": "Sydney, NSW, Australia",
    "lat": -33.888,
    "lon": 151.187
  },
  {
    "id": "monash",
    "name": "Monash University",
    "location": "Clayton, VIC, Australia",
    "lat": -37.911,
    "lon": 145.134
  },
  {
    "id": "wollongong",
    "name": "University of Wollongong",
    "location": "Wollongong, NSW, Australia",
    "lat": -34.406,
    "lon": 150.88
  },
  {
    "id": "western-sydney",
    "name": "Western Sydney University",
    "location": "Sydney, NSW, Australia",
    "lat": -33.729,
    "lon": 150.999
  },
  {
    "id": "adelaide",
    "name": "University of Adelaide",
    "location": "Adelaide, SA, Australia",
    "lat": -34.92,
    "lon": 138.6
  },
  {
    "id": "macquarie",
    "name": "Macquarie University",
    "location": "Sydney, NSW, Australia",
    "lat": -33.774,
    "lon": 151.109
  },
  {
    "id": "federation",
    "name": "Federation University",
    "location": "Ballarat, VIC, Australia",
    "lat": -37.568,
    "lon": 143.85
  },
  {
    "id": "curtin",
    "name": "Curtin University",
    "location": "Perth, WA, Australia",
    "lat": -31.954,
    "lon": 115.87
  },
  {
    "id": "city-london",
    "name": "City, University of London",
    "location": "London, UK",
    "lat": 51.5273,
    "lon": -0.1025
  },
  {
    "id": "lancaster",
    "name": "Lancaster University",
    "location": "Lancaster, UK",
    "lat": 54.005,
    "lon": -2.785
  },
  {
    "id": "leicester",
    "name": "University of Leicester",
    "location": "Leicester, UK",
    "lat": 52.622,
    "lon": -1.125
  },
  {
    "id": "nottingham",
    "name": "University of Nottingham",
    "location": "Nottingham, UK",
    "lat": 52.938,
    "lon": -1.194
  },
  {
    "id": "birmingham",
    "name": "University of Birmingham",
    "location": "Birmingham, UK",
    "lat": 52.45,
    "lon": -1.93
  },
  {
    "id": "queen-mary",
    "name": "Queen Mary University of London",
    "location": "London, UK",
    "lat": 51.523,
    "lon": -0.043
  },
  {
    "id": "strathclyde",
    "name": "University of Strathclyde",
    "location": "Glasgow, UK",
    "lat": 55.862,
    "lon": -4.241
  },
  {
    "id": "heriot-watt",
    "name": "Heriot-Watt University",
    "location": "Edinburgh, UK",
    "lat": 55.912,
    "lon": -3.321
  },
  {
    "id": "edinburgh",
    "name": "University of Edinburgh",
    "location": "Edinburgh, UK",
    "lat": 55.944,
    "lon": -3.188
  },
  {
    "id": "london",
    "name": "University of London",
    "location": "London, UK",
    "lat": 51.521,
    "lon": -0.129
  },
  {
    "id": "uclan",
    "name": "University of Central Lancashire",
    "location": "Preston, UK",
    "lat": 53.76,
    "lon": -2.7
  },
  {
    "id": "manchester-met",
    "name": "Manchester Metropolitan University",
    "location": "Manchester, UK",
    "lat": 53.465,
    "lon": -2.233
  },
  {
    "id": "queens",
    "name": "Queen's University",
    "location": "Kingston, ON, Canada",
    "lat": 44.225,
    "lon": -76.495
  },
  {
    "id": "manitoba",
    "name": "University of Manitoba",
    "location": "Winnipeg, MB, Canada",
    "lat": 49.809,
    "lon": -97.137
  },
  {
    "id": "toronto",
    "name": "University of Toronto",
    "location": "Toronto, ON, Canada",
    "lat": 43.6629,
    "lon": -79.3957
  },
  {
    "id": "ubc",
    "name": "University of British Columbia",
    "location": "Vancouver, BC, Canada",
    "lat": 49.26,
    "lon": -123.251
  },
  {
    "id": "new-brunswick",
    "name": "University of New Brunswick",
    "location": "Fredericton, NB, Canada",
    "lat": 45.952,
    "lon": -66.643
  },
  {
    "id": "concordia",
    "name": "Concordia University",
    "location": "Montreal, QC, Canada",
    "lat": 45.497,
    "lon": -73.578
  },
  {
    "id": "carleton",
    "name": "University of Carleton",
    "location": "Ottawa, ON, Canada",
    "lat": 45.385,
    "lon": -75.698
  },
  {
    "id": "ucc",
    "name": "University College Cork (UCC)",
    "location": "Cork, Ireland",
    "lat": 51.892,
    "lon": -8.494
  },
  {
    "id": "tcd",
    "name": "Trinity College Dublin (TCD)",
    "location": "Dublin, Ireland",
    "lat": 53.343,
    "lon": -6.255
  },
  {
    "id": "esigelec",
    "name": "Ecole Superieure D’ingenieurs De Rouen (ESIGELEC)",
    "location": "Rouen, France",
    "lat": 49.429,
    "lon": 1.077
  },
  {
    "id": "leibniz",
    "name": "Leibniz University of Hannover",
    "location": "Hannover, Germany",
    "lat": 52.383,
    "lon": 9.715
  },
  {
    "id": "twente",
    "name": "University of Twente",
    "location": "Enschede, Netherlands",
    "lat": 52.242,
    "lon": 6.85
  },
  {
    "id": "groningen",
    "name": "Groningen University",
    "location": "Groningen, Netherlands",
    "lat": 53.219,
    "lon": 6.567
  },
  {
    "id": "academia-maribor",
    "name": "Academia Maribor Slovenia",
    "location": "Maribor, Slovenia",
    "lat": 46.559,
    "lon": 15.639
  },
  {
    "id": "manipal-miu",
    "name": "Manipal International University",
    "location": "Negeri Sembilan, Malaysia",
    "lat": 2.8,
    "lon": 101.81
  },
  {
    "id": "manipal-dubai",
    "name": "Manipal University, Dubai",
    "location": "Dubai, UAE",
    "lat": 25.074,
    "lon": 55.232
  }
];

export const alumniCohorts: Record<string, AlumniCohort> = {
  "uw-madison": {
    "total": 20,
    "cs": 14,
    "mech": 6,
    "other": 0,
    "firstCohort": 2018,
    "latestCohort": 2025
  },
  "uq": {
    "total": 5,
    "cs": 4,
    "mech": 1,
    "other": 0,
    "firstCohort": 2016,
    "latestCohort": 2018
  },
  "ohio-state": {
    "total": 24,
    "cs": 11,
    "mech": 10,
    "other": 3,
    "firstCohort": 2011,
    "latestCohort": 2024
  },
  "suny-buffalo": {
    "total": 29,
    "cs": 19,
    "mech": 7,
    "other": 3,
    "firstCohort": 2010,
    "latestCohort": 2023
  },
  "arizona-state": {
    "total": 7,
    "cs": 1,
    "mech": 3,
    "other": 3,
    "firstCohort": 2014,
    "latestCohort": 2022
  },
  "utd": {
    "total": 4,
    "cs": 3,
    "mech": 1,
    "other": 0,
    "firstCohort": 2018,
    "latestCohort": 2022
  },
  "uic": {
    "total": 6,
    "cs": 5,
    "mech": 1,
    "other": 0,
    "firstCohort": 2017,
    "latestCohort": 2022
  },
  "deakin": {
    "total": 1,
    "cs": 1,
    "mech": 0,
    "other": 0,
    "firstCohort": 2016,
    "latestCohort": 2018
  },
  "penn-state": {
    "total": 12,
    "cs": 9,
    "mech": 3,
    "other": 0,
    "firstCohort": 2014,
    "latestCohort": 2025
  },
  "rutgers": {
    "total": 23,
    "cs": 15,
    "mech": 6,
    "other": 2,
    "firstCohort": 2012,
    "latestCohort": 2024
  },
  "iowa-state": {
    "total": 5,
    "cs": 0,
    "mech": 4,
    "other": 1,
    "firstCohort": 2014,
    "latestCohort": 2020
  },
  "drexel": {
    "total": 13,
    "cs": 3,
    "mech": 3,
    "other": 7,
    "firstCohort": 2010,
    "latestCohort": 2017
  },
  "unt": {
    "total": 3,
    "cs": 0,
    "mech": 0,
    "other": 3,
    "firstCohort": 2014,
    "latestCohort": 2020
  },
  "uiuc": {
    "total": 15,
    "cs": 5,
    "mech": 3,
    "other": 7,
    "firstCohort": 2010,
    "latestCohort": 2020
  },
  "wisc-milwaukee": {
    "total": 1,
    "cs": 0,
    "mech": 0,
    "other": 1,
    "firstCohort": 2015,
    "latestCohort": 2017
  },
  "andrews": {
    "total": 4,
    "cs": 2,
    "mech": 1,
    "other": 1,
    "firstCohort": 2010,
    "latestCohort": 2020
  },
  "case-western": {
    "total": 1,
    "cs": 0,
    "mech": 0,
    "other": 1,
    "firstCohort": 2010,
    "latestCohort": 2012
  },
  "texas-am": {
    "total": 2,
    "cs": 0,
    "mech": 1,
    "other": 1,
    "firstCohort": 2010,
    "latestCohort": 2013
  },
  "minnesota": {
    "total": 3,
    "cs": 0,
    "mech": 0,
    "other": 3,
    "firstCohort": 2012,
    "latestCohort": 2016
  },
  "umd": {
    "total": 3,
    "cs": 2,
    "mech": 0,
    "other": 1,
    "firstCohort": 2012,
    "latestCohort": 2017
  },
  "stony-brook": {
    "total": 2,
    "cs": 1,
    "mech": 1,
    "other": 0,
    "firstCohort": 2012,
    "latestCohort": 2015
  },
  "south-dakota": {
    "total": 5,
    "cs": 2,
    "mech": 1,
    "other": 2,
    "firstCohort": 2011,
    "latestCohort": 2016
  },
  "uc-berkeley": {
    "total": 1,
    "cs": 0,
    "mech": 0,
    "other": 1,
    "firstCohort": 2011,
    "latestCohort": 2013
  },
  "wichita-state": {
    "total": 3,
    "cs": 0,
    "mech": 2,
    "other": 1,
    "firstCohort": 2013,
    "latestCohort": 2018
  },
  "purdue": {
    "total": 2,
    "cs": 1,
    "mech": 0,
    "other": 1,
    "firstCohort": 2013,
    "latestCohort": 2017
  },
  "unc-charlotte": {
    "total": 2,
    "cs": 1,
    "mech": 1,
    "other": 0,
    "firstCohort": 2019,
    "latestCohort": 2021
  },
  "usc": {
    "total": 4,
    "cs": 1,
    "mech": 2,
    "other": 1,
    "firstCohort": 2017,
    "latestCohort": 2021
  },
  "syracuse": {
    "total": 2,
    "cs": 1,
    "mech": 1,
    "other": 0,
    "firstCohort": 2019,
    "latestCohort": 2021
  },
  "northeastern": {
    "total": 2,
    "cs": 2,
    "mech": 0,
    "other": 0,
    "firstCohort": 2019,
    "latestCohort": 2021
  },
  "uta": {
    "total": 2,
    "cs": 2,
    "mech": 0,
    "other": 0,
    "firstCohort": 2019,
    "latestCohort": 2021
  },
  "florida": {
    "total": 1,
    "cs": 1,
    "mech": 0,
    "other": 0,
    "firstCohort": 2019,
    "latestCohort": 2021
  },
  "leibniz": {
    "total": 3,
    "cs": 0,
    "mech": 3,
    "other": 0,
    "firstCohort": 2015,
    "latestCohort": 2017
  },
  "concordia": {
    "total": 2,
    "cs": 2,
    "mech": 0,
    "other": 0,
    "firstCohort": 2014,
    "latestCohort": 2017
  },
  "new-brunswick": {
    "total": 2,
    "cs": 0,
    "mech": 2,
    "other": 0,
    "firstCohort": 2014,
    "latestCohort": 2017
  },
  "virginia-tech": {
    "total": 1,
    "cs": 0,
    "mech": 1,
    "other": 0,
    "firstCohort": 2016,
    "latestCohort": 2018
  },
  "san-jose": {
    "total": 1,
    "cs": 0,
    "mech": 0,
    "other": 1,
    "firstCohort": 2017,
    "latestCohort": 2019
  },
  "indiana": {
    "total": 3,
    "cs": 2,
    "mech": 1,
    "other": 0,
    "firstCohort": 2019,
    "latestCohort": 2023
  },
  "msoe": {
    "total": 4,
    "cs": 0,
    "mech": 3,
    "other": 1,
    "firstCohort": 2011,
    "latestCohort": 2018
  },
  "mst": {
    "total": 1,
    "cs": 1,
    "mech": 0,
    "other": 0,
    "firstCohort": 2023,
    "latestCohort": 2025
  }
};
