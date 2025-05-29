import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Student } from '../../../../core/models/student';
import { Degree } from '../../../../core/models/degree';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SchoolClass } from '../../../../core/models/class';

@Component({
  standalone: true,
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  imports: [CommonModule, FormsModule, NgChartsModule]
})
export class StudentChartComponent implements OnChanges {
  @Input() students: Student[] = [];
  @Input() degrees: Degree[] = [];
  @Input() classes: SchoolClass[] = [];

  chartLabels: string[] = [];
  chartData: any[] = [];

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  ngOnChanges(): void {
    this.chartLabels = this.degrees.map(d => d.name);

    this.chartData = this.classes.map(schoolClass => {
      const dataPerDegree = this.degrees.map(degree => {
        return this.students.filter(s => s.degreeId === degree.id && s.classId === schoolClass.id).length;
      });

      return {
        label: schoolClass.name,
        data: dataPerDegree
      };
    });
  }
}
