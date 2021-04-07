import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const tasks = [
      {id: 1, name: 'exersice', priority: 'daily', checked: false, note: 'marathon training' },
      {id: 2, name: 'coding', priority: 'daily', checked: false, note: 'practice coding' },
      {id: 3, name: 'pets', priority: 'daily', checked: false, note: 'medicate dog and cat' },
      {id: 4, name: 'gardening', priority: 'weekly', checked: false, note: 'mow lawn' },
      {id: 5, name: 'shopping', priority: 'weekly', checked: false, note: 'grocery shopping' },
      {id: 6, name: 'cars', priority: 'weekly', checked: false, note: 'wash cars' },
      {id: 7, name: 'cleaing', priority: 'monthly', checked: false, note: 'house cleaning' },
      {id: 8, name: 'solar', priority: 'monthly', checked: false, note: 'clean solar panels' },
      {id: 9, name: 'bills', priority: 'monthly', checked: false, note: 'pay bills' },
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
