const object = {
  name: "George",
  age: 38,
  country: "Rp. Moldova",
  extraData: {
    dataOfBirth: "1.1.1999",
    parent: {
      tata: {
        name: "Gigi",
      },
      mama: {
        name: "Gigela",
      },
    },
  },
};

const {
  country,
  extraData: {
    parent: {
      mama: { name },
    },
  },
} = object;

const persons1 = [
  {
    name: "Cristian",
    age: 21,
    country: "RO",
  },
  {
    name: "Jeff",
    age: 30,
    country: "USA",
  },
  {
    name: "Vladimir",
    age: 40,
    country: "Canada",
  },
];

const persons2 = [
  {
    name: "Alex",
    age: 56,
    country: "China",
  },
  {
    name: "Leslie",
    age: 42,
    country: "Malaysia",
  },
  {
    name: "George",
    age: 38,
    country: "Rp. Moldova",
  },
];

const persons = [
  {
    name: "Cristian",
    age: 21,
    country: "RO",
  },
  {
    name: "Jeff",
    age: 30,
    country: "USA",
  },
  {
    name: "Vladimir",
    age: 40,
    country: "Canada",
  },
  ...persons2,
];
console.log(">>persons1", persons1);
console.log(">>spreadOperator ...persons1", ...persons1);

// console.log(">>people: ", persons);
// console.log(">>second people age", persons[1].age);

// function getAgesAbove(arr, age) {
//     arr.filter()
// }

// getAgesAbove(arr, 30);

// for (let i = 0; i < people.length; i++) {
//   console.log(people[i]);
// }

// persons.forEach(() => {})

// function ceva1(param1, param2, param3) {
//   console.log(param1, param2, param3);
// }

// const ceva = (param1, param2, param3) => {
//   console.log("arrow function");
//   console.log(param1, param2, param3);
// };

// persons.forEach((person) => {
//   console.log(person.age);
// });

// persons.filter((person) => {
//   if (person.age > 30) {
//     console.log(person);
//   }
// });

const getAgesAbove = (arr, age) =>
  arr
    .filter(
      (everyElement) => everyElement.age > age && everyElement.name !== "Leslie"
    )
    .map((everyElement) => everyElement.name)
    .sort((a, b) => b.localeCompare(a));
//   return arr.filter((everyElement) => {
//     return everyElement.age > age;
//   });

const agesAboveThirty = getAgesAbove(persons, 30);
console.log("agesAbobeThirty: ", agesAboveThirty);
console.log("persons: ", persons);

console.log(country);
console.log(name);
console.log(object.extraData.parent.mama.name);
