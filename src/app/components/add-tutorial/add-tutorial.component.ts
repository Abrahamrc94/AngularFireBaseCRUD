import { Component, OnInit } from '@angular/core';
import Tutorial from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = new Tutorial();
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  guardarTutorial(): void {
    this.tutorialService.create(this.tutorial).then(() => {
      console.log('!Nuevo tutorial creado con exito!');
      this.submitted = true;
    });
  }

  nuevoTutorial(): void {
    this.submitted = false;
    this.tutorial = new Tutorial();
  }

}