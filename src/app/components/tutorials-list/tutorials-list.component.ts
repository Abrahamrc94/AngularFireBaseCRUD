import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import Tutorial from 'src/app/models/tutorial.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.scss']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  titulo = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.getTutoriales();
  }

  refrescarLista(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.getTutoriales();
  }

  getTutoriales(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
    });
  }

  establecerActivo(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  borrarTodo(): void {
    this.tutorialService.deleteAll()
      .then(() => this.refrescarLista())
      .catch(err => console.log(err));
  }

}