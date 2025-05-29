import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>('assets/data/teachers.json');
  }
}
