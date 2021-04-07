import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { Task } from './task';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'api/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application.json'})
  }

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getTasks():Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('Tasks fetched')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => this.log(`Fetched task id =${id}`)),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Updated task id=${task.id}`)),
        catchError(this.handleError<any>('updatedTask'))
      );
  }

  addTask(task: Task, priority: string): Observable<Task> {
    task.checked = false;
    task.priority = priority;
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap((newTask: Task) => this.log(`Added task w/ id=${newTask.id}`)),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task ==='number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Deleted task is=${id}`)),
        catchError(this.handleError<Task>('deletedTask'))
      );
  }

  private handleError<T>(operation = "operation", result? : T) {
    return(error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add('taskService: ${message}');
  }

}
