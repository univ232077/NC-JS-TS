let a: number = 15;

enum Directions {
    left,
    right,
    down,
    up
}

type Person = {
    name: string,
    age: number,
    skills: Array<string>
};

function printPerson(person: Person) {
    console.log(person.name);
}

const person: Person = {name: "John", age: 13, skills: ["Persistent"]};
printPerson(person);

type myString = string; // alias to another data type

console.log(typeof(person));

const showSkills = (name: string, ...skills: Array<string>) => {
    console.log(skills.join());
}

showSkills("React", "Angular");

abstract class Product {
    protected constructor(public readonly name: string, public readonly price: number) {}
}

abstract class Human {}

class ProductCard1 extends Product {
    constructor(public readonly name: string, public readonly price: number) {
        super(name, price);
    }
}

let card: ProductCard1 = new ProductCard1("hu", 15);

