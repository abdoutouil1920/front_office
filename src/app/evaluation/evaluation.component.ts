import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluationForm: FormGroup = new FormGroup({}); // Initialisez votre formulaire ici

  // Définissez vos valeurs d'évaluation ici (1, 2, 3, 4, etc.)
  evaluation1 = 1;
  evaluation2 = 2;
  evaluation3 = 3;
  evaluation4 = 4;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Initialisez votre formulaire avec les contrôles requis
    this.evaluationForm = this.formBuilder.group({
      Question1: [''],
      Question2: [''],
      Question3: [''],
      Question4: [''],
      Question5: [''],
      Question6: [''],
      description: ['']
    });
  }

  onSubmit() {
    // Récupérez les valeurs des questions qui ont été cochées
    const selectedValues = {
      Question1: +this.evaluationForm.get('Question1')?.value || 0, // Convertissez en nombre et utilisez 0 si la valeur est null
      Question2: +this.evaluationForm.get('Question2')?.value || 0,
      Question3: +this.evaluationForm.get('Question3')?.value || 0,
      Question4: +this.evaluationForm.get('Question4')?.value || 0,
      Question5: +this.evaluationForm.get('Question5')?.value || 0,
      Question6: +this.evaluationForm.get('Question6')?.value || 0,
    };

    // Calculez la moyenne
    const average = (selectedValues.Question1 + selectedValues.Question2 +
      selectedValues.Question3 + selectedValues.Question4 +
      selectedValues.Question5 + selectedValues.Question6) / 6;

    // Affichez la moyenne dans la console
    console.log('Moyenne des évaluations:', average.toFixed(2)); // La méthode toFixed(2) limite le nombre de décimales à 2
  }
}
