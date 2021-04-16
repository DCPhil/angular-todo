import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const tasks = [
      {id: 1, name: 'exersice', priority: 'daily', checked: false, note: 'short marathon training' },
      {id: 2, name: 'coding', priority: 'daily', checked: false, note: 'practice coding' },
      {id: 3, name: 'kids', priority: 'daily', checked: false, note: 'review homework' },
      {id: 4, name: 'dog', priority: 'daily', checked: false, note: 'walk and train dog' },
      {id: 5, name: 'relax', priority: 'daily', checked: false, note: 'meditate' },
      {id: 6, name: 'cars', priority: 'weekly', checked: false, note: 'wash cars' },
      {id: 7, name: 'shopping', priority: 'weekly', checked: false, note: 'grocery shopping' },
      {id: 8, name: 'gardening', priority: 'weekly', checked: false, note: 'mow lawn' },
      {id: 9, name: 'exersice', priority: 'weekly', checked: false, note: 'long marathon training' },
      {id: 10, name: 'kids', priority: 'weekly', checked: false, note: 'help w/ school projects' },
      {id: 11, name: 'cleaing', priority: 'monthly', checked: false, note: 'house cleaning' },
      {id: 12, name: 'solar', priority: 'monthly', checked: false, note: 'clean solar panels' },
      {id: 13, name: 'pets', priority: 'monthly', checked: false, note: 'medicate dog and cats' },
      {id: 14, name: 'bills', priority: 'monthly', checked: false, note: 'pay bills' },
    ];
    return {tasks};
  }

  // Overrides the genId method to ensure that a task always has an id.
  // If the tasks array is empty,
  // the method below returns the initial number (1).
  // if the tasks array is not empty, the method below returns the highest
  // task id + 1.
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(tasks => tasks.id)) + 1 : 1;
  }
}
