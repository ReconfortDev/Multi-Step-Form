import {Component, Input} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ADDON} from "../../model/FormInterface";

@Component({
  selector: 'app-addons',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './addons.component.html'
})
export class AddonsComponent {
  @Input() addons!: ADDON[];
  @Input() toggleAddon!: (addon: ADDON) => void;
}
