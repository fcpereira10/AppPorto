"use strict";

const Event = require("../models/Event");

function mockData() {
  return [
    new Event({
        
        title: "Pierre-Laurent Aimard",
        description: "Pierre-Laurent Aimard concert",
        price: "€19,50",
        date: "2021-12-21",
        address: "Casa da Música, Porto",
        categoryId: "5fe4b46fb8bb5a9c591517da" 
    }),
    new Event({
        title: "Porto - Benfica",
        description: "Portuguese Football League regular game",
        price: "€25",
        date: "2021-12-21",
        address: "Estádio do Dragão",
        categoryId: "5fe4b46fb8bb5a9c591517d9" 
    }),
    new Event({
        title: "Nos Primavera Sound 2021",
        description: "Summer Festival" ,
        price: "€50",
        date: "2021-6-10",
        address: "Parque da Cidade, Porto",
        categoryId: "5fe4b46fb8bb5a9c591517db" 
      }),

  ];
}

function seedEvent() {
  const events = mockData();
  Event.find({})
    .deleteMany()
    .then(() => {
      Event.create(events, (err) => {
        if (err) {
          console.error(`Error seeding category: ${err}`);
        }
      });
    });
    console.log(events);
  return {events};
}

module.exports = { seedEvent };