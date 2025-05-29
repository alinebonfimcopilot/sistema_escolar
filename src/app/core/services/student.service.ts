import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../core/models/student';
import { Degree } from '../../core/models/degree';
import { SchoolClass } from '../../core/models/class';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private students$ = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) { }

  loadStudents(): void {
    const stored = localStorage.getItem('students');
    if (stored) {
      const parsed: Student[] = JSON.parse(stored);
      this.students$.next(parsed);
    } else {
      this.http.get<Student[]>('assets/data/students.json')
        .subscribe(data => {
          const renamedData = this.assignRandomNames(data);
          this.students$.next(renamedData);
          localStorage.setItem('students', JSON.stringify(renamedData));
        });
    }
  }

  private assignRandomNames(students: Student[]): Student[] {
    const nomes = [
      'Lucas', 'Pedro', 'Ana', 'Beatriz', 'João', 'Mariana', 'Carlos', 'Camila', 'Rafael', 'Isabela',
      'Mateus', 'Larissa', 'Bruno', 'Fernanda', 'Thiago', 'Juliana', 'Felipe', 'Patrícia', 'Diego', 'Renata'
    ];

    const sobrenomes = [
      'Silva', 'Souza', 'Costa', 'Oliveira', 'Pereira', 'Lima', 'Gomes', 'Ribeiro', 'Almeida', 'Carvalho',
      'Rocha', 'Martins', 'Barbosa', 'Araújo', 'Melo', 'Fernandes', 'Cavalcante', 'Monteiro', 'Dias', 'Nunes'
    ];

    return students.map(student => ({
      ...student,
      name: `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`
    }));
  }

  getStudents() {
    return this.students$.asObservable();
  }

  private updateStorage(students: Student[]): void {
    this.students$.next(students);
    localStorage.setItem('students', JSON.stringify(students));
  }

  updateStudent(updated: Student): void {
    const current = this.students$.getValue();
    const updatedList = current.map(s => s.id === updated.id ? updated : s);
    this.updateStorage(updatedList);
  }

  generateRandomStudents(count: number, degrees: Degree[], classes: SchoolClass[]) {
    const current = this.students$.getValue();
    const maxId = Math.max(...current.map(s => s.id), 0);
    const newStudents: Student[] = [];

    const nomes = [
      'Lucas', 'Pedro', 'Ana', 'Beatriz', 'João', 'Mariana', 'Carlos', 'Camila', 'Rafael', 'Isabela',
      'Mateus', 'Larissa', 'Bruno', 'Fernanda', 'Thiago', 'Juliana', 'Felipe', 'Patrícia', 'Diego', 'Renata'
    ];

    const sobrenomes = [
      'Silva', 'Souza', 'Costa', 'Oliveira', 'Pereira', 'Lima', 'Gomes', 'Ribeiro', 'Almeida', 'Carvalho',
      'Rocha', 'Martins', 'Barbosa', 'Araújo', 'Melo', 'Fernandes', 'Cavalcante', 'Monteiro', 'Dias', 'Nunes'
    ];

    for (let i = 0; i < count; i++) {
      const degree = degrees[Math.floor(Math.random() * degrees.length)];
      const schoolClass = classes[Math.floor(Math.random() * classes.length)];

      const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
      const sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
      const nomeCompleto = `${nomeAleatorio} ${sobrenomeAleatorio}`;

      newStudents.push({
        id: maxId + i + 1,
        name: nomeCompleto,
        degreeId: degree.id,
        classId: schoolClass.id
      });
    }

    this.updateStorage([...current, ...newStudents]);
  }
}
