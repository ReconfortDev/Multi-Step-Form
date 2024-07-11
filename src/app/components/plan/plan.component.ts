import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {PLAN} from "../../model/FormInterface";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './plan.component.html',
})
export class PlanComponent {
  plans: PLAN[] = [
    { name: 'Arcade', monthlyPrice: 9, yearlyPrice: 90, icon: '/assets/images/icon-arcade.svg', active: false },
    { name: 'Advanced', monthlyPrice: 12, yearlyPrice: 120, icon: '/assets/images/icon-advanced.svg', active: false },
    { name: 'Pro', monthlyPrice: 15, yearlyPrice: 150, icon: '/assets/images/icon-pro.svg', active: false },
  ];

  billingPeriod$ = new BehaviorSubject<string>('monthly');

  setBillingPeriod(period: string) {
    this.billingPeriod$.next(period);
  }

  toggleBillingPeriod() {
    const currentPeriod = this.billingPeriod$.getValue();
    this.setBillingPeriod(currentPeriod === 'monthly' ? 'yearly' : 'monthly');
  }

  selectPlan(selectedPlan: PLAN) {
    this.plans.forEach(plan => plan.active = plan === selectedPlan);
  }
}
