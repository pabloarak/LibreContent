import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Libre Content App';
  API = 'http://localhost:3000/contents';
  contents:any = [];
  panelOpenState = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllContent();
  }

  getAllContent() {
    this.http.get(`${this.API}/list/all`).pipe(
      map(res => res)
    ).subscribe(content => {
      this.contents = content;
      console.log(this.contents);
    });
  }

  addContent(title, author, description) {
    this.http.post(`${this.API}/create`, { title, author, description }).pipe(
      map(res => res)
    ).subscribe(() => {
      this.getAllContent();
    });
  }
}
