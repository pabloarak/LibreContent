import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Libre Content App';
  content:any = {};
  contents:any = [];
  panelOpenState = false;

  constructor(private snackBar: MatSnackBar, private contentService: ContentService) {
    this.getAllContent();
  }

  getAllContent() {
    this.contentService.getContents()
      .subscribe(content => {
        this.contents = content;
      });
  }

  addOrEditContent(){
    if(!this.content._id){
      this.contentService.createContent(this.content)
        .subscribe(() => {
          this.snackBar.open('Contenido Creado', null, {
            duration: 2000,
          });
          this.content = {};
          this.getAllContent();
        });
    } else {
      this.contentService.editContent(this.content)
        .subscribe(() => {
          this.snackBar.open('Contenido Editado', null, {
            duration: 2000,
          });
          this.content = {};
          this.getAllContent();
        });
    }
  }

  selectContent(content){
    this.content = content;
  }

  deleteContent(id){
    this.contentService.deleteContent(id)
        .subscribe(() => {
          this.snackBar.open('Contenido Eliminado', null, {
            duration: 2000,
          });
          this.getAllContent();
        });
  }
}
