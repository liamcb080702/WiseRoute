import { useState, useEffect, useRef } from "react";

const GOOGLE_API_KEY = "AIzaSyA29HoYVvc81cEe_nQvegWdfJ0hBHFtReQ";

const VEHICLE_DB = {
  "Ford": {
    "F-150": {
      "2024": [
        { engine:"3.3L V6",                   mpg:21, tank:26, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",           mpg:22, tank:26, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost",           mpg:20, tank:26, fuel:"gasoline" },
        { engine:"5.0L V8",                    mpg:18, tank:26, fuel:"gasoline" },
        { engine:"3.5L PowerBoost Hybrid",     mpg:25, tank:30, fuel:"hybrid"   },
        { engine:"Lightning Electric",          mpg:null,tank:null,fuel:"electric"},
      ],
      "2023": [
        { engine:"3.3L V6",                   mpg:20, tank:26, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",           mpg:22, tank:26, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost",           mpg:20, tank:26, fuel:"gasoline" },
        { engine:"5.0L V8",                    mpg:18, tank:26, fuel:"gasoline" },
        { engine:"3.5L PowerBoost Hybrid",     mpg:24, tank:30, fuel:"hybrid"   },
      ],
      "2022": [
        { engine:"3.3L V6",                   mpg:20, tank:26, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",           mpg:21, tank:26, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost",           mpg:19, tank:26, fuel:"gasoline" },
        { engine:"5.0L V8",                    mpg:17, tank:36, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"3.3L V6",                   mpg:20, tank:26, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",           mpg:20, tank:26, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost",           mpg:18, tank:36, fuel:"gasoline" },
        { engine:"5.0L V8",                    mpg:17, tank:36, fuel:"gasoline" },
      ],
      "2020": [
        { engine:"3.3L V6",                   mpg:19, tank:26, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",           mpg:20, tank:26, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost",           mpg:18, tank:36, fuel:"gasoline" },
        { engine:"5.0L V8",                    mpg:16, tank:36, fuel:"gasoline" },
      ],
      "2019": [
        { engine:"3.3L V6",                   mpg:19, tank:26, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",           mpg:19, tank:26, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost",           mpg:17, tank:36, fuel:"gasoline" },
        { engine:"5.0L V8",                    mpg:16, tank:36, fuel:"gasoline" },
      ],
      "2018": [
        { engine:"3.3L V6",                   mpg:19, tank:26, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",           mpg:19, tank:26, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost",           mpg:17, tank:36, fuel:"gasoline" },
        { engine:"5.0L V8",                    mpg:15, tank:36, fuel:"gasoline" },
      ],
    },
    "F-250 Super Duty": {
      "2024": [
        { engine:"6.2L V8 Gas",               mpg:14, tank:34, fuel:"gasoline" },
        { engine:"7.3L V8 Godzilla",           mpg:13, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:18, tank:34, fuel:"diesel"   },
      ],
      "2023": [
        { engine:"6.2L V8 Gas",               mpg:14, tank:34, fuel:"gasoline" },
        { engine:"7.3L V8 Godzilla",           mpg:13, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:18, tank:34, fuel:"diesel"   },
      ],
      "2022": [
        { engine:"6.2L V8 Gas",               mpg:13, tank:34, fuel:"gasoline" },
        { engine:"7.3L V8 Godzilla",           mpg:12, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:17, tank:34, fuel:"diesel"   },
      ],
      "2021": [
        { engine:"6.2L V8 Gas",               mpg:13, tank:34, fuel:"gasoline" },
        { engine:"7.3L V8 Godzilla",           mpg:12, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:17, tank:34, fuel:"diesel"   },
      ],
      "2020": [
        { engine:"6.2L V8 Gas",               mpg:13, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:17, tank:34, fuel:"diesel"   },
      ],
    },
    "F-350 Super Duty": {
      "2024": [
        { engine:"6.2L V8 Gas",               mpg:13, tank:34, fuel:"gasoline" },
        { engine:"7.3L V8 Godzilla",           mpg:12, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:16, tank:34, fuel:"diesel"   },
      ],
      "2023": [
        { engine:"6.2L V8 Gas",               mpg:13, tank:34, fuel:"gasoline" },
        { engine:"7.3L V8 Godzilla",           mpg:12, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:16, tank:34, fuel:"diesel"   },
      ],
      "2022": [
        { engine:"6.2L V8 Gas",               mpg:12, tank:34, fuel:"gasoline" },
        { engine:"6.7L Power Stroke Diesel",   mpg:16, tank:34, fuel:"diesel"   },
      ],
    },
    "Mustang": {
      "2024": [
        { engine:"2.3L EcoBoost 4-Cyl",       mpg:27, tank:16, fuel:"gasoline" },
        { engine:"5.0L V8 GT",                mpg:18, tank:16, fuel:"gasoline" },
        { engine:"5.2L V8 GT500",             mpg:14, tank:16, fuel:"gasoline" },
      ],
      "2023": [
        { engine:"2.3L EcoBoost 4-Cyl",       mpg:26, tank:16, fuel:"gasoline" },
        { engine:"5.0L V8 GT",                mpg:18, tank:16, fuel:"gasoline" },
        { engine:"5.2L V8 GT500",             mpg:14, tank:16, fuel:"gasoline" },
      ],
      "2022": [
        { engine:"2.3L EcoBoost 4-Cyl",       mpg:26, tank:16, fuel:"gasoline" },
        { engine:"5.0L V8 GT",                mpg:17, tank:16, fuel:"gasoline" },
        { engine:"5.2L V8 GT500",             mpg:13, tank:16, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"2.3L EcoBoost 4-Cyl",       mpg:25, tank:16, fuel:"gasoline" },
        { engine:"5.0L V8 GT",                mpg:17, tank:16, fuel:"gasoline" },
        { engine:"5.2L V8 GT500",             mpg:13, tank:16, fuel:"gasoline" },
      ],
      "2020": [
        { engine:"2.3L EcoBoost 4-Cyl",       mpg:25, tank:16, fuel:"gasoline" },
        { engine:"5.0L V8 GT",                mpg:16, tank:16, fuel:"gasoline" },
        { engine:"5.2L V8 Shelby GT500",      mpg:13, tank:16, fuel:"gasoline" },
      ],
      "2019": [
        { engine:"2.3L EcoBoost 4-Cyl",       mpg:25, tank:16, fuel:"gasoline" },
        { engine:"5.0L V8 GT",                mpg:16, tank:16, fuel:"gasoline" },
        { engine:"5.2L V8 Shelby GT350",      mpg:14, tank:16, fuel:"gasoline" },
      ],
      "2018": [
        { engine:"2.3L EcoBoost 4-Cyl",       mpg:24, tank:16, fuel:"gasoline" },
        { engine:"5.0L V8 GT",                mpg:16, tank:16, fuel:"gasoline" },
        { engine:"5.2L V8 Shelby GT350",      mpg:14, tank:16, fuel:"gasoline" },
      ],
    },
    "Explorer": {
      "2024": [
        { engine:"2.3L EcoBoost",             mpg:24, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 ST",                mpg:18, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 Hybrid",            mpg:27, tank:18, fuel:"hybrid"   },
      ],
      "2023": [
        { engine:"2.3L EcoBoost",             mpg:24, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 ST",                mpg:18, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 Hybrid",            mpg:27, tank:18, fuel:"hybrid"   },
      ],
      "2022": [
        { engine:"2.3L EcoBoost",             mpg:24, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 ST",                mpg:18, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 Hybrid",            mpg:27, tank:18, fuel:"hybrid"   },
      ],
      "2021": [
        { engine:"2.3L EcoBoost",             mpg:23, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 ST",                mpg:18, tank:18, fuel:"gasoline" },
      ],
      "2020": [
        { engine:"2.3L EcoBoost",             mpg:23, tank:18, fuel:"gasoline" },
        { engine:"3.0L V6 ST",                mpg:17, tank:18, fuel:"gasoline" },
      ],
      "2019": [
        { engine:"2.3L EcoBoost",             mpg:22, tank:18, fuel:"gasoline" },
        { engine:"3.5L V6",                   mpg:19, tank:18, fuel:"gasoline" },
      ],
    },
    "Ranger": {
      "2024": [
        { engine:"2.3L EcoBoost",             mpg:22, tank:18, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost Raptor",   mpg:18, tank:18, fuel:"gasoline" },
      ],
      "2023": [
        { engine:"2.3L EcoBoost",             mpg:22, tank:18, fuel:"gasoline" },
      ],
      "2022": [
        { engine:"2.3L EcoBoost",             mpg:22, tank:18, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"2.3L EcoBoost",             mpg:21, tank:18, fuel:"gasoline" },
      ],
      "2020": [
        { engine:"2.3L EcoBoost",             mpg:21, tank:18, fuel:"gasoline" },
      ],
      "2019": [
        { engine:"2.3L EcoBoost",             mpg:21, tank:18, fuel:"gasoline" },
      ],
    },
    "Expedition": {
      "2024": [
        { engine:"3.5L V6 EcoBoost",          mpg:17, tank:33, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost Hybrid",   mpg:22, tank:33, fuel:"hybrid"   },
      ],
      "2023": [
        { engine:"3.5L V6 EcoBoost",          mpg:17, tank:33, fuel:"gasoline" },
        { engine:"3.5L V6 EcoBoost Hybrid",   mpg:22, tank:33, fuel:"hybrid"   },
      ],
      "2022": [
        { engine:"3.5L V6 EcoBoost",          mpg:17, tank:33, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"3.5L V6 EcoBoost",          mpg:16, tank:33, fuel:"gasoline" },
      ],
      "2020": [
        { engine:"3.5L V6 EcoBoost",          mpg:16, tank:33, fuel:"gasoline" },
      ],
      "2019": [
        { engine:"3.5L V6 EcoBoost",          mpg:16, tank:33, fuel:"gasoline" },
      ],
      "2018": [
        { engine:"3.5L V6 EcoBoost",          mpg:15, tank:33, fuel:"gasoline" },
      ],
    },
    "Edge": {
      "2024": [
        { engine:"2.0L EcoBoost",             mpg:26, tank:19, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost ST",       mpg:20, tank:19, fuel:"gasoline" },
      ],
      "2023": [
        { engine:"2.0L EcoBoost",             mpg:26, tank:19, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost ST",       mpg:20, tank:19, fuel:"gasoline" },
      ],
      "2022": [
        { engine:"2.0L EcoBoost",             mpg:26, tank:19, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost ST",       mpg:20, tank:19, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"2.0L EcoBoost",             mpg:25, tank:19, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost ST",       mpg:19, tank:19, fuel:"gasoline" },
      ],
      "2020": [
        { engine:"2.0L EcoBoost",             mpg:25, tank:19, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost ST",       mpg:19, tank:19, fuel:"gasoline" },
      ],
      "2019": [
        { engine:"2.0L EcoBoost",             mpg:24, tank:19, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost Sport",    mpg:19, tank:19, fuel:"gasoline" },
      ],
    },
    "Escape": {
      "2024": [
        { engine:"1.5L EcoBoost",             mpg:28, tank:15, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:24, tank:15, fuel:"gasoline" },
        { engine:"2.5L PHEV",                 mpg:40, tank:14, fuel:"hybrid"   },
        { engine:"2.5L Hybrid",               mpg:41, tank:14, fuel:"hybrid"   },
      ],
      "2023": [
        { engine:"1.5L EcoBoost",             mpg:28, tank:15, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:24, tank:15, fuel:"gasoline" },
        { engine:"2.5L PHEV",                 mpg:40, tank:14, fuel:"hybrid"   },
        { engine:"2.5L Hybrid",               mpg:41, tank:14, fuel:"hybrid"   },
      ],
      "2022": [
        { engine:"1.5L EcoBoost",             mpg:27, tank:15, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:23, tank:15, fuel:"gasoline" },
        { engine:"2.5L PHEV",                 mpg:38, tank:14, fuel:"hybrid"   },
      ],
      "2021": [
        { engine:"1.5L EcoBoost",             mpg:27, tank:15, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:23, tank:15, fuel:"gasoline" },
        { engine:"2.5L Hybrid",               mpg:40, tank:14, fuel:"hybrid"   },
      ],
      "2020": [
        { engine:"1.5L EcoBoost",             mpg:27, tank:15, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:23, tank:15, fuel:"gasoline" },
      ],
      "2019": [
        { engine:"1.5L EcoBoost",             mpg:26, tank:15, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:22, tank:15, fuel:"gasoline" },
      ],
    },
    "Bronco": {
      "2024": [
        { engine:"2.3L EcoBoost",             mpg:20, tank:20, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",          mpg:18, tank:20, fuel:"gasoline" },
        { engine:"3.0L V6 Raptor",            mpg:15, tank:20, fuel:"gasoline" },
      ],
      "2023": [
        { engine:"2.3L EcoBoost",             mpg:20, tank:20, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",          mpg:18, tank:20, fuel:"gasoline" },
        { engine:"3.0L V6 Raptor",            mpg:15, tank:20, fuel:"gasoline" },
      ],
      "2022": [
        { engine:"2.3L EcoBoost",             mpg:20, tank:20, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",          mpg:18, tank:20, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"2.3L EcoBoost",             mpg:20, tank:20, fuel:"gasoline" },
        { engine:"2.7L V6 EcoBoost",          mpg:18, tank:20, fuel:"gasoline" },
      ],
    },
    "Bronco Sport": {
      "2024": [
        { engine:"1.5L EcoBoost",             mpg:26, tank:17, fuel:"gasoline" },
        { engine:"2.0L EcoBoost Badlands",    mpg:23, tank:17, fuel:"gasoline" },
      ],
      "2023": [
        { engine:"1.5L EcoBoost",             mpg:26, tank:17, fuel:"gasoline" },
        { engine:"2.0L EcoBoost Badlands",    mpg:23, tank:17, fuel:"gasoline" },
      ],
      "2022": [
        { engine:"1.5L EcoBoost",             mpg:25, tank:17, fuel:"gasoline" },
        { engine:"2.0L EcoBoost Badlands",    mpg:22, tank:17, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"1.5L EcoBoost",             mpg:25, tank:17, fuel:"gasoline" },
        { engine:"2.0L EcoBoost Badlands",    mpg:22, tank:17, fuel:"gasoline" },
      ],
    },
    "Maverick": {
      "2024": [
        { engine:"2.5L Hybrid",               mpg:42, tank:16, fuel:"hybrid"   },
        { engine:"2.0L EcoBoost",             mpg:25, tank:16, fuel:"gasoline" },
      ],
      "2023": [
        { engine:"2.5L Hybrid",               mpg:42, tank:16, fuel:"hybrid"   },
        { engine:"2.0L EcoBoost",             mpg:25, tank:16, fuel:"gasoline" },
      ],
      "2022": [
        { engine:"2.5L Hybrid",               mpg:42, tank:16, fuel:"hybrid"   },
        { engine:"2.0L EcoBoost",             mpg:25, tank:16, fuel:"gasoline" },
      ],
    },
    "F-450 Super Duty": {
      "2024": [
        { engine:"6.7L Power Stroke Diesel",  mpg:14, tank:34, fuel:"diesel"   },
        { engine:"7.3L V8 Godzilla",          mpg:11, tank:34, fuel:"gasoline" },
      ],
      "2023": [
        { engine:"6.7L Power Stroke Diesel",  mpg:14, tank:34, fuel:"diesel"   },
        { engine:"7.3L V8 Godzilla",          mpg:11, tank:34, fuel:"gasoline" },
      ],
    },
    "Transit": {
      "2024": [
        { engine:"3.5L V6 EcoBoost",          mpg:16, tank:25, fuel:"gasoline" },
        { engine:"2.0L EcoBlue Diesel",       mpg:22, tank:25, fuel:"diesel"   },
        { engine:"Electric",                  mpg:null,tank:null,fuel:"electric"},
      ],
      "2023": [
        { engine:"3.5L V6 EcoBoost",          mpg:16, tank:25, fuel:"gasoline" },
        { engine:"2.0L EcoBlue Diesel",       mpg:22, tank:25, fuel:"diesel"   },
      ],
      "2022": [
        { engine:"3.5L V6 EcoBoost",          mpg:15, tank:25, fuel:"gasoline" },
        { engine:"3.5L V6",                   mpg:13, tank:25, fuel:"gasoline" },
      ],
    },
    "EcoSport": {
      "2022": [
        { engine:"1.0L EcoBoost",             mpg:27, tank:13, fuel:"gasoline" },
        { engine:"2.0L 4-Cyl",               mpg:26, tank:13, fuel:"gasoline" },
      ],
      "2021": [
        { engine:"1.0L EcoBoost",             mpg:27, tank:13, fuel:"gasoline" },
        { engine:"2.0L 4-Cyl",               mpg:26, tank:13, fuel:"gasoline" },
      ],
      "2020": [
        { engine:"1.0L EcoBoost",             mpg:27, tank:13, fuel:"gasoline" },
        { engine:"2.0L 4-Cyl",               mpg:25, tank:13, fuel:"gasoline" },
      ],
    },
    "Fusion": {
      "2020": [
        { engine:"1.5L EcoBoost",             mpg:29, tank:16, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:25, tank:16, fuel:"gasoline" },
        { engine:"2.0L Hybrid",               mpg:42, tank:14, fuel:"hybrid"   },
        { engine:"2.0L Energi PHEV",          mpg:42, tank:14, fuel:"hybrid"   },
      ],
      "2019": [
        { engine:"1.5L EcoBoost",             mpg:29, tank:16, fuel:"gasoline" },
        { engine:"2.0L EcoBoost",             mpg:25, tank:16, fuel:"gasoline" },
        { engine:"2.0L Hybrid",               mpg:42, tank:14, fuel:"hybrid"   },
      ],
    },
    "Mustang Mach-E": {
      "2024": [
        { engine:"Standard Range RWD",        mpg:null,tank:null,fuel:"electric"},
        { engine:"Extended Range RWD",        mpg:null,tank:null,fuel:"electric"},
        { engine:"Extended Range AWD",        mpg:null,tank:null,fuel:"electric"},
        { engine:"GT Performance AWD",        mpg:null,tank:null,fuel:"electric"},
      ],
      "2023": [
        { engine:"Standard Range RWD",        mpg:null,tank:null,fuel:"electric"},
        { engine:"Extended Range RWD",        mpg:null,tank:null,fuel:"electric"},
        { engine:"Extended Range AWD",        mpg:null,tank:null,fuel:"electric"},
      ],
    },
  },
  "Chevrolet": {
    "Silverado 1500": {
      "2024": [
        { engine:"2.7L Turbo",      mpg:22, tank:24, fuel:"gasoline" },
        { engine:"5.3L V8",         mpg:17, tank:24, fuel:"gasoline" },
        { engine:"6.2L V8",         mpg:16, tank:24, fuel:"gasoline" },
        { engine:"3.0L Duramax Diesel",mpg:27,tank:24,fuel:"diesel"  },
      ],
      "2023": [
        { engine:"2.7L Turbo",      mpg:21, tank:24, fuel:"gasoline" },
        { engine:"5.3L V8",         mpg:17, tank:24, fuel:"gasoline" },
        { engine:"6.2L V8",         mpg:16, tank:24, fuel:"gasoline" },
        { engine:"3.0L Duramax Diesel",mpg:27,tank:24,fuel:"diesel"  },
      ],
    },
    "Camaro": {
      "2024": [
        { engine:"2.0L Turbo",      mpg:25, tank:19, fuel:"gasoline" },
        { engine:"3.6L V6",         mpg:21, tank:19, fuel:"gasoline" },
        { engine:"6.2L V8",         mpg:16, tank:19, fuel:"gasoline" },
      ],
    },
    "Equinox": {
      "2024": [
        { engine:"1.5L Turbo",      mpg:28, tank:15, fuel:"gasoline" },
        { engine:"EV Electric",     mpg:null,tank:null,fuel:"electric"},
      ],
    },
    "Tahoe": {
      "2024": [
        { engine:"5.3L V8",         mpg:16, tank:28, fuel:"gasoline" },
        { engine:"6.2L V8",         mpg:15, tank:28, fuel:"gasoline" },
        { engine:"3.0L Duramax Diesel",mpg:21,tank:28,fuel:"diesel"  },
      ],
    },
  },
  "Toyota": {
    "Camry": {
      "2024": [
        { engine:"2.5L 4-Cyl",     mpg:32, tank:16, fuel:"gasoline" },
        { engine:"2.5L Hybrid",    mpg:47, tank:13, fuel:"hybrid"   },
      ],
      "2023": [
        { engine:"2.5L 4-Cyl",     mpg:32, tank:16, fuel:"gasoline" },
        { engine:"3.5L V6",        mpg:26, tank:16, fuel:"gasoline" },
        { engine:"2.5L Hybrid",    mpg:46, tank:13, fuel:"hybrid"   },
      ],
    },
    "Tacoma": {
      "2024": [
        { engine:"2.4L Turbo",     mpg:23, tank:21, fuel:"gasoline" },
        { engine:"2.4L Turbo Hybrid",mpg:37,tank:21,fuel:"hybrid"   },
      ],
      "2023": [
        { engine:"2.7L 4-Cyl",     mpg:20, tank:21, fuel:"gasoline" },
        { engine:"3.5L V6",        mpg:19, tank:21, fuel:"gasoline" },
      ],
    },
    "Tundra": {
      "2024": [
        { engine:"3.5L Twin Turbo V6",mpg:17,tank:22,fuel:"gasoline"},
        { engine:"3.5L Twin Turbo Hybrid",mpg:20,tank:22,fuel:"hybrid"},
      ],
    },
    "RAV4": {
      "2024": [
        { engine:"2.5L 4-Cyl",     mpg:30, tank:15, fuel:"gasoline" },
        { engine:"2.5L Hybrid",    mpg:38, tank:14, fuel:"hybrid"   },
        { engine:"2.5L Prime PHEV",mpg:42, tank:14, fuel:"hybrid"   },
      ],
    },
    "4Runner": {
      "2024": [
        { engine:"2.4L Turbo",     mpg:22, tank:23, fuel:"gasoline" },
        { engine:"2.4L Turbo Hybrid",mpg:30,tank:23,fuel:"hybrid"   },
      ],
    },
  },
  "Honda": {
    "Civic": {
      "2024": [
        { engine:"2.0L 4-Cyl",     mpg:33, tank:12, fuel:"gasoline" },
        { engine:"1.5L Turbo",     mpg:36, tank:12, fuel:"gasoline" },
        { engine:"2.0L Hybrid",    mpg:49, tank:12, fuel:"hybrid"   },
      ],
    },
    "Accord": {
      "2024": [
        { engine:"1.5L Turbo",     mpg:33, tank:14, fuel:"gasoline" },
        { engine:"2.0L Hybrid",    mpg:44, tank:14, fuel:"hybrid"   },
      ],
    },
    "CR-V": {
      "2024": [
        { engine:"1.5L Turbo",     mpg:30, tank:14, fuel:"gasoline" },
        { engine:"2.0L Hybrid",    mpg:40, tank:14, fuel:"hybrid"   },
        { engine:"2.0L PHEV",      mpg:40, tank:14, fuel:"hybrid"   },
      ],
    },
    "Ridgeline": {
      "2024": [
        { engine:"3.5L V6",        mpg:21, tank:19, fuel:"gasoline" },
      ],
    },
  },
  "RAM": {
    "1500": {
      "2024": [
        { engine:"3.6L Pentastar V6",mpg:20,tank:26, fuel:"gasoline"},
        { engine:"5.7L HEMI V8",   mpg:17, tank:26, fuel:"gasoline" },
        { engine:"3.0L EcoDiesel",  mpg:26, tank:26, fuel:"diesel"  },
        { engine:"3.6L eTorque Hybrid",mpg:22,tank:26,fuel:"hybrid" },
        { engine:"5.7L eTorque Hybrid",mpg:19,tank:26,fuel:"hybrid" },
      ],
      "2023": [
        { engine:"3.6L Pentastar V6",mpg:20,tank:26, fuel:"gasoline"},
        { engine:"5.7L HEMI V8",   mpg:17, tank:26, fuel:"gasoline" },
        { engine:"3.0L EcoDiesel",  mpg:26, tank:26, fuel:"diesel"  },
      ],
    },
  },
  "GMC": {
    "Sierra 1500": {
      "2024": [
        { engine:"2.7L Turbo",     mpg:22, tank:24, fuel:"gasoline" },
        { engine:"5.3L V8",        mpg:17, tank:24, fuel:"gasoline" },
        { engine:"6.2L V8",        mpg:16, tank:24, fuel:"gasoline" },
        { engine:"3.0L Duramax Diesel",mpg:27,tank:24,fuel:"diesel" },
      ],
    },
    "Yukon": {
      "2024": [
        { engine:"5.3L V8",        mpg:16, tank:28, fuel:"gasoline" },
        { engine:"6.2L V8",        mpg:15, tank:28, fuel:"gasoline" },
        { engine:"3.0L Duramax Diesel",mpg:21,tank:28,fuel:"diesel" },
      ],
    },
  },
  "Jeep": {
    "Wrangler": {
      "2024": [
        { engine:"3.6L Pentastar V6",mpg:17,tank:21, fuel:"gasoline"},
        { engine:"2.0L Turbo",     mpg:22, tank:21, fuel:"gasoline" },
        { engine:"3.6L 4xe PHEV",  mpg:50, tank:17, fuel:"hybrid"   },
        { engine:"3.0L EcoDiesel", mpg:22, tank:21, fuel:"diesel"   },
      ],
    },
    "Grand Cherokee": {
      "2024": [
        { engine:"3.6L Pentastar V6",mpg:22,tank:24,fuel:"gasoline" },
        { engine:"5.7L HEMI V8",   mpg:17, tank:24, fuel:"gasoline" },
        { engine:"4xe PHEV",       mpg:56, tank:17, fuel:"hybrid"   },
      ],
    },
  },
  "Tesla": {
    "Model 3": {
      "2024": [{ engine:"Dual Motor AWD", mpg:null, tank:null, fuel:"electric" }],
      "2023": [{ engine:"Long Range AWD", mpg:null, tank:null, fuel:"electric" }],
    },
    "Model Y": {
      "2024": [{ engine:"Dual Motor AWD", mpg:null, tank:null, fuel:"electric" }],
    },
    "Cybertruck": {
      "2024": [{ engine:"Tri-Motor AWD",  mpg:null, tank:null, fuel:"electric" }],
    },
  },
  "Nissan": {
    "Frontier": {
      "2024": [{ engine:"3.8L V6",        mpg:19, tank:21, fuel:"gasoline" }],
    },
    "Titan": {
      "2024": [{ engine:"5.6L V8 Endurance",mpg:16,tank:28,fuel:"gasoline"}],
    },
    "Rogue": {
      "2024": [
        { engine:"1.5L VC-Turbo", mpg:33, tank:14, fuel:"gasoline" },
        { engine:"1.5L VC-Turbo e-POWER",mpg:37,tank:14,fuel:"hybrid"},
      ],
    },
  },
  "Hyundai": {
    "Tucson": {
      "2024": [
        { engine:"2.5L 4-Cyl",    mpg:28, tank:14, fuel:"gasoline" },
        { engine:"1.6L Turbo Hybrid",mpg:38,tank:14,fuel:"hybrid"  },
        { engine:"1.6L Turbo PHEV",mpg:38,tank:14, fuel:"hybrid"   },
      ],
    },
    "Santa Fe": {
      "2024": [
        { engine:"2.5L Turbo",    mpg:25, tank:18, fuel:"gasoline" },
        { engine:"1.6L Turbo Hybrid",mpg:33,tank:18,fuel:"hybrid"  },
      ],
    },
  },
  "Subaru": {
    "Outback": {
      "2024": [
        { engine:"2.5L 4-Cyl BOXER",mpg:30,tank:16,fuel:"gasoline" },
        { engine:"2.4L Turbo",     mpg:26, tank:16, fuel:"gasoline" },
      ],
    },
    "Forester": {
      "2024": [{ engine:"2.5L 4-Cyl BOXER",mpg:30,tank:16,fuel:"gasoline"}],
    },
  },
  "BMW": {
    "3 Series": {
      "2024": [
        { engine:"2.0L Turbo",    mpg:28, tank:16, fuel:"gasoline" },
        { engine:"3.0L TwinPower",mpg:24, tank:16, fuel:"gasoline" },
      ],
    },
    "X5": {
      "2024": [
        { engine:"3.0L TwinPower",mpg:21, tank:22, fuel:"gasoline" },
        { engine:"xDrive50e PHEV",mpg:50, tank:17, fuel:"hybrid"   },
      ],
    },
  },
};


const LOGO_B64 = "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";

const C={bg:"#080D1A",card:"#0D1528",border:"#1A2F50",accent:"#3B82F6",teal:"#06B6D4",green:"#10B981",yellow:"#F59E0B",red:"#EF4444",purple:"#8B5CF6",muted:"#64748B",sub:"#94A3B8",text:"#F1F5F9"};

// ── SHARED COMPONENTS ─────────────────────────────────
const Card=({children,style={}})=><div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:14,...style}}>{children}</div>;
const Sec=({t})=><div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>{t}</div>;
const FuelBar=({p})=><div style={{background:"#0A0F1C",borderRadius:8,height:10,overflow:"hidden",margin:"6px 0"}}><div style={{height:"100%",width:`${p}%`,background:p>50?"linear-gradient(90deg,#10B981,#34D399)":p>25?"linear-gradient(90deg,#F59E0B,#FCD34D)":"linear-gradient(90deg,#EF4444,#F87171)",borderRadius:8,transition:"width .4s"}}/></div>;
const Btn=({children,onClick,disabled,outline,color,style={}})=><button onClick={onClick} disabled={disabled} style={{width:"100%",background:outline?"transparent":color??"linear-gradient(135deg,#3B82F6,#06B6D4)",border:outline?`1px solid ${color??C.accent}`:"none",borderRadius:12,padding:"13px 20px",color:outline?(color??C.accent):"#fff",fontSize:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,...style}}>{children}</button>;
const Pill=({active,children,onClick,color})=><button onClick={onClick} style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${active?(color||C.accent):C.border}`,background:active?(color||C.accent)+"22":"transparent",color:active?(color||"#60A5FA"):C.muted,fontSize:12,fontWeight:active?700:400,cursor:"pointer",whiteSpace:"nowrap"}}>{children}</button>;
const Ring=({v,label})=>{const col=v>=4?C.green:v>=3?C.yellow:C.red;return(<div style={{textAlign:"center"}}><div style={{width:40,height:40,borderRadius:"50%",background:col+"22",border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:col,margin:"0 auto 4px"}}>{v.toFixed(1)}</div><div style={{fontSize:10,color:C.muted}}>{label}</div></div>);};
const Spinner=()=><div style={{width:20,height:20,border:`2px solid ${C.border}`,borderTop:`2px solid ${C.accent}`,borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block"}}/>;

// ── INPUT COMPONENT — prevents keyboard dismiss on mobile ──
// Uses uncontrolled input with ref to avoid React re-render issues
function StableInput({placeholder,onCommit,initialValue="",style={},onEnter}){
  const ref=useRef(null);
  useEffect(()=>{if(ref.current&&initialValue)ref.current.value=initialValue;},[]);
  return(
    <input
      ref={ref}
      type="text"
      defaultValue={initialValue}
      placeholder={placeholder}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      inputMode="text"
      enterKeyHint="search"
      style={{width:"100%",background:"#060A14",border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 14px",color:C.text,fontSize:16,outline:"none",boxSizing:"border-box",...style}}
      onChange={e=>onCommit(e.target.value)}
      onKeyDown={e=>{if(e.key==="Enter"&&onEnter){onEnter(e.target.value);e.target.blur();}}}
    />
  );
}

const SEL={width:"100%",background:"#060A14",border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10,cursor:"pointer"};

// ── API HELPERS ───────────────────────────────────────
async function reverseGeocode(lat,lng){
  try{
    const r=await fetch("https://places.googleapis.com/v1/places:searchNearby",{
      method:"POST",
      headers:{"Content-Type":"application/json","X-Goog-Api-Key":GOOGLE_API_KEY,"X-Goog-FieldMask":"places.formattedAddress,places.location"},
      body:JSON.stringify({maxResultCount:1,locationRestriction:{circle:{center:{latitude:lat,longitude:lng},radius:100}}})
    });
    const d=await r.json();
    const addr=(d.places?.[0]?.formattedAddress||"").split(",");
    const city=addr[addr.length-3]?.trim()||"Your location";
    const state=addr[addr.length-2]?.trim()||"";
    return `${city}${state?", "+state:""}`;
  }catch{return "Your location";}
}

const PROXY = "/api/maps";

async function proxyPost(action, body){
  const r = await fetch(`${PROXY}?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d;
}

async function findNearbyStations(lat,lng){
  const r=await fetch("https://places.googleapis.com/v1/places:searchNearby",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "X-Goog-Api-Key":GOOGLE_API_KEY,
      "X-Goog-FieldMask":"places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.regularOpeningHours,places.fuelOptions"
    },
    body:JSON.stringify({
      includedTypes:["gas_station"],
      maxResultCount:15,
      locationRestriction:{circle:{center:{latitude:lat,longitude:lng},radius:50000}}
    })
  });
  const d=await r.json();
  if(d.error)throw new Error(d.error.message);
  return (d.places||[]).map(p=>{
    const pLat=p.location.latitude,pLng=p.location.longitude;
    const distMi=Math.sqrt(Math.pow(pLat-lat,2)+Math.pow(pLng-lng,2))*69;
    let livePrice=null;
    const fp=p.fuelOptions?.fuelPrices||[];
    const reg=fp.find(f=>["REGULAR_UNLEADED","REGULAR","UNLEADED_87"].includes(f.type));
    if(reg?.price){const u=Number(reg.price.units||0),n=Number(reg.price.nanos||0)/1e9;livePrice=+(u+n).toFixed(2);}
    return{id:p.id,name:p.displayName?.text||"Gas Station",address:p.formattedAddress||"",lat:pLat,lng:pLng,distanceMi:+distMi.toFixed(1),rating:p.rating||null,reviewCount:p.userRatingCount||0,openNow:p.regularOpeningHours?.openNow??true,livePrice,bath:p.rating?+Math.min(5,p.rating*0.95).toFixed(1):null,clean:p.rating?+Math.min(5,p.rating*0.9).toFixed(1):null};
  }).sort((a,b)=>a.distanceMi-b.distanceMi);
}

async function fetchPricesAI(stations,lat,lng){
  const names=stations.map(s=>s.name).join(", ");
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:"Search GasBuddy for current regular unleaded gas prices near "+lat.toFixed(3)+","+lng.toFixed(3)+" right now. Return ONLY a raw JSON object, no markdown, mapping brand/station name to price number. Stations: "+names}]})});
  const d=await r.json();
  const text=d.content?.filter(b=>b.type==="text").map(b=>b.text).join("")||"";
  const match=text.replace(/```[a-z]*|```/g,"").trim().match(/\{[\s\S]*?\}/);
  if(!match)return{};
  try{return JSON.parse(match[0]);}catch{return{};}
}

async function askClaudeAI(prompt){
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,messages:[{role:"user",content:prompt}]})});
  const d=await r.json();
  return d.content?.map(b=>b.text||"").join("")||"";
}

// ══════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════
export default function WiseRoute(){
  const[screen,setScreen]=useState("home");
  const[location,setLocation]=useState(null);
  const[locLoading,setLocLoading]=useState(false);
  const[locError,setLocError]=useState("");
  const[stations,setStations]=useState([]);
  const[stLoading,setStLoading]=useState(false);
  const[gasPrices,setGasPrices]=useState({});
  const[priceLoading,setPriceLoading]=useState(false);
  const[vehicle,setVehicle]=useState(null);
  const[fuelPct,setFuelPct]=useState(60);
  const[sortBy,setSortBy]=useState("smart");
  const[expandSt,setExpandSt]=useState(null);
  // Nav








  // Drive
  const[driving,setDriving]=useState(false);
  const[simFuel,setSimFuel]=useState(60);
  const[milesDriven,setMilesDriven]=useState(0);
  const[driveAi,setDriveAi]=useState("");
  const[driveAiLoading,setDriveAiLoading]=useState(false);
  const iRef=useRef(null);

  const ts=vehicle?.tankSize??20;
  const mpg=vehicle?.mpg??22;
  const gallons=(ts*fuelPct)/100;
  const milesLeft=mpg?Math.round(gallons*mpg):null;

  // ── GET GPS ──────────────────────────────────────────
  const getLocation=()=>{
    setLocLoading(true);setLocError("");
    if(!navigator.geolocation){setLocError("Geolocation not supported.");setLocLoading(false);return;}
    navigator.geolocation.getCurrentPosition(async pos=>{
      const{latitude:lat,longitude:lng}=pos.coords;
      const city=await reverseGeocode(lat,lng);
      setLocation({lat,lng,city});
      setLocLoading(false);
    },err=>{setLocError("Location denied — please enable in browser settings.");setLocLoading(false);},{enableHighAccuracy:true,timeout:10000});
  };

  // ── LOAD STATIONS ────────────────────────────────────
  const loadStations=async(lat,lng)=>{
    setStLoading(true);setStations([]);
    try{
      const found=await findNearbyStations(lat,lng);
      // First pass: collect live prices from Google
      const livePrices={};
      found.forEach(s=>{if(s.livePrice)livePrices[s.id]=s.livePrice;});
      if(Object.keys(livePrices).length>0)setGasPrices(p=>({...p,...livePrices}));
      // Try AI price lookup for stations without a live Google price
      const missing=found.slice(0,8).filter(s=>!s.livePrice);
      if(missing.length>0){
        setPriceLoading(true);
        const prices=await fetchPricesAI(missing,lat,lng);
        const mapped={};
        missing.forEach(s=>{
          const k=Object.keys(prices).find(k=>s.name.toLowerCase().includes(k.toLowerCase())||k.toLowerCase().includes(s.name.toLowerCase().split(/[\s-]/)[0]));
          if(k)mapped[s.id]=prices[k];
        });
        setGasPrices(p=>({...p,...mapped}));
        setPriceLoading(false);
        // Only show stations that have a price from either source
        const allPrices={...livePrices,...mapped};
        const withPrices=found.filter(s=>allPrices[s.id]);
        setStations(withPrices);
      } else {
        // Only show stations that had live Google prices
        setStations(found.filter(s=>s.livePrice));
      }
    }catch(e){setLocError("Could not load stations: "+e.message);}
    setStLoading(false);
  };

  useEffect(()=>{if(location)loadStations(location.lat,location.lng);},[location?.lat,location?.lng]);



  const scoreS=s=>(3.60-(gasPrices[s.id]||3.50))*25+(s.rating||3)*8-s.distanceMi*1.5;
  // Only show stations with a confirmed price — filters out stores/non-stations
  const sorted=[...stations]
    .filter(s=>gasPrices[s.id])
    .sort((a,b)=>sortBy==="price"?(gasPrices[a.id]||99)-(gasPrices[b.id]||99):sortBy==="rating"?(b.rating||0)-(a.rating||0):scoreS(b)-scoreS(a));
  const urgency=fuelPct<=15?"now":fuelPct<=30?"soon":"ok";
  const U={ok:{col:C.green,bg:"#0A2818",label:"Range OK",icon:"✅"},soon:{col:C.yellow,bg:"#1A1200",label:"Fill Up Soon",icon:"⚠️"},now:{col:C.red,bg:"#1A0800",label:"Fill Up NOW",icon:"🚨"}};
  const urg=U[urgency];

  // ══ HOME SCREEN ════════════════════════════════════════
  function HomeScreen(){
    return(
      <div>
        <div style={{background:"linear-gradient(135deg,#0A2040,#0A2818)",borderRadius:20,padding:22,marginBottom:14,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,background:`radial-gradient(circle,${C.accent}18,transparent)`,borderRadius:"50%"}}/>
          <div style={{fontSize:11,color:C.muted,marginBottom:4,fontWeight:600,letterSpacing:"0.1em"}}>WISEROUTE AI — LIVE</div>
          <div style={{fontSize:24,fontWeight:900,lineHeight:1.2,marginBottom:8}}>Real stations.<br/><span style={{background:"linear-gradient(90deg,#34D399,#22D3EE)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Real prices.</span></div>
          <div style={{fontSize:13,color:C.sub,marginBottom:18}}>{location?`📍 ${location.city} · ${stations.length} stations found`:"Tap below to find gas stations near you"}</div>
          <div style={{display:"flex",gap:8}}>
            <Btn onClick={()=>{if(!location)getLocation();else setScreen("nearby");}} disabled={locLoading} style={{flex:1,padding:"11px 12px",fontSize:13}}>{locLoading?"Getting location…":location?"View Stations →":"📍 Find Stations"}</Btn>
  
          </div>
          {locError&&<div style={{marginTop:10,fontSize:12,color:C.red,background:C.red+"18",padding:"8px",borderRadius:8}}>{locError}</div>}
        </div>

        {vehicle?(
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div><div style={{fontWeight:700}}>{vehicle.year} {vehicle.make} {vehicle.model}</div><div style={{fontSize:12,color:C.muted}}>{vehicle.engine}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:13,color:fuelPct>25?C.green:C.red,fontWeight:700}}>{fuelPct}%</div>{milesLeft&&<div style={{fontSize:11,color:C.muted}}>~{milesLeft} mi</div>}</div>
            </div>
            <FuelBar p={fuelPct}/>
            {fuelPct<=25&&<div style={{fontSize:12,color:C.red,marginTop:4,fontWeight:600}}>⚠️ Low fuel — fill up soon!</div>}
          </Card>
        ):(
          <div onClick={()=>setScreen("setup")} style={{background:C.card,border:`1px dashed ${C.accent}`,borderRadius:14,padding:18,textAlign:"center",cursor:"pointer",marginBottom:14}}>
            <div style={{fontSize:30,marginBottom:8}}>🚗</div>
            <div style={{fontWeight:700,marginBottom:4}}>Select your vehicle</div>
            <div style={{fontSize:12,color:C.muted}}>Pick year, make, model & engine</div>
          </div>
        )}

        {sorted.length>0&&(
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.sub,marginBottom:10}}>⛽ Best Nearby</div>
            {sorted.slice(0,3).map((s,i)=>(
              <div key={s.id} onClick={()=>setScreen("nearby")} style={{background:i===0?"linear-gradient(135deg,#0A2030,#0A2818)":C.card,border:`1px solid ${i===0?C.green:C.border}`,borderRadius:12,padding:12,marginBottom:8,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:i===0?C.green+"22":C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:i===0?C.green:C.muted}}>#{i+1}</div>
                  <div><div style={{fontWeight:600,fontSize:13}}>{s.name}</div><div style={{fontSize:11,color:C.muted}}>{s.distanceMi} mi{s.rating?` · ★ ${s.rating}`:""}</div></div>
                </div>
                <div style={{textAlign:"right"}}>{gasPrices[s.id]?<div style={{fontWeight:800,fontSize:16,color:C.green}}>${gasPrices[s.id].toFixed(2)}</div>:priceLoading?<Spinner/>:<div style={{fontSize:11,color:C.muted}}>TBD</div>}<div style={{fontSize:10,color:C.muted}}>/gal</div></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ══ NEARBY SCREEN ══════════════════════════════════════
  function NearbyScreen(){
    const[aiTip,setAiTip]=useState("");
    const[aiLoading,setAiLoading]=useState(false);
    const getAiTip=async()=>{
      setAiLoading(true);setAiTip("");
      const top=sorted.slice(0,4).map(s=>`${s.name} (${s.distanceMi}mi, ${gasPrices[s.id]?"$"+gasPrices[s.id]+"/gal":"TBD"})`).join("; ");
      const vDesc=vehicle?`${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.mpg||"electric"} MPG, ${ts}gal tank)`:"unknown vehicle";
      const tip=await askClaudeAI(`WiseRoute AI. Driver: ${vDesc}, ${fuelPct}% fuel (~${milesLeft} mi range). Location: ${location?.city}. Nearby stations: ${top||"none yet"}. Give 2 sentences of specific stop advice.`);
      setAiTip(tip);setAiLoading(false);
    };
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div><div style={{fontSize:20,fontWeight:900}}>Nearby Stations</div><div style={{fontSize:12,color:C.muted}}>{location?.city} · {stations.length} found</div></div>
          <button onClick={()=>location&&loadStations(location.lat,location.lng)} style={{background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:10,padding:"8px 14px",color:"#60A5FA",fontSize:12,fontWeight:700,cursor:"pointer"}}>↺ Refresh</button>
        </div>
        <div style={{background:"linear-gradient(135deg,#081830,#0A2020)",border:`1px solid #1E4A7F`,borderRadius:14,padding:14,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span>🤖</span><span style={{fontWeight:700,fontSize:13,color:"#60A5FA"}}>WiseRoute AI</span><button onClick={getAiTip} style={{marginLeft:"auto",background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"4px 10px",color:"#60A5FA",fontSize:11,cursor:"pointer"}}>{aiLoading?<Spinner/>:"Get Advice"}</button></div>
          {aiLoading?<div style={{fontSize:13,color:C.muted}}>Analyzing…</div>:aiTip?<div style={{fontSize:13,color:"#CBD5E1",lineHeight:1.6}}>{aiTip}</div>:<div style={{fontSize:13,color:C.muted}}>Tap "Get Advice" for a personalized recommendation.</div>}
        </div>
        <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
          {[["smart","🤖 Smart"],["price","💰 Cheapest"],["rating","⭐ Top Rated"]].map(([id,l])=><Pill key={id} active={sortBy===id} onClick={()=>setSortBy(id)}>{l}</Pill>)}
        </div>
        {stLoading?<div style={{textAlign:"center",padding:40}}><Spinner/><div style={{fontSize:13,color:C.muted,marginTop:12}}>Finding stations…</div></div>
        :stations.length===0&&location?<div style={{textAlign:"center",padding:30}}><div style={{fontSize:40,marginBottom:12}}>🔍</div><div style={{color:C.muted,marginBottom:12}}>No stations found.</div><div style={{fontSize:11,color:C.muted,lineHeight:1.6,marginBottom:16}}>Make sure "Places API (New)" is enabled in Google Cloud Console.</div><button onClick={()=>loadStations(location.lat,location.lng)} style={{background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:10,padding:"10px 20px",color:"#60A5FA",fontSize:13,fontWeight:700,cursor:"pointer"}}>↺ Try Again</button></div>
        :!location?<Btn onClick={getLocation} disabled={locLoading}>{locLoading?"Getting location…":"📍 Enable Location First"}</Btn>:null}
        {sorted.map((s,i)=>(
          <div key={s.id}>
            <div onClick={()=>setExpandSt(expandSt===s.id?null:s.id)} style={{background:i===0?"linear-gradient(135deg,#0A2030,#0A2818)":C.card,border:`1px solid ${i===0?C.green:C.border}`,borderRadius:14,padding:14,marginBottom:10,cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>{s.name}</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:2}}>{s.address}</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:2}}>{s.distanceMi} mi{s.rating?` · ★ ${s.rating} (${s.reviewCount})`:""}</div>
                  {i===0&&<span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.green+"22",color:C.green,border:`1px solid ${C.green}44`,marginTop:4,display:"inline-block"}}>✓ Best Pick</span>}
                  {!s.openNow&&<span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:C.red+"22",color:C.red,border:`1px solid ${C.red}44`,marginTop:4,marginLeft:4,display:"inline-block"}}>Closed</span>}
                </div>
                <div style={{textAlign:"right",minWidth:72}}>
                  {priceLoading&&!gasPrices[s.id]?<div style={{paddingTop:4}}><Spinner/></div>:gasPrices[s.id]?<><div style={{fontSize:22,fontWeight:900,color:C.green}}>${gasPrices[s.id].toFixed(2)}</div><div style={{fontSize:10,color:C.muted}}>/gal · live</div></>:<div style={{fontSize:12,color:C.muted,marginTop:8}}>Price<br/>pending</div>}
                </div>
              </div>
              {s.rating&&<div style={{display:"flex",gap:14}}><Ring v={Math.min(5,s.rating)} label="Overall"/>{s.bath&&<Ring v={s.bath} label="Est. Bath"/>}{s.clean&&<Ring v={s.clean} label="Est. Clean"/>}</div>}
            </div>
            {expandSt===s.id&&(
              <div style={{background:"#08101E",border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginTop:-8,marginBottom:12}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <button onClick={()=>{setNavDest(s.address||s.name);setNavActive(false);setNavRoute(null);setScreen("nav");}} style={{background:C.green+"22",border:`1px solid ${C.green}44`,borderRadius:10,padding:"11px 8px",color:C.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>🗺️ Navigate Here</button>
                  <button onClick={()=>{loadStations(location.lat,location.lng);}} style={{background:C.teal+"22",border:`1px solid ${C.teal}44`,borderRadius:10,padding:"11px 8px",color:C.teal,fontSize:12,fontWeight:700,cursor:"pointer"}}>↺ Refresh Prices</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ══ DRIVE SCREEN — Live GPS tracking + smart alerts ═══
  function DriveScreen(){
    const[tracking,setTracking]=useState(false);
    const[livePos,setLivePos]=useState(location);
    const[milesDriven,setMilesDriven]=useState(0);
    const[lastPos,setLastPos]=useState(null);
    const[currentFuel,setCurrentFuel]=useState(fuelPct);
    const[alerts,setAlerts]=useState([]);
    const[notifAllowed,setNotifAllowed]=useState(false);
    const[driveAi,setDriveAi]=useState("");
    const[driveAiLoading,setDriveAiLoading]=useState(false);
    const[alertsFired,setAlertsFired]=useState(new Set());
    const watchRef=useRef(null);

    const gallonsNow=(ts*currentFuel)/100;
    const milesNow=mpg?Math.round(gallonsNow*mpg):null;
    const urgency=currentFuel<=15?"now":currentFuel<=30?"soon":"ok";
    const U2={ok:{col:C.green,bg:"#0A2818",label:"Range OK",icon:"✅"},soon:{col:C.yellow,bg:"#1A1200",label:"Fill Up Soon",icon:"⚠️"},now:{col:C.red,bg:"#1A0800",label:"Fill Up NOW",icon:"🚨"}};
    const urg2=U2[urgency];
    const top=sorted[0];

    // Request notification permission
    const requestNotifs=async()=>{
      if(!("Notification" in window)){setAlerts(a=>[...a,"Notifications not supported in this browser."]);return;}
      const perm=await Notification.requestPermission();
      if(perm==="granted"){setNotifAllowed(true);setAlerts(a=>[...a,"✅ Notifications enabled!"]);}
      else setAlerts(a=>[...a,"⚠️ Notifications blocked. Enable in Settings → Safari → WiseRoute."]);
    };

    // Send notification
    const sendNotif=(title,body)=>{
      if(notifAllowed&&Notification.permission==="granted"){
        new Notification(title,{body,icon:"/favicon.ico"});
      }
      setAlerts(a=>[{time:new Date().toLocaleTimeString(),title,body},...a].slice(0,10));
    };

    // Calculate distance between two coords in miles
    const calcMiles=(lat1,lng1,lat2,lng2)=>{
      const R=3959;
      const dLat=(lat2-lat1)*Math.PI/180;
      const dLng=(lng2-lng1)*Math.PI/180;
      const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
      return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    };

    // Start live GPS tracking
    const startTracking=()=>{
      if(!navigator.geolocation){setAlerts(a=>[...a,"GPS not available."]);return;}
      setTracking(true);
      setAlerts(a=>[...a,"🟢 Tracking started — WiseRoute is watching your fuel level."]);
      watchRef.current=navigator.geolocation.watchPosition(pos=>{
        const{latitude:lat,longitude:lng}=pos.coords;
        setLivePos({lat,lng});
        setLastPos(prev=>{
          if(prev&&mpg){
            const dist=calcMiles(prev.lat,prev.lng,lat,lng);
            if(dist>0.01){// Only count if moved more than ~50ft
              setMilesDriven(m=>{
                const newMiles=+(m+dist).toFixed(2);
                // Calculate fuel used
                const fuelUsed=(dist/mpg)*100/ts;
                setCurrentFuel(f=>{
                  const newFuel=Math.max(0,+(f-fuelUsed).toFixed(2));
                  // Fire alerts at thresholds
                  setAlertsFired(fired=>{
                    if(newFuel<=15&&!fired.has("15")){
                      sendNotif("🚨 WiseRoute: Fill Up NOW!",`Only ${Math.round(newFuel)}% fuel left (~${Math.round(newFuel*ts/100*mpg)} miles). ${top?`Nearest: ${top.name} ${top.distanceMi}mi away.`:""}`);
                      return new Set([...fired,"15"]);
                    } else if(newFuel<=30&&!fired.has("30")){
                      sendNotif("⚠️ WiseRoute: Fill Up Soon",`${Math.round(newFuel)}% fuel remaining (~${Math.round(newFuel*ts/100*mpg)} miles). Start looking for a station.`);
                      return new Set([...fired,"30"]);
                    } else if(newFuel<=50&&!fired.has("50")){
                      sendNotif("💡 WiseRoute: Half Tank",`You're at 50% fuel. ${top?`Best nearby: ${top.name} at ${gasPrices[top.id]?"$"+gasPrices[top.id]+"/gal":"price TBD"}.`:""}`);
                      return new Set([...fired,"50"]);
                    }
                    return fired;
                  });
                  return newFuel;
                });
                return newMiles;
              });
            }
          }
          return{lat,lng};
        });
        // Refresh stations when moved more than 2 miles
        setMilesDriven(m=>{
          if(m>0&&m%2<0.05) loadStations(lat,lng);
          return m;
        });
      },{enableHighAccuracy:true,maximumAge:5000,timeout:15000});
    };

    const stopTracking=()=>{
      if(watchRef.current)navigator.geolocation.clearWatch(watchRef.current);
      setTracking(false);
      setAlerts(a=>[...a,"⏹ Tracking paused."]);
    };

    const getDriveAi=async()=>{
      setDriveAiLoading(true);setDriveAi("");
      const tip=await askClaudeAI(`WiseRoute Drive AI: ${currentFuel.toFixed(0)}% fuel (~${milesNow||"?"} miles range), driven ${milesDriven.toFixed(1)} miles. ${top?`Best nearby: ${top.name}, ${top.distanceMi}mi, ${gasPrices[top.id]?"$"+gasPrices[top.id]+"/gal":"price unknown"}`:"no stations loaded"}. 2 sentences: should they stop now or keep going?`);
      setDriveAi(tip);setDriveAiLoading(false);
    };

    const openInMaps=(station)=>{
      const addr=encodeURIComponent(station.address||station.name);
      window.open(`maps://maps.apple.com/?daddr=${addr}&dirflg=d`,"_blank");
    };

    return(
      <div>
        <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>Drive Mode</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Live GPS fuel tracking + smart alerts. Use Apple Maps for navigation.</div>

        {/* Notification permission */}
        {!notifAllowed&&(
          <div style={{background:"linear-gradient(135deg,#1A1200,#0A1820)",border:`1px solid ${C.yellow}44`,borderRadius:14,padding:14,marginBottom:14}}>
            <div style={{fontWeight:700,color:C.yellow,marginBottom:6}}>🔔 Enable Fuel Alerts</div>
            <div style={{fontSize:13,color:C.sub,marginBottom:12}}>Get notified at 50%, 30%, and 15% fuel so you never get stranded.</div>
            <button onClick={requestNotifs} style={{width:"100%",background:C.yellow+"22",border:`1px solid ${C.yellow}44`,borderRadius:10,padding:"11px",color:C.yellow,fontSize:13,fontWeight:700,cursor:"pointer"}}>🔔 Enable Notifications</button>
          </div>
        )}

        {/* Live fuel gauge */}
        <div style={{background:urg2.bg,border:`1px solid ${urg2.col}44`,borderRadius:16,padding:16,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:28}}>{urg2.icon}</span>
            <div>
              <div style={{fontWeight:800,fontSize:17,color:urg2.col}}>{urg2.label}</div>
              <div style={{fontSize:12,color:C.sub}}>{milesNow?`~${milesNow} mi range · `:""}{""+currentFuel.toFixed(1)}% fuel · {gallonsNow.toFixed(1)} gal</div>
            </div>
            {tracking&&<div style={{marginLeft:"auto",width:10,height:10,borderRadius:"50%",background:C.green,boxShadow:`0 0 8px ${C.green}`,animation:"pulse 1.5s infinite"}}/>}
          </div>
          <FuelBar p={currentFuel}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}}>
            {[[milesNow?`~${milesNow}`:"?","Mi range"],[gallonsNow.toFixed(1),"Gals left"],[milesDriven.toFixed(1),"Mi driven"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center",background:"#00000030",borderRadius:10,padding:"8px 4px"}}>
                <div style={{fontSize:17,fontWeight:800}}>{v}</div>
                <div style={{fontSize:10,color:C.muted}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <button onClick={startTracking} disabled={tracking} style={{background:tracking?"#0A2818":C.green+"22",border:`1px solid ${C.green}44`,borderRadius:12,padding:"13px",color:C.green,fontSize:14,fontWeight:700,cursor:tracking?"default":"pointer",opacity:tracking?.6:1}}>{tracking?"🟢 Tracking…":"▶ Start Tracking"}</button>
          <button onClick={stopTracking} disabled={!tracking} style={{background:!tracking?"#0A0F1C":C.red+"22",border:`1px solid ${C.red}44`,borderRadius:12,padding:"13px",color:C.red,fontSize:14,fontWeight:700,cursor:!tracking?"default":"pointer",opacity:!tracking?.4:1}}>⏹ Pause</button>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <button onClick={()=>{setCurrentFuel(fuelPct);setMilesDriven(0);setAlertsFired(new Set());setDriveAi("");setAlerts([]);}} style={{flex:1,background:"none",border:`1px solid ${C.border}`,borderRadius:10,padding:"8px",color:C.muted,fontSize:12,cursor:"pointer"}}>↺ Reset</button>
          <button onClick={()=>{setCurrentFuel(f=>Math.min(100,+(f+25).toFixed(0)));setAlertsFired(new Set());}} style={{flex:1,background:"none",border:`1px solid ${C.accent}44`,borderRadius:10,padding:"8px",color:"#60A5FA",fontSize:12,cursor:"pointer"}}>⛽ Filled Up</button>
        </div>

        {/* Best nearby station with Apple Maps button */}
        {top&&(
          <div style={{background:"linear-gradient(135deg,#0A2030,#0A2010)",border:`1px solid ${urg2.col}55`,borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{fontWeight:800,fontSize:13,color:urg2.col,marginBottom:8}}>
              {urgency==="now"?"🚨 Stop Here Now":urgency==="soon"?"⚠️ Recommended Stop":"⛽ Best Nearby Station"}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{top.name}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>{top.distanceMi} mi away</div>
                <div style={{fontSize:12,color:C.muted}}>{top.address?.split(",")[0]}</div>
                {top.rating&&<div style={{fontSize:12,color:C.yellow,marginTop:2}}>★ {top.rating} ({top.reviewCount} reviews)</div>}
              </div>
              <div style={{textAlign:"right"}}>
                {gasPrices[top.id]?<><div style={{fontSize:22,fontWeight:900,color:C.green}}>${gasPrices[top.id].toFixed(2)}</div><div style={{fontSize:10,color:C.muted}}>/gal · live</div></>:<div style={{fontSize:12,color:C.muted}}>Price TBD</div>}
              </div>
            </div>
            <a href={`maps://maps.apple.com/?daddr=${encodeURIComponent(top.address||top.name)}&dirflg=d`} style={{textDecoration:"none",display:"block"}}>
              <button style={{width:"100%",background:"linear-gradient(135deg,#1A3A5C,#1A4A3C)",border:`1px solid ${C.green}66`,borderRadius:10,padding:"12px",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                🗺️ Open in Apple Maps
              </button>
            </a>
          </div>
        )}

        {/* All nearby sorted */}
        {sorted.length>0&&(
          <div style={{marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:700,color:C.sub,marginBottom:8}}>All Nearby Stations</div>
            {sorted.slice(0,5).map((s,i)=>(
              <div key={s.id} style={{background:i===0?C.card:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{s.name}</div>
                  <div style={{fontSize:11,color:C.muted}}>{s.distanceMi} mi{s.rating?` · ★ ${s.rating}`:""}</div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  {gasPrices[s.id]&&<div style={{fontWeight:800,color:C.green}}>${gasPrices[s.id].toFixed(2)}</div>}
                  <a href={`maps://maps.apple.com/?daddr=${encodeURIComponent(s.address||s.name)}&dirflg=d`} style={{textDecoration:"none"}}>
                    <button style={{background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"6px 10px",color:"#60A5FA",fontSize:11,fontWeight:700,cursor:"pointer"}}>Maps</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI advisor */}
        <div style={{background:"linear-gradient(135deg,#081830,#0A1F30)",border:`1px solid #1E4A7F`,borderRadius:14,padding:14,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span>🤖</span><span style={{fontWeight:700,fontSize:13,color:"#60A5FA"}}>AI Fuel Advisor</span>
            <button onClick={getDriveAi} style={{marginLeft:"auto",background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"4px 10px",color:"#60A5FA",fontSize:11,cursor:"pointer"}}>{driveAiLoading?<Spinner/>:"Ask AI"}</button>
          </div>
          {driveAi?<div style={{fontSize:13,color:"#CBD5E1",lineHeight:1.6}}>{driveAi}</div>:<div style={{fontSize:13,color:C.muted}}>Tap "Ask AI" for advice based on your current fuel and nearby stations.</div>}
        </div>

        {/* Alert log */}
        {alerts.length>0&&(
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.sub,marginBottom:8}}>🔔 Alert History</div>
            {alerts.slice(0,5).map((a,i)=>(
              <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",marginBottom:6}}>
                {typeof a==="string"?<div style={{fontSize:12,color:C.sub}}>{a}</div>:<><div style={{fontSize:12,fontWeight:700}}>{a.title}</div><div style={{fontSize:11,color:C.muted}}>{a.body}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{a.time}</div></>}
              </div>
            ))}
          </div>
        )}

        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
      </div>
    );
  }

  // ══ SETUP SCREEN ═══════════════════════════════════════
  function SetupScreen(){
    const makes=Object.keys(VEHICLE_DB).sort();
    const[selMake,setSelMake]=useState(vehicle?.make||"");
    const[selModel,setSelModel]=useState(vehicle?.model||"");
    const[selYear,setSelYear]=useState(vehicle?.year||"");
    const[selEngine,setSelEngine]=useState(vehicle?.engine||"");
    const[saved,setSaved]=useState(false);
    const models=selMake?Object.keys(VEHICLE_DB[selMake]||{}).sort():[];
    const years=selMake&&selModel?Object.keys(VEHICLE_DB[selMake]?.[selModel]||{}).sort((a,b)=>Number(b)-Number(a)):[];
    const engines=selMake&&selModel&&selYear?VEHICLE_DB[selMake]?.[selModel]?.[selYear]||[]:[];
    const selEng=engines.find(e=>e.engine===selEngine);
    const save=()=>{
      if(!selEng)return;
      setVehicle({make:selMake,model:selModel,year:selYear,engine:selEng.engine,mpg:selEng.mpg,tankSize:selEng.tank,fuelType:selEng.fuel});
      setSaved(true);
      setTimeout(()=>setScreen("home"),1000);
    };
    return(
      <div>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>My Vehicle</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Select your vehicle for accurate fuel tracking.</div>
        <Card>
          <Sec t="Make"/>
          <select style={SEL} value={selMake} onChange={e=>{setSelMake(e.target.value);setSelModel("");setSelYear("");setSelEngine("");}}>
            <option value="">Select make…</option>
            {makes.map(m=><option key={m} value={m}>{m}</option>)}
          </select>
          {selMake&&<><Sec t="Model"/><select style={SEL} value={selModel} onChange={e=>{setSelModel(e.target.value);setSelYear("");setSelEngine("");}}>
            <option value="">Select model…</option>
            {models.map(m=><option key={m} value={m}>{m}</option>)}
          </select></>}
          {selModel&&<><Sec t="Year"/><select style={SEL} value={selYear} onChange={e=>{setSelYear(e.target.value);setSelEngine("");}}>
            <option value="">Select year…</option>
            {years.map(y=><option key={y} value={y}>{y}</option>)}
          </select></>}
          {selYear&&<><Sec t="Engine / Trim"/><select style={SEL} value={selEngine} onChange={e=>setSelEngine(e.target.value)}>
            <option value="">Select engine…</option>
            {engines.map(e=><option key={e.engine} value={e.engine}>{e.engine}{e.mpg?` · ${e.mpg} MPG`:""}{e.tank?` · ${e.tank}gal`:""}</option>)}
          </select></>}
          {selEng&&<div style={{background:"#0A1E0A",border:`1px solid ${C.green}44`,borderRadius:12,padding:14,marginBottom:14}}>
            <div style={{fontWeight:700,color:C.green,marginBottom:10}}>✓ {selYear} {selMake} {selModel}</div>
            {[["Engine",selEng.engine],["Fuel",selEng.fuel],["MPG",selEng.mpg?selEng.mpg+" MPG":"Electric"],["Tank",selEng.tank?selEng.tank+" gallons":"N/A"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:C.muted,fontSize:13}}>{k}</span><span style={{fontWeight:600,fontSize:13}}>{v}</span></div>
            ))}
          </div>}
          <Btn disabled={!selEng||saved} onClick={save} color={saved?C.green:undefined}>{saved?"✓ Saved!":"Save Vehicle"}</Btn>
        </Card>
        {vehicle&&<Card>
          <Sec t="Current Fuel Level"/>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
            <input type="range" min={5} max={100} value={fuelPct} onChange={e=>setFuelPct(Number(e.target.value))} style={{flex:1}}/>
            <span style={{fontWeight:700,color:"#60A5FA",minWidth:40}}>{fuelPct}%</span>
          </div>
          <FuelBar p={fuelPct}/>
          {milesLeft&&<div style={{fontSize:22,fontWeight:900,color:fuelPct>25?C.green:C.red,marginTop:8}}>~{milesLeft} <span style={{fontSize:13,fontWeight:400,color:C.muted}}>miles remaining</span></div>}
        </Card>}
      </div>
    );
  }

  const NAV=[{id:"home",label:"Home",icon:"🏠"},{id:"nearby",label:"Near Me",icon:"📍"},{id:"drive",label:"Drive",icon:"🛣️"},{id:"setup",label:"My Car",icon:"🚗"}];

  return(
    <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:430,margin:"0 auto",overflowX:"hidden"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} *{-webkit-tap-highlight-color:transparent;} input,select{-webkit-appearance:none;appearance:none;} input:focus{border-color:#3B82F6 !important;}`}</style>
      <div style={{background:"linear-gradient(160deg,#0A1428,#0F2040)",padding:"14px 16px",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="WiseRoute" style={{width:42,height:42,objectFit:"cover",borderRadius:11}}/>
          <div>
            <div style={{fontSize:19,fontWeight:900,background:"linear-gradient(90deg,#60A5FA,#22D3EE)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>WiseRoute <span style={{fontSize:12,color:C.green,WebkitTextFillColor:C.green}}>LIVE</span></div>
            <div style={{fontSize:10,color:C.muted}}>{location?`📍 ${location.city}`:"Tap to enable location"}</div>
          </div>
          {vehicle&&<div style={{marginLeft:"auto",textAlign:"right"}}><div style={{fontSize:11,color:fuelPct>25?C.green:C.red,fontWeight:700}}>{fuelPct}%</div><div style={{fontSize:10,color:C.muted}}>~{milesLeft||"?"}mi</div></div>}
        </div>
      </div>
      <div style={{padding:"18px 14px 90px"}}>
        {screen==="home"  &&<HomeScreen/>}
        {screen==="nearby"&&<NearbyScreen/>}
        {screen==="drive" &&<DriveScreen/>}
        {screen==="setup" &&<SetupScreen/>}
      </div>
      <div style={{display:"flex",background:"#060A14",borderTop:`1px solid ${C.border}`,position:"fixed",bottom:0,width:"100%",maxWidth:430,zIndex:50}}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>{if(n.id==="nearby"&&!location){getLocation();setScreen("nearby");}else setScreen(n.id);}} style={{flex:1,padding:"10px 2px 8px",background:"none",border:"none",color:screen===n.id?C.accent:C.muted,fontSize:9,fontWeight:screen===n.id?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,borderTop:screen===n.id?`2px solid ${C.accent}`:"2px solid transparent"}}>
            <span style={{fontSize:17}}>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>
    </div>
  );
}
