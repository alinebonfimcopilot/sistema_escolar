import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Teacher } from '../../../../core/models/teacher';
import { Matter } from '../../../../core/models/matter';
import { Degree } from '../../../../core/models/degree';
import { SchoolClass } from '../../../../core/models/class';
import { Relationship } from '../../../../core/models/relationship';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-relationship-form',
  templateUrl: './relationship-form.component.html',
  styleUrls: ['./relationship-form.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]

})
export class RelationshipFormComponent {
  @Input() teachers: Teacher[] = [];
  @Input() matters: Matter[] = [];
  @Input() degrees: Degree[] = [];
  @Input() classes: SchoolClass[] = [];

  @Output() newRelationship = new EventEmitter<Relationship>();

  form: FormGroup;
  selectedClasses: number[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      teacherId: [null],
      matterId: [null],
      degreeId: [null]
    });
  }

  toggleClass(id: number): void {
    if (this.selectedClasses.includes(id)) {
      this.selectedClasses = this.selectedClasses.filter(c => c !== id);
    } else {
      this.selectedClasses.push(id);
    }
  }

submit(): void {
  const { teacherId, matterId, degreeId } = this.form.value;

  const newRel: Relationship = {
    id: Date.now(),
    teacherId: Number(teacherId),
    matterId: Number(matterId),
    degrees: [
      {
        degreeId: Number(degreeId),
        classes: this.selectedClasses.map(id => ({ classId: Number(id) }))
      }
    ]
  };

  this.newRelationship.emit(newRel);
  this.form.reset();
  this.selectedClasses = [];
}

}
