import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';
import { RelationshipFormComponent } from './components/relationship-form/relationship-form.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: TeacherListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TeacherListComponent,
    RelationshipFormComponent,
    MatDialogModule
  ]
})
export class TeachersModule { }
