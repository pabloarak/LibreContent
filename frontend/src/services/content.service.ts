import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ContentService {
    
    API = 'http://localhost:3000/contents';
    content = [];

    constructor(private http: HttpClient){}

    public getContents(){
        return this.http.get(`${this.API}/list/all`).pipe(map(res => res));
    }

    public getContent(id){
        return this.http.get(`${this.API}/${id}`).pipe(map(res => res));
    }

    public createContent(content){
        return this.http.post(`${this.API}/create`, content).pipe(map(res => res));
    }

    public editContent(content){
        return this.http.put(`${this.API}/${content._id}/update`, content).pipe(map(res => res));
    }

    public deleteContent(id){
        return this.http.delete(`${this.API}/${id}/delete`).pipe(map(res => res));
    }
}