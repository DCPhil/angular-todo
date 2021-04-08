import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../task';
import {TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  priority: string;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.route.queryParams
        .subscribe(params => {
          this.priority = params.priority;
        });
    this.taskService.getTasks(this.priority)
      .subscribe(tasks => {this.tasks = tasks; this.filteredTasks = tasks});
  }

}
