import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StudentCardComponent } from './components/student-card/student-card.component';
import { StudentChartComponent } from './components/student-chart/student-chart.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: StudentListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    RouterModule.forChild(routes),
    StudentListComponent,
    StudentCardComponent,
    StudentChartComponent
  ],
  exports: [
    StudentListComponent
  ]
})
export class StudentsModule {}
