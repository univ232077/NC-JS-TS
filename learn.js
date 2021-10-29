"use strict";
var a = 15;
var Directions;
(function (Directions) {
    Directions[Directions["left"] = 0] = "left";
    Directions[Directions["right"] = 1] = "right";
    Directions[Directions["down"] = 2] = "down";
    Directions[Directions["up"] = 3] = "up";
})(Directions || (Directions = {}));
function printPerson(person) {
    console.log(person.name);
}
var person = { name: "John", age: 13, skills: ["Persistent"] };
printPerson(person);
console.log(typeof (person));
var showSkills = function (name) {
    var skills = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        skills[_i - 1] = arguments[_i];
    }
    console.log(skills.join());
};
showSkills("React", "Angular");
var ProductCard1 = (function () {
    function ProductCard1(name, price) {
        this.name = name;
        this.price = price;
    }
    return ProductCard1;
}());
var card = new ProductCard1("hu", 15);
