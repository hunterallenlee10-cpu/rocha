/*
  Marque & Mile: the collection
  ------------------------------------------------------------
  Every card, filter, the Spectrum, the quick view and the finance
  form's "Vehicle of interest" list are built from this file.

  To update the floor: add, edit or remove an entry below.
  - tier is "marque" (luxury and performance) or "mile" (everyday)
  - type is one of: "suv", "sedan", "coupe" (coupes and convertibles),
    "truck", "hatch" (hatchbacks and wagons)
  - price / wasPrice are in dollars and include dealer fees
    (wasPrice is optional; set it to show a "Price drop" tag)
  - badge is optional ("Just arrived", "Manual", ...)
  - photo is a path under assets/cars/ (3:2, studio shot, named by stock number)

  This is a template: the dealership, the cars, prices and VINs are fictional
  and the photos are AI-generated illustrations.
*/
window.MM_INVENTORY_UPDATED = "2026-10-24";
window.MM_INVENTORY = [
  {
    stock: "MM-2412", year: 2021, make: "Lamborghini", model: "Urus", trim: "",
    tier: "marque", type: "suv", price: 214900, miles: 18420, color: "Arancio Borealis",
    engine: "4.0L twin-turbo V8", transmission: "8-speed automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "ZPBUA1ZLXK2DEG0D9", photo: "assets/cars/MM-2412.webp", badge: "Just arrived"
  },
  {
    stock: "MM-2431", year: 2022, make: "Honda", model: "Civic", trim: "Sport Sedan",
    tier: "mile", type: "sedan", price: 23490, miles: 21830, color: "Aegean Blue Metallic",
    engine: "2.0L I4", transmission: "CVT automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "2HGFE2F5PCF43ESF4", photo: "assets/cars/MM-2431.webp"
  },
  {
    stock: "MM-2406", year: 2023, make: "Porsche", model: "911", trim: "Carrera S",
    tier: "marque", type: "coupe", price: 142900, miles: 8940, color: "GT Silver Metallic",
    engine: "3.0L twin-turbo flat-6", transmission: "8-speed PDK", drivetrain: "RWD", fuel: "Gasoline",
    vin: "WP0AB2A9DHRD2DRCJ", photo: "assets/cars/MM-2406.webp"
  },
  {
    stock: "MM-2427", year: 2022, make: "Toyota", model: "RAV4", trim: "XLE Premium AWD",
    tier: "mile", type: "suv", price: 29900, miles: 27410, color: "Lunar Rock",
    engine: "2.5L I4", transmission: "8-speed automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "2T3A1RFVV3KHWMGN0", photo: "assets/cars/MM-2427.webp"
  },
  {
    stock: "MM-2409", year: 2022, make: "Mercedes-AMG", model: "G 63", trim: "",
    tier: "marque", type: "suv", price: 172900, miles: 21300, color: "Polar White",
    engine: "4.0L twin-turbo V8", transmission: "9-speed automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "W1NYC7HJGEDP84X66", photo: "assets/cars/MM-2409.webp"
  },
  {
    stock: "MM-2422", year: 2022, make: "Ford", model: "F-150", trim: "XLT SuperCrew 4x4",
    tier: "mile", type: "truck", price: 41900, miles: 31560, color: "Antimatter Blue",
    engine: "3.5L EcoBoost V6", transmission: "10-speed automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "1FTFW1E80WSMSFW8Y", photo: "assets/cars/MM-2422.webp"
  },
  {
    stock: "MM-2402", year: 2022, make: "Ferrari", model: "Roma", trim: "",
    tier: "marque", type: "coupe", price: 219500, miles: 6180, color: "Rosso Portofino",
    engine: "3.9L twin-turbo V8", transmission: "8-speed dual-clutch", drivetrain: "RWD", fuel: "Gasoline",
    vin: "ZFF98RNA5VEH93LYK", photo: "assets/cars/MM-2402.webp"
  },
  {
    stock: "MM-2425", year: 2023, make: "Tesla", model: "Model 3", trim: "Long Range AWD",
    tier: "mile", type: "sedan", price: 31900, miles: 18240, color: "Pearl White",
    engine: "Dual-motor electric", transmission: "Single-speed", drivetrain: "AWD", fuel: "Electric",
    vin: "5YJ3E1EB83CEXYZ86", photo: "assets/cars/MM-2425.webp"
  },
  {
    stock: "MM-2404", year: 2021, make: "Bentley", model: "Continental GT", trim: "V8",
    tier: "marque", type: "coupe", price: 189900, miles: 14820, color: "British Racing Green",
    engine: "4.0L twin-turbo V8", transmission: "8-speed dual-clutch", drivetrain: "AWD", fuel: "Gasoline",
    vin: "SCBCG2ZGEFU7EDW5V", photo: "assets/cars/MM-2404.webp"
  },
  {
    stock: "MM-2424", year: 2022, make: "Jeep", model: "Wrangler", trim: "Unlimited Sahara",
    tier: "mile", type: "suv", price: 38900, wasPrice: 40900, miles: 26310, color: "Firecracker Red",
    engine: "3.6L V6", transmission: "8-speed automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "1C4HJXEN1ZB6ZLH8D", photo: "assets/cars/MM-2424.webp"
  },
  {
    stock: "MM-2408", year: 2023, make: "Land Rover", model: "Range Rover", trim: "SE P400",
    tier: "marque", type: "suv", price: 129900, miles: 12140, color: "Carpathian Grey",
    engine: "3.0L turbo I6 mild hybrid", transmission: "8-speed automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "SALKP9E7PVJS228FL", photo: "assets/cars/MM-2408.webp"
  },
  {
    stock: "MM-2428", year: 2020, make: "Mazda", model: "MX-5 Miata", trim: "Club",
    tier: "mile", type: "coupe", price: 25900, miles: 22180, color: "Soul Red Crystal",
    engine: "2.0L I4", transmission: "6-speed manual", drivetrain: "RWD", fuel: "Gasoline",
    vin: "JM1NDAD752UJ4U3Z1", photo: "assets/cars/MM-2428.webp", badge: "Manual"
  },
  {
    stock: "MM-2411", year: 2023, make: "Porsche", model: "Taycan", trim: "4S",
    tier: "marque", type: "sedan", price: 89900, miles: 15420, color: "Frozen Blue Metallic",
    engine: "Dual-motor electric", transmission: "2-speed automatic", drivetrain: "AWD", fuel: "Electric",
    vin: "WP0AB2Y1RKFMKRRA8", photo: "assets/cars/MM-2411.webp", badge: "Just arrived"
  },
  {
    stock: "MM-2429", year: 2023, make: "Toyota", model: "Camry", trim: "SE",
    tier: "mile", type: "sedan", price: 26900, miles: 19650, color: "Celestial Silver",
    engine: "2.5L I4", transmission: "8-speed automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "4T1G11AKMTVAK30XJ", photo: "assets/cars/MM-2429.webp"
  },
  {
    stock: "MM-2407", year: 2022, make: "Aston Martin", model: "Vantage", trim: "",
    tier: "marque", type: "coupe", price: 112900, miles: 9610, color: "Lime Essence",
    engine: "4.0L twin-turbo V8", transmission: "8-speed automatic", drivetrain: "RWD", fuel: "Gasoline",
    vin: "SCFSMGAW9D62222G7", photo: "assets/cars/MM-2407.webp"
  },
  {
    stock: "MM-2423", year: 2020, make: "Toyota", model: "4Runner", trim: "TRD Off-Road",
    tier: "mile", type: "suv", price: 39900, miles: 41820, color: "Army Green",
    engine: "4.0L V6", transmission: "5-speed automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "JTEBU5JR2DNEP5LHY", photo: "assets/cars/MM-2423.webp"
  },
  {
    stock: "MM-2410", year: 2022, make: "Lexus", model: "LC 500", trim: "Convertible",
    tier: "marque", type: "coupe", price: 92500, miles: 11830, color: "Flare Yellow",
    engine: "5.0L V8", transmission: "10-speed automatic", drivetrain: "RWD", fuel: "Gasoline",
    vin: "JTHKPAAYDGAKG0BEP", photo: "assets/cars/MM-2410.webp"
  },
  {
    stock: "MM-2430", year: 2021, make: "Subaru", model: "Outback", trim: "Premium",
    tier: "mile", type: "hatch", price: 24900, miles: 38240, color: "Autumn Green Metallic",
    engine: "2.5L flat-4", transmission: "CVT automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "4S4BTAFC1KTZ07HH8", photo: "assets/cars/MM-2430.webp"
  },
  {
    stock: "MM-2405", year: 2021, make: "Mercedes-Benz", model: "S 580", trim: "4MATIC",
    tier: "marque", type: "sedan", price: 84900, wasPrice: 89900, miles: 24310, color: "Obsidian Black",
    engine: "4.0L twin-turbo V8 mild hybrid", transmission: "9-speed automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "W1KG6FB1677WFKGYT", photo: "assets/cars/MM-2405.webp"
  },
  {
    stock: "MM-2432", year: 2019, make: "Volkswagen", model: "Golf GTI", trim: "SE",
    tier: "mile", type: "hatch", price: 21900, miles: 44720, color: "Pure White",
    engine: "2.0L turbo I4", transmission: "6-speed manual", drivetrain: "FWD", fuel: "Gasoline",
    vin: "3VW6T7AU7LBP0KBWF", photo: "assets/cars/MM-2432.webp", badge: "Manual"
  },
  {
    stock: "MM-2413", year: 2022, make: "BMW", model: "M4", trim: "Competition",
    tier: "marque", type: "coupe", price: 72900, miles: 16750, color: "Brooklyn Grey",
    engine: "3.0L twin-turbo I6", transmission: "8-speed automatic", drivetrain: "RWD", fuel: "Gasoline",
    vin: "WBS33AZ0T0LZR9YRN", photo: "assets/cars/MM-2413.webp"
  },
  {
    stock: "MM-2433", year: 2017, make: "Toyota", model: "Prius", trim: "Two",
    tier: "mile", type: "hatch", price: 16900, miles: 71240, color: "Sea Glass Pearl",
    engine: "1.8L I4 hybrid", transmission: "CVT automatic", drivetrain: "FWD", fuel: "Hybrid",
    vin: "JTDKARFUS2RN8ZBBU", photo: "assets/cars/MM-2433.webp"
  },
  {
    stock: "MM-2401", year: 2020, make: "Rolls-Royce", model: "Wraith", trim: "",
    tier: "marque", type: "coupe", price: 229900, miles: 11240, color: "Salamanca Blue",
    engine: "6.6L twin-turbo V12", transmission: "8-speed automatic", drivetrain: "RWD", fuel: "Gasoline",
    vin: "SCA665C57TNZ5Z0FR", photo: "assets/cars/MM-2401.webp"
  },
  {
    stock: "MM-2434", year: 2018, make: "Honda", model: "Fit", trim: "Sport",
    tier: "mile", type: "hatch", price: 12900, wasPrice: 13900, miles: 52410, color: "Orange Fury",
    engine: "1.5L I4", transmission: "CVT automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "3HGGK5H8GR7NYP7A7", photo: "assets/cars/MM-2434.webp"
  }
];
