"use strict";

const Event = require("../models/Event");

function mockData() {
  return [
    new Event({
        
        title: "Pierre-Laurent Aimard",
        description: "Pierre-Laurent Aimard concert",
        price: "€19,50",
        date: "2021-12-21",
        photo: '',
        address: "Casa da Música, Porto",
        categoryId: "5fe1ce79374b794890535f47" 
    }),
    new Event({
        title: "Porto - Benfica",
        description: "Portuguese Football League regular game",
        price: "€25",
        date: "2021-12-21",
        photo: '',
        address: "Estádio do Dragão",
        categoryId: "5fe1ce79374b794890535f46" 
    }),
    new Event({
        title: "Nos Primavera Sound 2021",
        description: "Summer Festival" ,
        price: "€50",
        date: "2021-6-10",
        photo: '',
        address: "Parque da Cidade, Porto",
        categoryId: "5fe1ce79374b794890535f47" 
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