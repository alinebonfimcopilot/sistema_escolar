import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Relationship } from '../../../../core/models/relationship';
import { Teacher } from '../../../../core/models/teacher';
import { Matter } from '../../../../core/models/matter';
import { Degree } from '../../../../core/models/degree';
import { SchoolClass } from '../../../../core/models/class';
import { Student } from '../../../../core/models/student';
import { RelationshipService } from '../../../../core/services/relationship.service';
import { StudentService } from '../../../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelationshipFormComponent } from '../../components/relationship-form/relationship-form.component';
import { StudentsModalComponent } from '../../components/students-modal/students-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  imports: [CommonModule, FormsModule, RelationshipFormComponent]
})
export class TeacherListComponent implements OnInit {
  relationships: Relationship[] = [];
  teachers: Teacher[] = [];
  matters: Matter[] = [];
  degrees: Degree[] = [];
  classes: SchoolClass[] = [];
  students: Student[] = [];

  constructor(
    private relationshipService: RelationshipService,
    private studentService: StudentService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.studentService.loadStudents();
    this.studentService.getStudents().subscribe(data => this.students = data);

    this.relationshipService.loadRelationships();
    this.relationshipService.getRelationships().subscribe(data => this.relationships = data);


    this.http.get<Teacher[]>('assets/data/teachers.json').subscribe(data => this.teachers = data);
    this.http.get<Matter[]>('assets/data/matters.json').subscribe(data => this.matters = data);
    this.http.get<Degree[]>('assets/data/degrees.json').subscribe(data => this.degrees = data);
    this.http.get<any>('assets/data/classes.json').subscribe(data => {
      this.classes = data.classes.map((c: any, i: number) => ({
        id: i + 1,
        name: c.name
      }));
    });
  }

  getTeacherName(id: number): string {
    return this.teachers.find(t => t.id === id)?.name || 'Desconhecido';
  }

  getMatterName(id: number): string {
    return this.matters.find(m => m.id === id)?.name || 'Desconhecida';
  }

  getDegreeName(id: number): string {
    return this.degrees.find(d => d.id === id)?.name || 'Série X';
  }

  getClassName(id: number): string {
    return this.classes.find(c => c.id === id)?.name || 'Classe X';
  }

  getClassNameByClassObj(c: { classId?: number; classPosition?: number }): string {
    if (c.classId !== undefined) {
      return this.getClassName(c.classId);
    } else if (c.classPosition !== undefined) {
      const index = c.classPosition - 1;
      if (index >= 0 && index < this.classes.length) {
        return this.classes[index].name;
      }
    }
    return 'Classe X';
  }

  showStudents(degreeId: number): void {
    const alunos = this.students.filter(s => s.degreeId === degreeId);
    const degreeName = this.getDegreeName(degreeId);

    this.dialog.open(StudentsModalComponent, {
      data: { alunos, degreeName }
    });
  }

  addRelationship(rel: Relationship): void {
    this.relationshipService.addRelationship(rel);
  }

  showForm = false;
  toggleShowForm() {
    this.showForm = !this.showForm;
  }

}
