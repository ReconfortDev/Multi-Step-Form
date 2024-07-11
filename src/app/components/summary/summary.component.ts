import {Component, Input} from '@angular/core';
import {ADDON, PLAN} from "../../model/FormInterface";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './summary.component.html',
})
export class SummaryComponent {
  @Input() changePlan!: () => void
  @Input() plans!: PLAN[];
  @Input() addons!: ADDON[];

  constructor() {}

  getActivePlan(): PLAN | undefined {
    return this.plans.find((plan: PLAN) => plan.active);
  }

  getActiveAddons(): ADDON[] {
    return this.addons.filter((addon: ADDON) => addon.selected);
  }

  getTotal(): number {
    let total = this.getActivePlan()?.monthlyPrice || 0;
    const selectedAddons = this.getActiveAddons();
    selectedAddons.forEach(addon => {
      total += addon.price;
    });
    return total
  }
}
