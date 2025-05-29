import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Relationship } from '../models/relationship';

@Injectable({ providedIn: 'root' })
export class RelationshipService {
  private relationships$ = new BehaviorSubject<Relationship[]>([]);

  constructor(private http: HttpClient) {}

loadRelationships(): void {
  const stored = localStorage.getItem('relationships');
  if (stored) {
    const parsed: Relationship[] = JSON.parse(stored);
    this.relationships$.next(parsed);
  } else {
    this.http.get<Relationship[]>('assets/data/relationships.json')
      .subscribe(data => {
        this.relationships$.next(data);
        localStorage.setItem('relationships', JSON.stringify(data));
      });
  }
}

  getRelationships() {
    return this.relationships$.asObservable();
  }

  addRelationship(newRel: Relationship) {
    const current = this.relationships$.getValue();
    const updated = [...current, newRel];
    this.relationships$.next(updated);
    localStorage.setItem('relationships', JSON.stringify(updated));
  }
}
