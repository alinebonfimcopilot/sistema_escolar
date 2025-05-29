import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students-modal',
  templateUrl: './students-modal.component.html',
  styleUrls: ['./students-modal.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class StudentsModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { alunos: any[], degreeName: string },
    private dialogRef: MatDialogRef<StudentsModalComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
