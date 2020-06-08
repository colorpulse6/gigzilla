const tour = require("../models/tour.model");
const mongoose = require("mongoose");
require("../configs/db.config");

const tours = [
  {
    name: "Life Less Ordinary",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Munich" }],
  },
  {
    name: "Stand and Deliver",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Paris" },
      { name: "Paris" },
      { name: "London" },
      { name: "Copenhagen" },
    ],
  },
  {
    name: "Unknown Pleasures",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Barcelona" }, { name: "Hamburg" }],
  },
  {
    name: "Where the Rivers Flow North",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Stockholm" }, { name: "Rome" }, { name: "Warsaw" }],
  },
  {
    name: "49 Up",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Madrid" },
      { name: "Milan" },
      { name: "Rome" },
      { name: "Munich" },
    ],
  },
  {
    name: "Legend of the Boneknapper Dragon",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Budapest" }, { name: "Lisbon" }, { name: "Copenhagen" }],
  },
  {
    name: "Lonely Villa",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Munich" }, { name: "Munich" }, { name: "Oslo" }],
  },
  {
    name: "Sasayaki",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }, { name: "Stockholm" }, { name: "Milan" }],
  },
  {
    name: "7 Seconds",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "London" }, { name: "Dublin" }, { name: "Rome" }],
  },
  {
    name: "Final Cut",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Montpellier" }, { name: "Dublin" }, { name: "Dublin" }],
  },
  {
    name: "Blade: Trinity",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Montpellier" }, { name: "Vienna" }],
  },
  {
    name: "9500 Liberty",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Montpellier" },
      { name: "Stockholm" },
      { name: "Dublin" },
      { name: "Montpellier" },
    ],
  },
  {
    name: "Back to the Future",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Barcelona" }, { name: "Copenhagen" }],
  },
  {
    name: "Suitor",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Dublin" }, { name: "Munich" }, { name: "Paris" }],
  },
  {
    name: "Pigsty",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Barcelona" }, { name: "Hamburg" }],
  },
  {
    name: "Brothers",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Madrid" },
      { name: "London" },
      { name: "Prague" },
      { name: "Munich" },
    ],
  },
  {
    name: "Queen Bee",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Oslo" }, { name: "Budapest" }, { name: "Warsaw" }],
  },
  {
    name: "Takers",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Barcelona" }, { name: "Milan" }, { name: "Warsaw" }],
  },
  {
    name: "In a Town This Size",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Montpellier" },
      { name: "Milan" },
      { name: "Madrid" },
      { name: "Dublin" },
    ],
  },
  {
    name: "State Property 2",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Paris" }, { name: "Montpellier" }, { name: "Amsterdam" }],
  },
  {
    name: "Rosetta",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }, { name: "Vienna" }, { name: "Amsterdam" }],
  },
  {
    name: "The Big Flame",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Rome" }, { name: "Madrid" }, { name: "Paris" }],
  },
  {
    name: "Cops",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Warsaw" },
      { name: "Vienna" },
      { name: "Amsterdam" },
      { name: "Milan" },
      { name: "Madrid" },
    ],
  },
  {
    name: "Generation",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Rome" },
      { name: "Hamburg" },
      { name: "Barcelona" },
      { name: "Vienna" },
    ],
  },
  {
    name: "High and Dry",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Dublin" },
      { name: "Stockholm" },
      { name: "London" },
      { name: "Copenhagen" },
      { name: "Madrid" },
    ],
  },
  {
    name: "Resistance",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Warsaw" },
      { name: "Milan" },
      { name: "Barcelona" },
      { name: "Barcelona" },
    ],
  },
  {
    name: "Das Lied",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Berlin" },
      { name: "London" },
      { name: "Madrid" },
      { name: "Milan" },
    ],
  },
  {
    name: "Man from Snowy River",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "London" }, { name: "Lisbon" }, { name: "Vienna" }],
  },
  {
    name: "Slingshot",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Berlin" },
      { name: "Warsaw" },
      { name: "Madrid" },
      { name: "Warsaw" },
      { name: "Lisbon" },
    ],
  },
  {
    name: "Naked Spur",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Dublin" }, { name: "Warsaw" }, { name: "Madrid" }],
  },
  {
    name: "Off Beat",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }, { name: "London" }],
  },
  {
    name: "Heroic Ones",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Vienna" },
      { name: "Stockholm" },
      { name: "Vienna" },
      { name: "Prague" },
    ],
  },
  {
    name: "Repo Men",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Vienna" },
      { name: "Warsaw" },
      { name: "London" },
      { name: "Oslo" },
      { name: "Copenhagen" },
    ],
  },
  {
    name: "The Woman on Pier 13",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Paris" },
      { name: "Lisbon" },
      { name: "Barcelona" },
      { name: "Madrid" },
      { name: "Oslo" },
    ],
  },
  {
    name: "Highway 61",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Rome" }, { name: "Copenhagen" }],
  },
  {
    name: "Robin Hood",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Prague" }],
  },
  {
    name: "Tapeheads",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Paris" }, { name: "Berlin" }],
  },
  {
    name: "Spring Breakers",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Milan" },
      { name: "Oslo" },
      { name: "Prague" },
      { name: "Montpellier" },
      { name: "Warsaw" },
    ],
  },
  {
    name: "Last House on the Left",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Hamburg" }],
  },
  {
    name: "Garden",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Rome" }, { name: "Copenhagen" }, { name: "Stockholm" }],
  },
  {
    name: "Bon Cop, Bad Cop",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Milan" }, { name: "Copenhagen" }],
  },
  {
    name: "Sitter",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Dublin" }, { name: "Madrid" }],
  },
  {
    name: "Cloud-Capped Star",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Oslo" },
      { name: "Budapest" },
      { name: "Vienna" },
      { name: "Lisbon" },
    ],
  },
  {
    name: "Chaos",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Dublin" }, { name: "Amsterdam" }],
  },
  {
    name: "Cube 2: Hypercube",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Dublin" }],
  },
  {
    name: "Madeinusa",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Copenhagen" }],
  },
  {
    name: "She's Having a Baby",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Amsterdam" },
      { name: "Vienna" },
      { name: "Oslo" },
      { name: "Prague" },
    ],
  },
  {
    name: "Big Shot",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }],
  },
  {
    name: "Sheltering Sky",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Montpellier" }],
  },
  {
    name: "Django, Kill...",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Hamburg" },
      { name: "Stockholm" },
      { name: "Stockholm" },
      { name: "Oslo" },
      { name: "Budapest" },
    ],
  },
  {
    name: "Benny Goodman Story",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Milan" },
      { name: "Stockholm" },
      { name: "Berlin" },
      { name: "Prague" },
    ],
  },
  {
    name: "She's Out of My League",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Stockholm" },
      { name: "Copenhagen" },
      { name: "Budapest" },
      { name: "London" },
      { name: "London" },
    ],
  },
  {
    name: "Yellow Sky",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Berlin" }],
  },
  {
    name: "Pleasures of the Flesh",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Budapest" },
      { name: "Prague" },
      { name: "Rome" },
      { name: "Hamburg" },
      { name: "Rome" },
    ],
  },
  {
    name: "Roommate",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Lisbon" }, { name: "Oslo" }, { name: "Rome" }],
  },
  {
    name: "Nymphomaniac: Volume II",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }, { name: "Montpellier" }],
  },
  {
    name: "Unzipped",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Warsaw" },
      { name: "Amsterdam" },
      { name: "Montpellier" },
      { name: "Budapest" },
    ],
  },
  {
    name: "Loveless",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Copenhagen" }, { name: "Madrid" }],
  },
  {
    name: "Duel at Silver Creek",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Milan" }, { name: "Milan" }],
  },
  {
    name: "8 Mile",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Madrid" }, { name: "Prague" }, { name: "Barcelona" }],
  },
  {
    name: "Power of One",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Rome" }],
  },
  {
    name: "Visitors",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Lisbon" },
      { name: "Barcelona" },
      { name: "Milan" },
      { name: "Berlin" },
      { name: "Copenhagen" },
    ],
  },
  {
    name: "Hunt for Red October",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Budapest" }],
  },
  {
    name: "Animal Room",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Rome" },
      { name: "Copenhagen" },
      { name: "Vienna" },
      { name: "Madrid" },
      { name: "Madrid" },
    ],
  },
  {
    name: "The Facility",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Oslo" }],
  },
  {
    name: "Stargate",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }],
  },
  {
    name: "Sheep Has Five Legs",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Budapest" }, { name: "Copenhagen" }],
  },
  {
    name: "Les Hautes Solitudes",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Paris" },
      { name: "Montpellier" },
      { name: "Barcelona" },
      { name: "Madrid" },
      { name: "Hamburg" },
    ],
  },
  {
    name: "Dinner",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Berlin" }, { name: "Prague" }],
  },
  {
    name: "Dirty Love",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Munich" },
      { name: "Munich" },
      { name: "Dublin" },
      { name: "London" },
    ],
  },
  {
    name: "Friday the 13th Part 3",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Montpellier" },
      { name: "Paris" },
      { name: "Budapest" },
      { name: "Paris" },
      { name: "Munich" },
    ],
  },
  {
    name: "Open Season 3",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Copenhagen" },
      { name: "Hamburg" },
      { name: "Montpellier" },
    ],
  },
  {
    name: "Summer of '42",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Prague" },
      { name: "Hamburg" },
      { name: "Budapest" },
      { name: "Paris" },
    ],
  },
  {
    name: "Rocky V",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Lisbon" }, { name: "Oslo" }, { name: "Hamburg" }],
  },
  {
    name: "Hunger",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Paris" }, { name: "Hamburg" }],
  },
  {
    name: "Scream 4",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Berlin" }, { name: "Paris" }, { name: "Barcelona" }],
  },
  {
    name: "Midsummer Night's Sex Comedy",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Montpellier" },
      { name: "Budapest" },
      { name: "Barcelona" },
    ],
  },
  {
    name: "Habana Blues",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Milan" }, { name: "Amsterdam" }, { name: "Hamburg" }],
  },
  {
    name: "Life is a Miracle",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Stockholm" },
      { name: "Madrid" },
      { name: "Rome" },
      { name: "Copenhagen" },
      { name: "Milan" },
    ],
  },
  {
    name: "Diamond Men",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Madrid" }, { name: "Paris" }],
  },
  {
    name: "Last Days of Pompeii",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Copenhagen" },
      { name: "Vienna" },
      { name: "Dublin" },
      { name: "Oslo" },
    ],
  },
  {
    name: "Legend of Lylah Clare",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Dublin" }, { name: "Hamburg" }, { name: "Montpellier" }],
  },
  {
    name: "Polytechnique",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Madrid" },
      { name: "Dublin" },
      { name: "Lisbon" },
      { name: "Oslo" },
    ],
  },
  {
    name: "Revenge of Frankenstein",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Montpellier" },
      { name: "Amsterdam" },
      { name: "Lisbon" },
      { name: "Hamburg" },
    ],
  },
  {
    name: "Crane World",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Hamburg" },
      { name: "Berlin" },
      { name: "Hamburg" },
      { name: "Dublin" },
      { name: "Milan" },
    ],
  },
  {
    name: "Memories of Murder",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Budapest" },
      { name: "Stockholm" },
      { name: "Copenhagen" },
      { name: "Hamburg" },
      { name: "Paris" },
    ],
  },
  {
    name: "Oranges",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Paris" },
      { name: "Rome" },
      { name: "Amsterdam" },
      { name: "Madrid" },
      { name: "Paris" },
    ],
  },
  {
    name: "Entertaining Angels",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Munich" }, { name: "Amsterdam" }],
  },
  {
    name: "The Bride Wore Red",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }, { name: "Montpellier" }, { name: "Rome" }],
  },
  {
    name: "Dragon Age: Redemption",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Rome" }],
  },
  {
    name: "Eleventh Year",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Amsterdam" }, { name: "Oslo" }, { name: "Madrid" }],
  },
  {
    name: "Sadist",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Lisbon" }, { name: "Madrid" }, { name: "Vienna" }],
  },
  {
    name: "Phantasm III",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Madrid" }],
  },
  {
    name: "Our Hospitality",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Prague" }],
  },
  {
    name: "Lost Boys: The Tribe",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Lisbon" }],
  },
  {
    name: "Mr. Smith Goes to Washington",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Berlin" }, { name: "Oslo" }, { name: "Barcelona" }],
  },
  {
    name: "Fast and the Furious",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Paris" }],
  },
  {
    name: "Vollidiot",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [{ name: "Oslo" }, { name: "Montpellier" }, { name: "London" }],
  },
  {
    name: "Starship Troopers",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Madrid" },
      { name: "Warsaw" },
      { name: "Paris" },
      { name: "Montpellier" },
      { name: "Hamburg" },
    ],
  },
  {
    name: "Kiki",
    imgUrl: "https://loremflickr.com/g/500/500/music, tour/all",
    cities: [
      { name: "Stockholm" },
      { name: "Milan" },
      { name: "Prague" },
      { name: "Amsterdam" },
    ],
  },
];

tour
  .create(tours)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
