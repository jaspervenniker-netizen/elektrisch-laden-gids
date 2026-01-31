// app/lib/carData.ts

export interface CarData {
  id: string;
  name: string;
  batteryUsable: number;    // kWh
  
  // Gebruikt voor de Algemene Besparingscalculator (Gecombineerd)
  summer: number;           // Gecombineerd - Zomer (uit EV-DB)
  winter: number;           // Gecombineerd - Winter (uit EV-DB)
  
  // Gebruikt voor de Vakantieplanner (Snelweg 110-120 km/u)
  highway: number;          // Snelweg - Zomer (uit EV-DB)
  highwayWinter: number;    // Snelweg - Winter (uit EV-DB)
  
  chargeTime10to80: number; // Minuten
}

export const carDatabase: CarData[] = [
  { 
    id: "volvo_xc40_p8", 
    name: "Volvo XC40 Recharge (P8 AWD)", 
    batteryUsable: 75.0, 
    summer: 20.0,         // Gecombineerd Zomer
    winter: 26.3,         // Gecombineerd Winter
    highway: 25.4,        // Snelweg Zomer (Exact uit screenshot)
    highwayWinter: 31.9,  // Snelweg Winter (Exact uit screenshot)
    chargeTime10to80: 32 
  },
  { 
    id: "tesla_y_lr", 
    name: "Tesla Model Y (Long Range)", 
    batteryUsable: 75.0, 
    summer: 14.8, 
    winter: 19.3, 
    highway: 18.1, 
    highwayWinter: 22.8, 
    chargeTime10to80: 22 
  },
  { 
    id: "tesla_3_sr", 
    name: "Tesla Model 3 (Standard Range)", 
    batteryUsable: 57.5, 
    summer: 12.8, 
    winter: 17.5, 
    highway: 15.6, 
    highwayWinter: 19.8, 
    chargeTime10to80: 25 
  },
  { 
    id: "volvo_ex30_er", 
    name: "Volvo EX30 Single Motor ER", 
    batteryUsable: 64.0, 
    summer: 15.6, 
    winter: 20.8, 
    highway: 19.4, 
    highwayWinter: 25.1, 
    chargeTime10to80: 26 
  },
  { 
    id: "vw_id4_pro", 
    name: "Volkswagen ID.4 Pro", 
    batteryUsable: 77.0, 
    summer: 16.4, 
    winter: 21.3, 
    highway: 20.6, 
    highwayWinter: 26.5, 
    chargeTime10to80: 29 
  },
  { 
    id: "polestar_2_lrdm", 
    name: "Polestar 2 (LR Dual Motor)", 
    batteryUsable: 75.0, 
    summer: 16.8, 
    winter: 22.4, 
    highway: 20.7, 
    highwayWinter: 26.7, 
    chargeTime10to80: 28 
  },
  { 
    id: "tesla_s_75d", 
    name: "Tesla Model S 75D", 
    batteryUsable: 72.5, 
    summer: 16.8, 
    winter: 22.5, 
    highway: 21.4, 
    highwayWinter: 27.2, 
    chargeTime10to80: 40 
  },
];