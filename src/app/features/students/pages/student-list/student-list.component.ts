import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../../../core/models/student';
import { Degree } from '../../../../core/models/degree';
import { SchoolClass } from '../../../../core/models/class';
import { StudentService } from '../../../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { StudentChartComponent } from '../../components/student-chart/student-chart.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  standalone: true,
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  imports: [CommonModule, FormsModule, StudentCardComponent, StudentChartComponent]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  degrees: Degree[] = [];
  classes: SchoolClass[] = [];

  selectedDegreeId?: number;
  selectedClassId?: number;

  constructor(private studentService: StudentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Degree[]>('assets/data/degrees.json').subscribe(data => this.degrees = data);
    this.http.get<any>('assets/data/classes.json').subscribe(data => {
      this.classes = data.classes.map((c: any, i: number) => ({
        id: i + 1,
        name: c.name
      }));
    });

    this.studentService.loadStudents();
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.applyFilters();
    });
  }

  searchTerm: string = '';
  applyFilters() {
    this.filteredStudents = this.students.filter(student => {
      const matchesDegree = this.selectedDegreeId ? student.degreeId === this.selectedDegreeId : true;
      const matchesClass = this.selectedClassId ? student.classId === this.selectedClassId : true;
      const matchesName = this.searchTerm
        ? student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchesDegree && matchesClass && matchesName;
    });
  }

  generateMore(): void {
    this.studentService.generateRandomStudents(300, this.degrees, this.classes);
  }

  showStudentCards = false;
  toggleStudentCards() {
    this.showStudentCards = !this.showStudentCards;
  }

  clear() {
    localStorage.clear();
    this.studentService.loadStudents();
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Alunos', 14, 22);

    const tableData = this.filteredStudents.map(student => {
      const className = this.classes.find(c => c.id === student.classId)?.name || '';
      const degreeName = this.degrees.find(d => d.id === student.degreeId)?.name || '';
      return [student.name, className, degreeName];
    });

    const headers = [['Nome', 'Classe', 'Série']];

    autoTable(doc, {
      startY: 30,
      head: headers,
      body: tableData,
      styles: { fontSize: 12 }
    });

    doc.save('relatorio_alunos.pdf');
  }


}
