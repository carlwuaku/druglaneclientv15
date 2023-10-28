import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  appName: BehaviorSubject<string> = new BehaviorSubject("Druglane Pharmacy Management System");
  appShortName: BehaviorSubject<string> = new BehaviorSubject("Druglane");
  constructor(private title: Title) { }

  setTitle(title: string) {
    this.title.setTitle(title)
  }
}
