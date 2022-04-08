/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */

import { v4 as uuid } from "uuid";

export const videos = [
  {
    _id: uuid(),
    title: "Liam Livingstone Smashes England's Fastest EVER T20I 100 Off Just 42 Balls | England v Pakistan 2021",
    creatorName: "England & Wales Cricket Board",
    thumbNail: "https://img.youtube.com/vi/prD47bzbxcs/mqdefault.jpg",
    viewCount: 1200345,
    category: "Cricket",
    videoURL: "https://www.youtube.com/watch?v=prD47bzbxcs",
  },
  {
    _id: uuid(),
    title: "Brilliant Stokes & Roy Guide England to Series Win | England v Pakistan 4th ODI 2019 - Highlights",
    creatorName: "SonyLIV",
    thumbNail: "https://img.youtube.com/vi/Imz1VpONgI4/mqdefault.jpg",
    viewCount: 110345,
    category: "Cricket",
    videoURL: "https://www.youtube.com/watch?v=Imz1VpONgI4",
  },
  {
    _id: uuid(),
    title: "India V South Africa 5th ODI,2005 @ Wankhede Stadium, Mumbai",
    creatorName: "CRICKET EPICS",
    thumbNail: "https://img.youtube.com/vi/QnS9nN3TyZI/mqdefault.jpg",
    viewCount: 10345,
    category: "Cricket",
    videoURL: "https://www.youtube.com/watch?v=QnS9nN3TyZI",
  },
  {
    _id: uuid(),
    title: "Lionel Messi vs Nigeria Sync Free to use make sure to credit",
    creatorName: "goatedan",
    thumbNail: "https://img.youtube.com/vi/yAM3J8mj9rM/mqdefault.jpg",
    viewCount: 134522,
    category: "Football",
    videoURL: "https://www.youtube.com/watch?v=yAM3J8mj9rM",
  },
  {
    _id: uuid(),
    title: "The Day Cristiano Ronaldo Taught Football to Neymar & Mbappe",
    creatorName: "Alsido Football",
    thumbNail: "https://img.youtube.com/vi/QXhV148EryQ/mqdefault.jpg",
    viewCount: 1200345,
    category: "Football",
    videoURL: "https://www.youtube.com/watch?v=QXhV148EryQ",
  },
  {
    _id: uuid(),
    title: "Korea Open Badminton Championships 2022 | Day 3 | Court 1 | Round of 16",
    creatorName: "BWF TV",
    thumbNail: "https://img.youtube.com/vi/MDpGgXOQiaE/mqdefault.jpg",
    viewCount: 1200345,
    category: "Badminton",
    videoURL: "https://www.youtube.com/watch?v=MDpGgXOQiaE",
  },
  {
    _id: uuid(),
    title: "Saina Nehwal Wins Badminton Women's Singles Bronze - IND v CHN | London 2012 Olympics",
    creatorName: "Olympics",
    thumbNail: "https://img.youtube.com/vi/HucIqi8Lw3E/mqdefault.jpg",
    viewCount: 9984215,
    category: "Badminton",
    videoURL: "https://www.youtube.com/watch?v=HucIqi8Lw3E",
  },
];
