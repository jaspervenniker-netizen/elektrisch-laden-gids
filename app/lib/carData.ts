// app/lib/carData.ts

export interface CarData {
  id: string;
  name: string;
  batteryUsable: number; // in kWh
  // Consumption in Wh/km (from the 'Real Energy Consumption' table)
  cityMild: number;      // City - Mild Weather
  cityCold: number;      // City - Cold Weather
  combMild: number;      // Combined - Mild Weather
  combCold: number;      // Combined - Cold Weather
  highMild: number;      // Highway - Mild Weather
  highCold: number;      // Highway - Cold Weather
  chargeTime10to80: number; // minutes
  avgChargePower: number;   // Average kW
}

export const carDatabase: CarData[] = [
  {
    id: "volvo-xc40-p8-awd",
    name: "Volvo XC40 Recharge P8 AWD",
    batteryUsable: 75.0,
    cityMild: 153,
    cityCold: 217,
    combMild: 200,
    combCold: 263,
    highMild: 254,
    highCold: 319,
    chargeTime10to80: 31,
    avgChargePower: 108, 
  },
  {
    id: "volvo-xc40-recharge-single-motor",
    name: "Volvo XC40 Recharge Single Motor (231 PK)",
    batteryUsable: 67.0,
    cityMild: 134,
    cityCold: 195,
    combMild: 174,
    combCold: 232,
    highMild: 219,
    highCold: 277,
    chargeTime10to80: 32,
    avgChargePower: 110,
  },
  {
    id: "tesla-model-s-75d",
    name: "Tesla Model S 75D (Legacy)",
    batteryUsable: 72.5,
    cityMild: 134,
    cityCold: 196,
    combMild: 167,
    combCold: 227,
    highMild: 207,
    highCold: 264,
    chargeTime10to80: 40,
    avgChargePower: 80,
  },
  {
    id: "tesla-model-3-sr-plus-2019",
    name: "Tesla Model 3 Standard Range Plus",
    batteryUsable: 49.0,
    cityMild: 104,
    cityCold: 161,
    combMild: 132,
    combCold: 185,
    highMild: 163,
    highCold: 213,
    chargeTime10to80: 21,
    avgChargePower: 105,
  },
  {
    id: "polestar-2-lr-dm",
    name: "Polestar 2 (Long Range Dual Motor)",
    batteryUsable: 75.0,
    cityMild: 133,
    cityCold: 195,
    combMild: 169,
    combCold: 227,
    highMild: 208,
    highCold: 268,
    chargeTime10to80: 31,
    avgChargePower: 108,
  },
  {
    id: "fiat-500e-42",
    name: "Fiat 500e (42 kWh)",
    batteryUsable: 37.3,
    cityMild: 105,
    cityCold: 162,
    combMild: 138,
    combCold: 191,
    highMild: 173,
    highCold: 226,
    chargeTime10to80: 25,
    avgChargePower: 67,
  }
]