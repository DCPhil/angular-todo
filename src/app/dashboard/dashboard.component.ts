import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: Task[] = [];
  loadingTasks: boolean = false;
  dailyTasks: Task[] = [];
  weeklyTasks: Task[] = [];
  monthlyTasks: Task[] = [];
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.loadingTasks = true;
    this.tasks = [];
    this.taskService.getTasks()
      .subscribe (
        tasks => this.tasks = tasks,
        err => console.error(err),
        () => {this.filterTasks(); this.loadingTasks = false}
      )
  }

  filterTasks(): void {
    this.dailyTasks = this.tasks.filter(itemObj => itemObj.priority == 'daily');
    this.dailyTasks = this.dailyTasks.slice(0,2);
    this.weeklyTasks = this.tasks.filter(itemObj => itemObj.priority == 'weekly');
    this.weeklyTasks = this.weeklyTasks.slice(0,2);
    this.monthlyTasks = this.tasks.filter(itemObj => itemObj.priority == 'monthly');
    this.monthlyTasks = this.monthlyTasks.slice(0,2);
  }

  checkUncheck(task: Task): void {
    this.taskService.updateTask(task)
      .subscribe();
  }

}
