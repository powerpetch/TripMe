// Country Codes for phone numbers
export const COUNTRY_CODES = [
  { label: "+66 (Thailand)", value: "+66" },
  { label: "+1 (USA)", value: "+1" },
  { label: "+44 (UK)", value: "+44" },
  { label: "+81 (Japan)", value: "+81" },
  { label: "+86 (China)", value: "+86" },
  { label: "+91 (India)", value: "+91" },
  { label: "+61 (Australia)", value: "+61" },
  { label: "+49 (Germany)", value: "+49" },
];

// Countries for location selection
export const COUNTRIES = [
  { code: "TH", name: "Thailand" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
];

// Days for date of birth
export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// Months for date of birth
export const MONTHS = [
  { label: "Jan", value: "1" },
  { label: "Feb", value: "2" },
  { label: "Mar", value: "3" },
  { label: "Apr", value: "4" },
  { label: "May", value: "5" },
  { label: "Jun", value: "6" },
  { label: "Jul", value: "7" },
  { label: "Aug", value: "8" },
  { label: "Sep", value: "9" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
];

// Years for date of birth
const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from(
  { length: CURRENT_YEAR - 1960 + 1 },
  (_, i) => 1960 + i
);