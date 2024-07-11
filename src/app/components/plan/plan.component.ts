import {Component, Input} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {BILLING_PERIOD, PLAN} from "../../model/FormInterface";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-plan',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgForOf,
        NgClass,
        AsyncPipe,
        NgIf
    ],
    templateUrl: './plan.component.html',
})
export class PlanComponent {
    @Input() plans!: PLAN[];
    @Input() billingPeriod$!: BehaviorSubject<BILLING_PERIOD>;
    @Input() selectPlan!: (plan: PLAN) => void;
    @Input() toggleBillingPeriod!: () => void;

    constructor() {}
}
