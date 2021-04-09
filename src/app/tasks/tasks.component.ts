import { Component, OnInit } from '@angular/core';
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
    this.route.params
        .subscribe(params => {
          this.priority = params.ref1;
          this.taskService.getTasks(this.priority)
            .subscribe(tasks => {this.tasks = tasks; this.filteredTasks = tasks});
        });
  }

}
