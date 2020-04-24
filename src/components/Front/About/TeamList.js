/*
  This is the file you need to change if you want to add or remove employees from this list.

  ADDING A NEW EMPLOYEE
  Down below, there is something called the TeamList. It is called and array and holds items in it between the brackets []. Each item is separated by a comma.

  Simply copy this object and insert it where in the order you want it to appear:

  {
    name: "employee name here",
    position: "what is their job title?",
    photo: [the name of the photo file to import]
  },

  Each new employee is contained between curly braces {} and separated by a comma ,

  Each point of data (name, position, photo) has the key followed by a colon : followed by the data, followed by a comma.

  To remove an employee, simply delete all of the info about them from this list, from curly brace to curley brace.

  To add a new image, place it in the Headshots folder in this same folder. Images are 200 by 200 pixels.

  Import it with the other photos below:

  const [name] = require ('./Headshots/fileNameHere.jpg');

  Then use the [name] in the 'photo' property of the employee added to the list.

*/

/*-----< Photo Imports >-----*/
const photo_adam = require('./Headshots/Adam.jpg');
const photo_ashley = require('./Headshots/Ashley.jpg');
const photo_bill = require('./Headshots/Bill.jpg');
const photo_eric = require('./Headshots/Eric.jpg');
const photo_erin = require('./Headshots/Erin.jpg');
const photo_ginny = require('./Headshots/Ginny.jpeg');
const photo_jay = require('./Headshots/Jay.jpg');
const photo_laura = require('./Headshots/Laura.jpg');
const photo_marvi = require('./Headshots/Marvi.jpg');
const photo_michael = require('./Headshots/Michael.jpg');
const photo_molly = require('./Headshots/Molly.jpg');
const photo_phil = require('./Headshots/Phil.jpg');
const photo_ray = require('./Headshots/Ray.jpg');
const photo_rob = require('./Headshots/Rob.jpg');
const photo_rolf = require('./Headshots/Rolf.jpg');
const photo_steve = require('./Headshots/Steve.jpg');
const photo_tom = require('./Headshots/Tom.jpg');
const photo_tony = require('./Headshots/Tony.jpg');
const photo_ty = require('./Headshots/Ty.jpg');

/*-----< The Team Array >-----*/
const TeamList = [
  {
    name: `Eric Freeburg`,
    position: `President / Owner`,
    photo: photo_eric
  },
  {
    name: 'Erin Ungerman',
    position: 'Vice President / Director of Sales',
    photo: photo_erin
  },
  {
    name: 'Robert Rudolph',
    position: 'Founder / Key Accounts Manager',
    photo: photo_rob
  },
  {
    name: `Ashley Nelson`,
    position: 'Customer Relationship / Brand Manager',
    photo: photo_ashley
  },
  {
    name: 'Bill Summerville',
    position: 'Customer Relationship Manager',
    photo: photo_bill
  },
  {
    name: 'Ginny McClure',
    position: 'Customer Relationship Manager',
    photo: photo_ginny
  },
  {
    name: 'Molly Westrum',
    position: 'Customer Relationship Manager',
    photo: photo_molly
  },
  {
    name: 'Philip Peacock',
    position: 'Customer Relationship Manager',
    photo: photo_phil
  },
  {
    name: 'Rolf Moe',
    position: 'Customer Relationship Manager',
    photo: photo_rolf
  },
  {
    name: 'Thomas Gill',
    position: 'Customer Relationship Manager',
    photo: photo_tom
  },
  {
    name: 'Marvi Medower',
    position: 'Compliance Manager / Office Guru',
    photo: photo_marvi
  },
  {
    name: 'Michael Wirzylo',
    position: 'Inventory Manager',
    photo: photo_michael
  },
  {
    name: 'Laura Clark',
    position: 'Office Manager',
    photo: photo_laura
  },
  {
    name: `Raistland O'Dell`,
    position: 'F&R Wine / Community Manager',
    photo: photo_ray
  },
  {
    name: 'Steven Thayer',
    position: 'Warehouse Manager',
    photo: photo_steve
  },
  {
    name: 'Adam Johnson',
    position: 'Warehouse Assistant',
    photo: photo_adam
  },
  {
    name: 'Jamion Kilgore',
    position: 'Warehouse / Driver',
    photo: photo_jay
  },
  {
    name: 'Tony Dircz',
    position: 'Warehouse / Driver',
    photo: photo_tony
  },
  {
    name: 'Tyreece Rohr',
    position: 'Warehouse / Driver',
    photo: photo_ty
  },
]

module.exports = TeamList;