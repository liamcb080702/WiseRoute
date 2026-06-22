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


const LOGO_B64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD4yor0j/hSvjz/AJ87L/wNj/xo/wCFKePP+fOy/wDA1P8AGq5X2I9pDueb0V6R/wAKT8ef8+Vl/wCBqf40v/CkvHv/AD5WX/gan+NHK+we0h3PNqK9K/4Ul49/58rL/wADU/xpP+FJePf+fKy/8DY/8aOV9g9pDuebUV6T/wAKT8e/8+Vl/wCBqf40n/ClPHn/AD52X/gan+NHK+we0h3PN6K9H/4Ut47/AOfOy/8AAxP8aP8AhSvjv/nzsf8AwNT/ABo5X2D2sO59RDrUgWkUc1ZiQYyRXRc85IYkZOKu2thLOrONkcSkBpZHCIpPQEnuew6nsKtQaZeeSk7W5EUhUK5IxycDvmsi+uzqOu6jA2oiw0rS5rsNKx2rZWtmwikmBxkTSytIS4+ZUVEXBbNIpRJZrnSYJ1gkuJnkbO0ERW4bAycefIjEe+2oNO1DRtRVfsM93LuQyKYokuQVHVgIXdyoxyQhA71ix+OtJuZ4tO8P6NrN+pVizy3MkbRIoG13giDMitkbS7DOc9OaxNH0XWr7xdaeKp9LXTfs+oRXbx2aBzCYmBCQbGZYzKAPNeQr16E8Fl8sep3pt1e1ju7eWG5tZSRHPBIHjcjqAR0I7qcEdwKgeL2rPsprvRPFsIvZmng1Ga1S+UnJminm8jk/xSQSvG0ch+bYzoxIAx1E2k3gSZ1gLpCzK7gjGVOD3z2pbEOK6GCyEVGwOcCrkyiq7g9qZDQ9BzVyFc4zVNDyKuwEDFDKRft1AORwfUVgeNtBeWbVdShtpbzSdWhm/tm1tv8Aj4tzKq+dLGozvjZo45SACUdCcFGbHQW7dBWjYTmC6hnU/NHIrjBx0Oeo5FTsUnY8K0rUtW8Gan5yx2XiTTNYltLcM0h8q/kRTsdpnY/ZpwjAhW3RspJUkYx6ZbeJPDeq2ml+M9O1S5hisC1q1hKFUxTRh3KSjP7vaHdn2nZMoXcRsNcB4ssLJtW8WeGbq7K2H9rTxSRxraxsQsxmTBeQbQrSPjaowGYZ5Ipnhv8As2y1+30iwnnZPEeo2VpdW7R2DwkqwEcgjAdcr16ANzk81VjR/iehaRZS6nrdn4lvbeS2sLXyriygnXbLevHloZGQ8xwIzGQbsNIwTACrk6k4DEsfmY8knqah1e216W9u5X8UzXnmxOiGYPZGCYk/vx9lwJT04fGNoAOCamupQxX52kYRoryMgQyuFAaQqvCliC2BwM4JSQ7W0KMowaqScVanYY61TkOTVGbEB5pbu/ttN0+fUL2Qx21uu+Vwpbao6nABOBUTHB607ejRtHIgeN1KsrDIYEYIPtimK5KfEuhwXN5bTanAk1lZi9uF5+SAjIfPQ8EcDnkeoq3Y+JdJuInkF2luFmMIF0RCXYKrfKGOSMMvbvXHweCPDsdjZ2nk3DpaXJuAzTZeXO0eW5x80eEQbfRFqxqHhXS7y6lujcXsE8t3LdtLC6rIHk2btr7dyj5F6H86VkVc6LXbKy8YXcGiXItLnUYZNsP2XUzDdxk4GwsFOV+78rAgdsVd8O+FL/wnayRaXppkN5L5cl02pNezMyg/uwyrhBgklQBnvnFc34b0PTPD/iK21ywWRprW6e6t45mEiRyOcsQSN3OTxnua7F/F2qMgSUwzKRKjhkIDpJgsp2kegwfvDpnHFFg5kRXCXKN5clrOriQRFTE2d5HC9Op7DqaiuLHUwtuzafdYuVLQ4jJ3gHBxj0xVkeMdSBj3Q2TxwSQyW8bRtthaIEIV+bJ4J+8TUEPi7VIdu1bZsJLExZDl45HMhQ89NxyCMH3xRZhdGVdiSKVo5VKOpwysCCp9CD0qszc9an1bULjU9Qkvrt90smAeTgADAAyScACqmadiGz5l/wCF1+Ov+fqw/wDAJKT/AIXV46/5+rD/AMAkrzeiubnl3PS9lDsek/8AC6/Hf/P1Yf8AgElB+Nnjs/8AL1Y/+ASV5tRRzy7h7KHY9JPxr8d/8/dj/wCAaUn/AAuvx1/z9WP/AIBpXm9FHPLuHsodj0f/AIXV46/5+rH/AMA0oPxp8cn/AJerH/wDSvOKKOeXcPZQ7Ho//C6PHP8Az9WP/gGlA+NPjkf8vVj/AOAaV5xRRzy7h7KHY//Z";

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
    const d = await proxyPost("reversegeocode", { lat, lng });
    return d.city || "Your location";
  }catch{ return "Your location"; }
}

const PROXY = "/api/maps";

// Simple proxy-based helpers — all routing through Vercel serverless
// Uses OpenStreetMap (free) for geocoding/routing, Google Places for stations

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

async function geocodeAddress(address){
  return await proxyPost("geocode", { address });
}

async function getDirections(originLat, originLng, destLat, destLng){
  return await proxyPost("directions", { originLat, originLng, destLat, destLng });
}

async function findNearbyStations(lat,lng){
  const r=await fetch(`${PROXY}?action=nearbystations`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({lat,lng})
  });
  const d=await r.json();
  if(d.error)throw new Error(d.error);
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
  const[navDest,setNavDest]=useState("");
  const[navRoute,setNavRoute]=useState(null);
  const[navLoading,setNavLoading]=useState(false);
  const[navActive,setNavActive]=useState(false);
  const[navStep,setNavStep]=useState(0);
  const[navAiNote,setNavAiNote]=useState("");
  const[navSuggestStop,setNavSuggestStop]=useState(null);
  const[navError,setNavError]=useState("");
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
      setStations(found);
      const livePrices={};
      found.forEach(s=>{if(s.livePrice)livePrices[s.id]=s.livePrice;});
      if(Object.keys(livePrices).length>0)setGasPrices(p=>({...p,...livePrices}));
      // AI prices for stations missing prices
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
      }
    }catch(e){setLocError("Could not load stations: "+e.message);}
    setStLoading(false);
  };

  useEffect(()=>{if(location)loadStations(location.lat,location.lng);},[location?.lat,location?.lng]);

  // Drive mode timer
  useEffect(()=>{
    if(driving){iRef.current=setInterval(()=>{setSimFuel(p=>Math.max(0,+(p-0.3).toFixed(2)));setMilesDriven(p=>+(p+mpg*0.003).toFixed(1));},800);}
    else clearInterval(iRef.current);
    return()=>clearInterval(iRef.current);
  },[driving,mpg]);

  const scoreS=s=>(3.60-(gasPrices[s.id]||3.50))*25+(s.rating||3)*8-s.distanceMi*1.5;
  const sorted=[...stations].sort((a,b)=>sortBy==="price"?(gasPrices[a.id]||99)-(gasPrices[b.id]||99):sortBy==="rating"?(b.rating||0)-(a.rating||0):scoreS(b)-scoreS(a));
  const urgency=simFuel<=15?"now":simFuel<=30?"soon":"ok";
  const U={ok:{col:C.green,bg:"#0A2818",label:"Range OK",icon:"✅"},soon:{col:C.yellow,bg:"#1A1200",label:"Fill Up Soon",icon:"⚠️"},now:{col:C.red,bg:"#1A0800",label:"Fill Up NOW",icon:"🚨"}};
  const urg=U[urgency];

  // ══ NAV SCREEN — with Places Autocomplete ════════════
  function NavScreen(){
    const[inputVal,setInputVal]=useState(navDest||"");
    const[suggestions,setSuggestions]=useState([]);
    const[sugLoading,setSugLoading]=useState(false);
    const[loading,setLoading]=useState(false);
    const[err,setErr]=useState("");
    const[showSuggestions,setShowSuggestions]=useState(false);
    const debounceRef=useRef(null);

    // Autocomplete via proxy (OpenStreetMap Photon) — free, no key needed
    const fetchSuggestions=async(val)=>{
      if(!val||val.length<2){setSuggestions([]);return;}
      setSugLoading(true);
      try{
        const d = await proxyPost("autocomplete", { input: val, lat: location?.lat, lng: location?.lng });
        setSuggestions(d.predictions || []);
      }catch(e){ setSuggestions([]); }
      setSugLoading(false);
    };

    const handleInput=(val)=>{
      setInputVal(val);
      setShowSuggestions(true);
      if(debounceRef.current)clearTimeout(debounceRef.current);
      debounceRef.current=setTimeout(()=>fetchSuggestions(val),350);
    };

    const selectSuggestion=(desc)=>{
      setInputVal(desc);
      setSuggestions([]);
      setShowSuggestions(false);
    };

    const startNav=async(destOverride)=>{
      const d=destOverride||inputVal;
      if(!d.trim()){setErr("Please enter a destination.");return;}
      if(!location){setErr("Enable location first on the Home screen.");return;}
      setLoading(true);setErr("");setSuggestions([]);setShowSuggestions(false);
      try{
        const destCoords=await geocodeAddress(d);
        const route=await getDirections(location.lat,location.lng,destCoords.lat,destCoords.lng);
        const totalMi=route.totalMiles;
        const canMakeIt=milesLeft&&milesLeft>totalMi;
        const vDesc=vehicle?`${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.mpg||"electric"} MPG, ${ts}gal)`:"unknown vehicle";
        const aiNote=await askClaudeAI(`WiseRoute navigation. Driver: ${vDesc}, ${fuelPct}% fuel (~${milesLeft||"?"} miles range). Route: ${location.city} to ${destCoords.formatted}, ${totalMi} miles. ${canMakeIt?"Enough fuel to make it — give 1 sentence tip on whether to top off first.":"Not enough fuel — give 1 sentence on where to stop."}`);
        let suggestStop=null;
        if(!canMakeIt&&stations.length>0)suggestStop=[...stations].sort((a,b)=>scoreS(b)-scoreS(a))[0];
        setNavDest(d);
        setNavRoute({...route,destName:destCoords.formatted});
        setNavAiNote(aiNote);
        setNavSuggestStop(suggestStop);
        setNavStep(0);
        setNavActive(true);
      }catch(e){setErr("Could not find that location. Try a more specific address.");}
      setLoading(false);
    };

    // Active navigation view
    if(navActive&&navRoute){
      return(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div><div style={{fontSize:20,fontWeight:900}}>Navigating</div><div style={{fontSize:12,color:C.muted,marginTop:2,maxWidth:260}}>{navRoute.destName}</div></div>
            <button onClick={()=>{setNavActive(false);setNavRoute(null);setNavDest("");setInputVal("");}} style={{background:C.red+"22",border:`1px solid ${C.red}44`,borderRadius:10,padding:"8px 14px",color:C.red,fontSize:12,fontWeight:700,cursor:"pointer"}}>✕ End</button>
          </div>
          <div style={{background:"linear-gradient(135deg,#0A2040,#081830)",border:`1px solid ${C.accent}44`,borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{display:"flex",gap:20,marginBottom:10}}>
              <div><div style={{fontSize:22,fontWeight:900,color:"#60A5FA"}}>{navRoute.totalMiles} mi</div><div style={{fontSize:11,color:C.muted}}>distance</div></div>
              <div><div style={{fontSize:22,fontWeight:900,color:C.teal}}>{navRoute.totalTime}</div><div style={{fontSize:11,color:C.muted}}>est. time</div></div>
              {milesLeft&&<div><div style={{fontSize:22,fontWeight:900,color:milesLeft>navRoute.totalMiles?C.green:C.red}}>~{milesLeft} mi</div><div style={{fontSize:11,color:C.muted}}>fuel range</div></div>}
            </div>
            <FuelBar p={fuelPct}/>
            <div style={{fontSize:12,color:milesLeft&&milesLeft>navRoute.totalMiles?C.green:C.red,marginTop:4,fontWeight:600}}>
              {milesLeft&&milesLeft>navRoute.totalMiles?"✓ Enough fuel to reach destination":"⚠️ Not enough fuel — stop recommended"}
            </div>
          </div>
          {navAiNote&&<div style={{background:"linear-gradient(135deg,#081830,#0A2020)",border:`1px solid #1E4A7F`,borderRadius:14,padding:14,marginBottom:14}}><div style={{display:"flex",gap:8,marginBottom:6}}><span>🤖</span><span style={{fontWeight:700,fontSize:13,color:"#60A5FA"}}>AI Fuel Analysis</span></div><div style={{fontSize:13,color:"#CBD5E1",lineHeight:1.6}}>{navAiNote}</div></div>}
          {navSuggestStop&&<div style={{background:"linear-gradient(135deg,#1A0A00,#1A1200)",border:`1px solid ${C.yellow}44`,borderRadius:14,padding:14,marginBottom:14}}><div style={{fontWeight:700,color:C.yellow,marginBottom:8}}>⚠️ Recommended Fuel Stop</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700}}>{navSuggestStop.name}</div><div style={{fontSize:12,color:C.muted}}>{navSuggestStop.distanceMi} mi</div></div>{gasPrices[navSuggestStop.id]&&<div style={{fontSize:20,fontWeight:900,color:C.green}}>${gasPrices[navSuggestStop.id].toFixed(2)}</div>}</div></div>}
          {navRoute.steps[navStep]&&(
            <div style={{background:C.card,border:`2px solid ${C.accent}`,borderRadius:16,padding:18,marginBottom:10}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>STEP {navStep+1} OF {navRoute.steps.length}</div>
              <div style={{fontSize:18,fontWeight:800,marginBottom:8,lineHeight:1.3}}>{navRoute.steps[navStep].instruction}</div>
              <div style={{fontSize:13,color:C.muted}}>{navRoute.steps[navStep].distance} · {navRoute.steps[navStep].duration}</div>
            </div>
          )}
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <button onClick={()=>setNavStep(s=>Math.max(0,s-1))} disabled={navStep===0} style={{flex:1,background:C.muted+"22",border:`1px solid ${C.border}`,borderRadius:12,padding:"12px",color:C.muted,fontSize:13,fontWeight:700,cursor:"pointer",opacity:navStep===0?.4:1}}>← Back</button>
            <button onClick={()=>setNavStep(s=>Math.min(navRoute.steps.length-1,s+1))} disabled={navStep>=navRoute.steps.length-1} style={{flex:1,background:C.green+"22",border:`1px solid ${C.green}44`,borderRadius:12,padding:"12px",color:C.green,fontSize:13,fontWeight:700,cursor:"pointer",opacity:navStep>=navRoute.steps.length-1?.4:1}}>Next →</button>
          </div>
          <Card>
            <Sec t="All Steps"/>
            <div style={{maxHeight:280,overflowY:"auto"}}>
              {navRoute.steps.map((step,i)=>(
                <div key={i} onClick={()=>setNavStep(i)} style={{display:"flex",gap:12,padding:"10px 16px",margin:"0 -16px",borderBottom:`1px solid ${C.border}`,cursor:"pointer",background:i===navStep?"#1A2F50":"transparent"}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:i===navStep?C.accent:i<navStep?C.green+"44":C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:i===navStep?"#fff":i<navStep?C.green:C.muted,flexShrink:0}}>{i<navStep?"✓":i+1}</div>
                  <div><div style={{fontSize:13,fontWeight:i===navStep?700:400,lineHeight:1.4}}>{step.instruction}</div><div style={{fontSize:11,color:C.muted}}>{step.distance} · {step.duration}</div></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    // Destination search with autocomplete
    return(
      <div>
        <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>AI Navigation</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Smart routing that adapts to your fuel level.</div>
        <Card style={{overflow:"visible",position:"relative",zIndex:20}}>
          <Sec t="Where are you going?"/>
          {/* Autocomplete input */}
          <div style={{position:"relative",marginBottom:showSuggestions&&suggestions.length>0?0:12}}>
            <input
              type="search"
              value={inputVal}
              placeholder="Search city, address, or place…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="on"
              spellCheck="false"
              onChange={e=>handleInput(e.target.value)}
              onFocus={()=>inputVal.length>1&&setShowSuggestions(true)}
              onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();startNav();}}}
              style={{width:"100%",background:"#060A14",border:`2px solid ${C.accent}`,borderRadius:suggestions.length>0&&showSuggestions?"10px 10px 0 0":"10px",padding:"14px 42px 14px 14px",color:C.text,fontSize:16,outline:"none",boxSizing:"border-box"}}
            />
            {sugLoading&&<div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)"}}><Spinner/></div>}
            {inputVal&&!sugLoading&&<button onClick={()=>{setInputVal("");setSuggestions([]);setShowSuggestions(false);}} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.muted,fontSize:18,cursor:"pointer",padding:"4px"}}>✕</button>}
          </div>
          {/* Suggestions dropdown */}
          {showSuggestions&&suggestions.length>0&&(
            <div style={{background:"#060A14",border:`1px solid ${C.accent}`,borderTop:"none",borderRadius:"0 0 10px 10px",marginBottom:12,maxHeight:220,overflowY:"auto"}}>
              {suggestions.map((s,i)=>(
                <div key={i} onClick={()=>{selectSuggestion(s.description);startNav(s.description);}} style={{padding:"12px 14px",borderBottom:i<suggestions.length-1?`1px solid ${C.border}`:"none",cursor:"pointer",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:16,marginTop:1}}>📍</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:C.text}}>{s.structured_formatting?.main_text||s.description.split(",")[0]}</div>
                    <div style={{fontSize:11,color:C.muted,marginTop:2}}>{s.structured_formatting?.secondary_text||s.description.split(",").slice(1).join(",").trim()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {vehicle&&<div style={{fontSize:12,color:C.muted,marginBottom:12,padding:"8px 12px",background:"#ffffff08",borderRadius:8}}>{vehicle.year} {vehicle.make} {vehicle.model} · {fuelPct}% fuel{milesLeft?` · ~${milesLeft} mi range`:""}</div>}
          {!location&&<div style={{fontSize:12,color:C.yellow,marginBottom:12,padding:"8px 12px",background:C.yellow+"18",borderRadius:8}}>⚠️ Enable location on the Home screen first</div>}
          {err&&<div style={{fontSize:11,color:C.red,marginBottom:12,padding:"8px 12px",background:C.red+"18",borderRadius:8,lineHeight:1.5}}>{err}</div>}
          <Btn onClick={()=>startNav()} disabled={loading||!location||!inputVal.trim()}>{loading?"Planning route…":"Start Navigation →"}</Btn>
        </Card>

        {/* Gas station quick nav */}
        {sorted.length>0&&(
          <Card>
            <Sec t="Navigate to a Gas Station"/>
            {sorted.slice(0,5).map(s=>(
              <div key={s.id} onClick={()=>startNav(s.address||s.name)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
                <div><div style={{fontWeight:600,fontSize:13}}>{s.name}</div><div style={{fontSize:11,color:C.muted}}>{s.distanceMi} mi · {(s.address||"").split(",")[0]}</div></div>
                <div style={{textAlign:"right"}}>{gasPrices[s.id]?<div style={{fontWeight:800,color:C.green}}>${gasPrices[s.id].toFixed(2)}</div>:priceLoading?<Spinner/>:null}<div style={{fontSize:10,color:C.muted}}>/gal</div></div>
              </div>
            ))}
          </Card>
        )}
      </div>
    );
  }

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
            <Btn onClick={()=>setScreen("nav")} outline style={{flex:1,padding:"11px 12px",fontSize:13}}>🗺️ Navigate</Btn>
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

  // ══ DRIVE SCREEN ═══════════════════════════════════════
  function DriveScreen(){
    const gallonsNow=(ts*simFuel)/100;
    const milesNow=Math.round(gallonsNow*mpg);
    const top=sorted[0];
    const getDriveAi=async()=>{
      setDriveAiLoading(true);setDriveAi("");
      const tip=await askClaudeAI(`WiseRoute Drive AI: ${simFuel.toFixed(0)}% fuel (~${milesNow} miles range), driven ${milesDriven.toFixed(1)} miles. ${top?`Best nearby: ${top.name}, ${top.distanceMi}mi, ${gasPrices[top.id]?"$"+gasPrices[top.id]+"/gal":"price unknown"}`:"no stations loaded"}. 2 sentences: stop now or keep going?`);
      setDriveAi(tip);setDriveAiLoading(false);
    };
    return(
      <div>
        <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>Drive Mode</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Real-time fuel tracking. No destination needed.</div>
        <div style={{background:urg.bg,border:`1px solid ${urg.col}44`,borderRadius:16,padding:16,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>{urg.icon}</span><div><div style={{fontWeight:800,fontSize:17,color:urg.col}}>{urg.label}</div><div style={{fontSize:12,color:C.sub}}>~{milesNow} mi · {gallonsNow.toFixed(1)} gal left</div></div></div>
          <FuelBar p={simFuel}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}}>
            {[[`~${milesNow}`,"Miles left"],[`${gallonsNow.toFixed(1)}`,"Gals left"],[`${milesDriven}`,"Miles driven"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center",background:"#00000030",borderRadius:10,padding:"8px 4px"}}><div style={{fontSize:17,fontWeight:800}}>{v}</div><div style={{fontSize:10,color:C.muted}}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <button onClick={()=>setDriving(true)} disabled={driving||simFuel<=0} style={{background:driving?"#0A2818":C.green+"22",border:`1px solid ${C.green}44`,borderRadius:12,padding:"13px",color:C.green,fontSize:14,fontWeight:700,cursor:driving?"default":"pointer",opacity:driving?.5:1}}>{driving?"🟢 Driving…":"▶ Start Drive"}</button>
          <button onClick={()=>setDriving(false)} disabled={!driving} style={{background:!driving?"#0A0F1C":C.red+"22",border:`1px solid ${C.red}44`,borderRadius:12,padding:"13px",color:C.red,fontSize:14,fontWeight:700,cursor:!driving?"default":"pointer",opacity:!driving?.4:1}}>⏹ Pause</button>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <button onClick={()=>{setSimFuel(fuelPct);setMilesDriven(0);setDriving(false);setDriveAi("");}} style={{flex:1,background:"none",border:`1px solid ${C.border}`,borderRadius:10,padding:"8px",color:C.muted,fontSize:12,cursor:"pointer"}}>↺ Reset</button>
          <button onClick={()=>setSimFuel(f=>Math.min(100,+(f+25).toFixed(0)))} style={{flex:1,background:"none",border:`1px solid ${C.accent}44`,borderRadius:10,padding:"8px",color:"#60A5FA",fontSize:12,cursor:"pointer"}}>⛽ Simulate Fill-Up</button>
        </div>
        {top&&(
          <div style={{background:"linear-gradient(135deg,#0A2030,#0A2010)",border:`1px solid ${urg.col}55`,borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{fontWeight:800,fontSize:13,color:urg.col,marginBottom:8}}>{urgency==="now"?"🚨 Stop Here Now →":urgency==="soon"?"⚠️ Recommended Stop":"⛽ Best Nearby"}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div><div style={{fontWeight:700,fontSize:15}}>{top.name}</div><div style={{fontSize:12,color:C.muted}}>{top.distanceMi} mi away</div>{top.rating&&<div style={{fontSize:12,color:C.yellow}}>★ {top.rating}</div>}</div>
              <div style={{textAlign:"right"}}>{gasPrices[top.id]?<><div style={{fontSize:22,fontWeight:900,color:C.green}}>${gasPrices[top.id].toFixed(2)}</div><div style={{fontSize:10,color:C.muted}}>/gal · live</div></>:<div style={{fontSize:12,color:C.muted}}>Price TBD</div>}</div>
            </div>
            <button onClick={()=>{setNavDest(top.address||top.name);setNavActive(false);setNavRoute(null);setScreen("nav");}} style={{width:"100%",background:C.green+"22",border:`1px solid ${C.green}44`,borderRadius:10,padding:"10px",color:C.green,fontSize:12,fontWeight:700,cursor:"pointer"}}>🗺️ Navigate with WiseRoute</button>
          </div>
        )}
        <div style={{background:"linear-gradient(135deg,#081830,#0A1F30)",border:`1px solid #1E4A7F`,borderRadius:14,padding:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span>🤖</span><span style={{fontWeight:700,fontSize:13,color:"#60A5FA"}}>AI Driving Advisor</span><button onClick={getDriveAi} style={{marginLeft:"auto",background:C.accent+"22",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"4px 10px",color:"#60A5FA",fontSize:11,cursor:"pointer"}}>{driveAiLoading?<Spinner/>:"Ask AI"}</button></div>
          {driveAi?<div style={{fontSize:13,color:"#CBD5E1",lineHeight:1.6}}>{driveAi}</div>:<div style={{fontSize:13,color:C.muted}}>Tap "Ask AI" for a recommendation based on your current fuel level.</div>}
        </div>
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

  const NAV=[{id:"home",label:"Home",icon:"🏠"},{id:"nearby",label:"Near Me",icon:"📍"},{id:"nav",label:"Navigate",icon:"🗺️"},{id:"drive",label:"Drive",icon:"🛣️"},{id:"setup",label:"My Car",icon:"🚗"}];

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
        {screen==="nav"   &&<NavScreen/>}
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
