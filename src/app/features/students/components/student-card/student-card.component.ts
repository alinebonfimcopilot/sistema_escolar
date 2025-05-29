import { Component, Input } from '@angular/core';
import { Student } from '../../../../core/models/student';
import { SchoolClass } from '../../../../core/models/class';
import { StudentService } from '../../../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class StudentCardComponent {
  @Input() student!: Student;
  @Input() classes: SchoolClass[] = [];

  constructor(private studentService: StudentService) {}

update() {
  this.student.id = Number(this.student.id);
  this.student.degreeId = Number(this.student.degreeId);
  this.student.classId = Number(this.student.classId);
  
  const stored = localStorage.getItem('students');
  if (stored) {
    const parsed: Student[] = JSON.parse(stored);

    const updatedList = parsed.map(s => s.id === this.student.id ? this.student : s);
    localStorage.setItem('students', JSON.stringify(updatedList));

    this.studentService['students$'].next(updatedList);
  } else {
    this.studentService.updateStudent(this.student);
  }
}
}
