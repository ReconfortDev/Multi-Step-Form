import {Component, Input} from '@angular/core';
import {ADDON, BILLING_PERIOD, PLAN} from "../../model/FormInterface";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './summary.component.html',
})
export class SummaryComponent {
  @Input() changePlan!: () => void
  @Input() plans!: PLAN[];
  @Input() addons!: ADDON[];
  @Input() billingPeriod!: BILLING_PERIOD;

  constructor() {}

  getActivePlan(): PLAN | undefined {
    return this.plans.find((plan: PLAN) => plan.active);
  }

  getActiveAddons(): ADDON[] {
    return this.addons.filter((addon: ADDON) => addon.selected);
  }

  getTotal(): number {

    let total = 0;

    const activePlan = this.getActivePlan();
    if (activePlan) {
      if (this.billingPeriod === 'monthly') {
        total += activePlan.monthlyPrice;
      } else if (this.billingPeriod === 'yearly') {
        total += activePlan.yearlyPrice;
      }
    }

    const selectedAddons = this.getActiveAddons();
    selectedAddons.forEach(addon => {
      if (this.billingPeriod === 'yearly') {
        total += addon.price * 12;
      } else {
        total += addon.price;
      }
    });

    return total;
  }
}
