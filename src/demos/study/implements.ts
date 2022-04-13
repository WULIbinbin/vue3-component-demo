interface IEat {
  food: string;
  toEat: () => void;
}

interface IRun {
  speed: number;
  toRun: () => void;
}

class Animal implements IEat, IRun {
  food: string;
  speed: number;
  constructor() {
    this.food = '';
    this.speed = 0;
  }
  toEat(): void {}
  toRun(): void {}
}

class Dog extends Animal {
  constructor(public name: string) {
    super();
  }

  toEat(): void {
    this.food = 'fork';
  }
}

const dogg = new Dog('mike');

console.log(dogg);

export default dogg;
