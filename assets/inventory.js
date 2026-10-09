/*
  Rocha Family Auto Sales — current inventory
  ------------------------------------------------------------
  To update the lot: add, edit, or remove an entry below.
  - price / wasPrice are in dollars and include dealer fees
    (wasPrice is optional — set it to show a "Price Drop" badge)
  - type is one of: "truck", "suv", "car", "wagon"
  - photo is a path under assets/inventory/
  - listing (optional) links to the full photo gallery
*/
window.ROCHA_INVENTORY_UPDATED = "2026-10-09";
window.ROCHA_INVENTORY = [
  {
    stock: "26111", year: 2017, make: "Jeep", model: "Cherokee", trim: "Latitude 4WD",
    type: "suv", price: 16190, miles: 60331, color: "Silver",
    engine: "2.4L I4", transmission: "9-Speed Automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "1C4PJMCB8HW651546", photo: "assets/inventory/26111.webp",
    listing: "https://www.cargurus.com/details/457326098"
  },
  {
    stock: "25130", year: 2011, make: "Ford", model: "F-150", trim: "Lariat SuperCrew 4WD",
    type: "truck", price: 14190, miles: 166745, color: "Red",
    engine: "3.5L V6", transmission: "6-Speed Automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "1FTFW1ET3BKD48478", photo: "assets/inventory/25130.webp",
    listing: "https://www.cargurus.com/details/429614489"
  },
  {
    stock: "26087", year: 2019, make: "RAM", model: "1500", trim: "Classic SLT Crew Cab 4WD",
    type: "truck", price: 13190, wasPrice: 14190, miles: 167097,
    engine: "5.7L V8", transmission: "8-Speed Automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "1C6RR7LT2KS644500", photo: "assets/inventory/26087.webp",
    listing: "https://www.cargurus.com/details/455511155"
  },
  {
    stock: "26100", year: 2001, make: "Ford", model: "F-250 Super Duty", trim: "Super Cab",
    type: "truck", price: 11190, wasPrice: 13190, miles: 183872,
    engine: "7.3L V8 Diesel", transmission: "Automatic", fuel: "Diesel",
    vin: "1FTNX20F01EA44876", photo: "assets/inventory/26100.webp",
    listing: "https://www.cargurus.com/details/455616801"
  },
  {
    stock: "25140", year: 2010, make: "BMW", model: "535i xDrive", trim: "Wagon AWD",
    type: "wagon", price: 10190, miles: 128121, color: "Gold",
    engine: "3.0L I6", transmission: "6-Speed Automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "WBAPT7C58ACX02926", photo: "assets/inventory/25140.webp",
    listing: "https://www.cargurus.com/details/460928662"
  },
  {
    stock: "26109", year: 2007, make: "Ford", model: "Explorer Sport Trac", trim: "Limited 4WD",
    type: "truck", price: 10190, miles: 132738, color: "Gray",
    engine: "4.6L V8", transmission: "Automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "1FMEU53847UA66333", photo: "assets/inventory/26109.webp",
    listing: "https://www.cargurus.com/details/457339019"
  },
  {
    stock: "25076", year: 2001, make: "Ford", model: "F-350 Super Duty", trim: "XL Long Bed 4WD",
    type: "truck", price: 10190, miles: 148133, color: "White",
    engine: "6.8L V10", transmission: "Automatic", drivetrain: "4WD", fuel: "Gasoline",
    vin: "1FTSX31S91EC67132", photo: "assets/inventory/25076.webp",
    listing: "https://www.cargurus.com/details/419407666"
  },
  {
    stock: "26032", year: 2009, make: "Mercedes-Benz", model: "ML 320", trim: "BlueTEC 4MATIC",
    type: "suv", price: 10190, miles: 145981, color: "White",
    engine: "3.0L V6 Diesel", transmission: "7-Speed Automatic", drivetrain: "AWD", fuel: "Diesel",
    vin: "4JGBB25E89A472467", photo: "assets/inventory/26032.webp",
    listing: "https://www.cargurus.com/details/441932839"
  },
  {
    stock: "26091", year: 2012, make: "MINI", model: "Countryman", trim: "S ALL4 AWD",
    type: "suv", price: 10190, miles: 89554,
    engine: "1.6L I4", transmission: "6-Speed Automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "WMWZC5C52CWL57861", photo: "assets/inventory/26091.webp",
    listing: "https://www.cargurus.com/details/460657305"
  },
  {
    stock: "26120", year: 2008, make: "Nissan", model: "Altima", trim: "2.5 S",
    type: "car", price: 9190, miles: 160747,
    engine: "2.5L I4", transmission: "CVT", drivetrain: "FWD", fuel: "Gasoline",
    vin: "1N4AL21E58N501178", photo: "assets/inventory/26120.webp",
    listing: "https://www.cargurus.com/details/460928661"
  },
  {
    stock: "26011", year: 2014, make: "Volkswagen", model: "Passat", trim: "TDI SE with Sunroof",
    type: "car", price: 8190, miles: 156045, color: "Gray",
    engine: "2.0L I4 Diesel", transmission: "6-Speed Dual Clutch", drivetrain: "FWD", fuel: "Diesel",
    vin: "1VWBN7A34EC052391", photo: "assets/inventory/26011.webp",
    listing: "https://www.cargurus.com/details/460928663"
  },
  {
    stock: "26106", year: 2012, make: "Ford", model: "Escape", trim: "XLT AWD",
    type: "suv", price: 8190, miles: 149403, color: "Gray",
    engine: "2.5L I4", transmission: "6-Speed Automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "1FMCU9D78CKA69777", photo: "assets/inventory/26106.webp",
    listing: "https://www.cargurus.com/details/458371688"
  },
  {
    stock: "26103", year: 2009, make: "Toyota", model: "Sienna", trim: "LE 8-Passenger",
    type: "wagon", price: 7190, wasPrice: 8190, miles: 158755, color: "Silver",
    engine: "3.5L V6", transmission: "5-Speed Automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "5TDZK23C29S278265", photo: "assets/inventory/26103.webp",
    listing: "https://www.cargurus.com/details/456200142"
  },
  {
    stock: "26101", year: 2006, make: "BMW", model: "330Ci", trim: "Coupe RWD",
    type: "car", price: 7190, wasPrice: 8190, miles: 124221, color: "Black",
    engine: "3.0L I6", transmission: "Automatic", drivetrain: "RWD", fuel: "Gasoline",
    vin: "WBABD53466PL18386", photo: "assets/inventory/26101.webp",
    listing: "https://www.cargurus.com/details/455874419"
  },
  {
    stock: "26086", year: 2013, make: "Hyundai", model: "Elantra GT", trim: "GLS",
    type: "car", price: 6190, miles: 157626,
    transmission: "6-Speed Automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "KMHD35LE0DU057984", photo: "assets/inventory/26086.webp",
    listing: "https://www.cargurus.com/details/459860323"
  },
  {
    stock: "26015", year: 2008, make: "Subaru", model: "Outback", trim: "2.5i Limited",
    type: "wagon", price: 5190, miles: 255980, color: "Gold",
    engine: "2.5L H4", transmission: "4-Speed Automatic", drivetrain: "AWD", fuel: "Gasoline",
    vin: "4S4BP62C987325095", photo: "assets/inventory/26015.webp",
    listing: "https://www.cargurus.com/details/441932842"
  },
  {
    stock: "26036", year: 2012, make: "Ford", model: "Fusion", trim: "SEL V6",
    type: "car", price: 5190, miles: 174834, color: "White",
    engine: "3.0L V6 Flex Fuel", transmission: "6-Speed Automatic", drivetrain: "FWD", fuel: "Flex Fuel",
    vin: "3FAHP0JG4CR109761", photo: "assets/inventory/26036.webp",
    listing: "https://www.cargurus.com/details/447769284"
  },
  {
    stock: "25124", year: 2011, make: "Ford", model: "Fusion", trim: "SE",
    type: "car", price: 5190, miles: 190922, color: "Silver",
    engine: "2.5L I4", transmission: "6-Speed Automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "3FAHP0HA2BR167495", photo: "assets/inventory/25124.webp",
    listing: "https://www.cargurus.com/details/452639309"
  },
  {
    stock: "26113", year: 2000, make: "Chrysler", model: "300M", trim: "",
    type: "car", price: 4190, miles: 170490,
    engine: "3.5L V6", transmission: "Automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "2C3HE66G4YH338086", photo: "assets/inventory/26113.webp",
    listing: "https://www.cargurus.com/details/458478406"
  },
  {
    stock: "26066", year: 1999, make: "Mazda", model: "626", trim: "ES V6",
    type: "car", price: 4190, miles: 193311,
    engine: "2.5L V6", transmission: "Automatic", drivetrain: "FWD", fuel: "Gasoline",
    vin: "1YVGF22D7X5815280", photo: "assets/inventory/26066.webp",
    listing: "https://www.cargurus.com/details/456905985"
  }
];
