'use strict'

const slugify = require('slugify')


const vehicle_makes = [
    "Abarth",
    "AC",
    "Acura",
    "Advance Mixer",
    "Alfa Romeo",
    "Allard",
    "Allstate",
    "Alpine",
    "Alvis",
    "AM General",
    "American Austin",
    "American Bantam",
    "American IronHorse",
    "Buick",
    "Bultaco",
    "Bus & Coach Intl (BCI)",
    "Cadillac",
    "Cagiva",
    "Can-Am",
    "Arctic Cat",
    "Argo",
    "Armstrong-Siddeley",
    "Arnolt-Bristol",
    "Arnolt-MG",
    "Aston Martin",
    "American LaFrance",
    "American Motors",
    "Amphicar",
    "Apollo",
    "Apperson",
    "Aprilia",
    "Audi",
    "Austin",
    "Austin Healey",
    "Autocar",
    "Autocar LLC.",
    "Avanti",
    "Benelli",
    "Bentley",
    "Bering",
    "Berkeley",
    "Bertone",
    "Beta",
    "Biddle",
    "Big Bear Choppers",
    "Big Dog",
    "Bimota",
    "Bizzarrini",
    "Blackhawk",
    "Blue Bird",
    "ATK",
    "Auburn",
    "BMW",
    "Bobcat",
    "Bombardier",
    "Bond",
    "Borgward",
    "Bricklin",
    "Bristol",
    "Buell",
    "Bugatti",
    "Cannondale",
    "Capacity Of Texas",
    "Case",
    "Case IH",
    "Caterpillar",
    "CFMOTO",
    "Chance Coach Transit Bus",
    "Chandler",
    "Checker",
    "Chevrolet",
    "Chrysler",
    "Cisitalia",
    "Citroen",
    "Cleveland",
    "Cobra",
    "Coda",
    "Cole",
    "Continental",
    "Cord",
    "Country Coach Motorhome",
    "Crane Carrier",
    "Crosley",
    "Crown Coach",
    "Cub Cadet",
    "Cunningham",
    "Daewoo",
    "DAF",
    "Daihatsu",
    "Daimler",
    "Darrin",
    "Davis",
    "De Vaux",
    "Delage",
    "Delahaye",
    "Dellow",
    "DeLorean",
    "Denzel",
    "DeSoto",
    "DeTomaso",
    "Deutsch-Bonnet",
    "Diamond Reo",
    "Diana",
    "Dina Transit Bus",
    "DKW",
    "Dodge",
    "Doretti",
    "Du Pont",
    "Dual-Ghia",
    "Ducati",
    "Duesenberg",
    "Duplex",
    "Durant",
    "Duryea",
    "E-TON",
    "Eagle",
    "Eagle Transit Buses",
    "Edsel",
    "El Dorado",
    "Elcar",
    "Elva",
    "Emergency One",
    "Erik Buell Racing",
    "Erskine",
    "Essex",
    "Evobus",
    "Excalibur",
    "Excelsior-Henderson",
    "Facel Vega",
    "Fairthorpe",
    "Falcon Knight",
    "Fargo",
    "Federal Motors",
    "Ferrari",
    "Fiat",
    "Fisker",
    "Flint",
    "Flxible Transit Bus",
    "Ford",
    "Freightliner",
    "FWD",
    "FWD Corporation",
    "Gardner",
    "Gas Gas",
    "GEM",
    "Genesis",
    "Genesis Transit Buses",
    "Geo",
    "Giant",
    "Gillig",
    "Glas",
    "GMC",
    "Foretravel Motorhome",
    "Franklin",
    "Frazer",
    "Frazer Nash",
    "Goggomobil",
    "Goliath",
    "Gordon-Keeble",
    "Graham",
    "Graham-Paige",
    "Griffith",
    "Hansa",
    "Harley Davidson",
    "Honda",
    "Haynes",
    "HCS",
    "Healey",
    "Hendrickson",
    "Henry J",
    "Hertz",
    "Hillman",
    "Hino",
    "Hispano-Suiza",
    "HM",
    "Husqvarna",
    "Hyosung",
    "Hyundai",
    "IC Corporation",
    "Hotchkiss",
    "HRG",
    "Hudson",
    "Humber",
    "Hummer",
    "Hupmobile",
    "Husaberg",
    "International",
    "Jeep",
    "Jeffery",
    "Jensen",
    "Jewett",
    "John Deere",
    "Jordan",
    "Jowett",
    "Kaiser",
    "Kalmar",
    "Indian",
    "Indiana Phoenix",
    "Infiniti",
    "Jaguar",
    "Iso",
    "Isotta Fraschini",
    "Isuzu",
    "Iveco",
    "Kasea",
    "Kawasaki",
    "Kenworth",
    "Kia",
    "Kimble Chassis",
    "Kissel",
    "Kovatch",
    "KTM",
    "Kubota",
    "Kurtis",
    "KYMCO",
    "Laforza",
    "Lagonda",
    "Lamborghini",
    "Lanchester",
    "Lancia",
    "Land Rover",
    "LEM",
    "LaSalle",
    "Lea-Francis",
    "Les Autobus MCI",
    "Lexington",
    "Lexus",
    "Mercedes-Benz",
    "Mercury",
    "Lotus",
    "Mack",
    "Lincoln",
    "Lloyd",
    "Locomobile",
    "Lodal",
    "Mazda",
    "McLaren",
    "Maico",
    "Marathon",
    "Marauder",
    "Marcos",
    "Marmon",
    "Marmon Herrington",
    "Marquette",
    "Maserati",
    "Matra",
    "Maxim",
    "Maxwell",
    "Maybach",
    "Merkur",
    "Messerschmitt",
    "Metropolitan",
    "MG",
    "Mini",
    "Mitsubishi",
    "Mitsubishi Fuso",
    "Mobility Ventures",
    "Monteverdi",
    "Moon",
    "Moretti",
    "Morgan",
    "Morris",
    "Moskvich",
    "Moto Guzzi",
    "Moto-Ski",
    "Motor Coach Industries",
    "MV Agusta",
    "Nardi",
    "Nash",
    "Neoplan",
    "New Flyer",
    "New Holland",
    "Nissan",
    "North American Bus Industries (NABI)",
    "Nova Bus Corporation",
    "NSU",
    "Oakland",
    "ODES",
    "Oldsmobile",
    "Omega",
    "Ontario Bus",
    "Opel",
    "Orion Bus",
    "Osca",
    "Oshkosh Motor Truck Co.",
    "Peugeot",
    "Piaggio",
    "Pierce Mfg. Inc.",
    "Pierce-Arrow",
    "Plymouth",
    "Polaris",
    "Ottawa",
    "Packard",
    "Paige",
    "Panhard",
    "Panoz",
    "Panther",
    "Peerless",
    "Pegaso",
    "Peterbilt",
    "Polini",
    "Pontiac",
    "Porsche",
    "Prevost",
    "Qvale",
    "Ram",
    "Rambler",
    "Redcat Motors",
    "Redline",
    "Reliant",
    "Renault",
    "Reo",
    "Rickenbacker",
    "Riley",
    "Roadmaster Rail",
    "Roamer",
    "Rockne",
    "Rollin",
    "Rolls-Royce",
    "Roosevelt",
    "Rover",
    "Rupp",
    "Saab",
    "Sabra",
    "Saleen",
    "Salmson",
    "Saturn",
    "Savage",
    "Scion",
    "Scorpion",
    "Scripps Booth",
    "SDG",
    "Sea-Doo",
    "Seagrave Fire Apparatus",
    "Shelby",
    "Sheridan",
    "Siata",
    "Simca",
    "Singer",
    "Ski-Doo",
    "Skoda",
    "Smart",
    "Sno-Jet",
    "Spartan Motors",
    "SRT",
    "Standard",
    "Stanguellini",
    "Star",
    "Stearns Knight",
    "Sterling",
    "Subaru",
    "Sunbeam",
    "Sutphen Corp.",
    "Suzuki",
    "Sterling Truck",
    "Stevens-Duryea",
    "Stewart & Stevenson",
    "Studebaker",
    "Stutz",
    "Swallow",
    "Talbot-Lago",
    "Tatra",
    "Terex / Terex Advance",
    "Tesla",
    "Textron",
    "TGB",
    "Think",
    "Thomas",
    "TigerShark",
    "TM",
    "Toyopet",
    "Toyota",
    "Transportation Mfg Corp.",
    "Triumph",
    "Tucker",
    "Turner",
    "TVR",
    "UD",
    "Unimog",
    "Utilimaster",
    "Van Hool",
    "Vauxhall",
    "Velie",
    "Vento",
    "Vespa",
    "Victory",
    "Viking",
    "Volkswagen",
    "Volvo",
    "Yamaha",
    "Yellow Cab",
    "Yugo",
    "Zeligson",
    "ZERO",
    "Zundapp",
    "VOR",
    "VPG",
    "Wartburg",
    "Westcott",
    "Western RV",
    "Western Star",
    "Wet Jet",
    "Whippet",
    "White",
    "White/GMC",
    "Willys",
    "Windsor",
    "Wolseley",
    "Workhorse",
    "Workhorse Custom Chassis"
]



const vehicle_dict = {}

vehicle_makes.forEach(make => {

    vehicle_dict[slugify(make).toLowerCase()] = make
})



module.exports = {
    list: vehicle_makes,
    dict: vehicle_dict,
}