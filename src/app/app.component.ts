import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PersonalInfoComponent} from "./components/personal-info/personal-info.component";
import {PlanComponent} from "./components/plan/plan.component";
import {AddonsComponent} from "./components/addons/addons.component";
import {SummaryComponent} from "./components/summary/summary.component";
import {FinishComponent} from "./components/finish/finish.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, PersonalInfoComponent, PlanComponent, AddonsComponent, SummaryComponent, FinishComponent, NgIf, NgForOf, NgClass],
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentStep: number = 1;
  personalInfoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  goToNextStep(): void {
    if (this.currentStep === 1 && this.personalInfoForm.invalid) {
      this.personalInfoForm.markAllAsTouched();
      return;
    }
    if(this.currentStep < 5) {
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if(this.currentStep > 1) {
      this.currentStep--;
    }
  }

  stepTitle(step: number): string {
    switch (step) {
      case 1:
        return 'YOUR INFO';
      case 2:
        return 'SELECT PLAN';
      case 3:
        return 'ADD-ONS';
      case 4:
        return 'SUMMARY';
      case 5:
        return 'FINISH';
      default:
        return '';
    }
  }

}
