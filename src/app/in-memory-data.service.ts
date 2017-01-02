import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    //console.log("[InMemoryDataService]createDb")

    let products = [
            {name: "Bob", mood: "Happy", number: 10},
            {name: "Harry", mood: "Sad", number: 3},
            {name: "Sally", mood: "Happy", number: 20},
            {name: "Mary", mood: "Sad", number: 5},
            {name: "John", mood: "Happy", number: 15},
            {name: "Jack", mood: "Happy", number: 25},
            {name: "Sue", mood: "Sad", number: 43},
            {name: "Sean", mood: "Sad", number: 1335},
            {name: "Niall", mood: "Happy", number: 2},
            {name: "Alberto", mood: "Happy", number: 123},
            {name: "Fred", mood: "Sad", number: 532},
            {name: "Jenny", mood: "Happy", number: 34},
            {name: "Larry", mood: "Happy", number: 13},
    ];

    return { products };
  }
}
