import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PersonalInfoComponent} from "./components/personal-info/personal-info.component";
import {PlanComponent} from "./components/plan/plan.component";
import {AddonsComponent} from "./components/addons/addons.component";
import {SummaryComponent} from "./components/summary/summary.component";
import {FinishComponent} from "./components/finish/finish.component";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ADDON, BILLING_PERIOD, PLAN} from "./model/FormInterface";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, PersonalInfoComponent, PlanComponent, AddonsComponent, SummaryComponent, FinishComponent, NgIf, NgForOf, NgClass, AsyncPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentStep: number = 4;
  personalInfoForm: FormGroup;

  plans: PLAN[] = [
    { name: 'Arcade', monthlyPrice: 9, yearlyPrice: 90, icon: '/assets/images/icon-arcade.svg', active: true },
    { name: 'Advanced', monthlyPrice: 12, yearlyPrice: 120, icon: '/assets/images/icon-advanced.svg', active: false },
    { name: 'Pro', monthlyPrice: 15, yearlyPrice: 150, icon: '/assets/images/icon-pro.svg', active: false },
  ];

  addons: ADDON[] = [
    { name: 'Online service', description: 'Access to multiplayer games', price: 1, selected: true },
    { name: 'Cloud storage', description: 'Store your game saves securely', price: 2, selected: false },
    { name: 'Premium support', description: 'Priority support for any issues', price: 3, selected: false },
  ];

  billingPeriod$ = new BehaviorSubject<BILLING_PERIOD>('monthly');

  // Personal info functionalities

  // Function of validating form
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validPhoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
      const isValid = validPhoneNumberPattern.test(control.value);
      return isValid ? null : { invalidPhone: true };
    };
  }

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator()]]
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

  toggleBillingPeriod() {
    const currentPeriod = this.billingPeriod$.getValue();
    this.billingPeriod$.next(currentPeriod === 'monthly' ? 'yearly' : 'monthly');
  }

  selectPlan(selectedPlan: PLAN) {
    this.plans.forEach(plan => plan.active = plan === selectedPlan);
  }

  toggleAddon(addon: ADDON) {
    addon.selected = !addon.selected;
  }

  changePlan(){
    this.currentStep = 2
  }



}
