import { Component } from '@angular/core';
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
  addons: ADDON[] = [
    { name: 'Online service', description: 'Access to multiplayer games', price: 1, selected: true },
    { name: 'Cloud storage', description: 'Store your game saves securely', price: 2, selected: true },
    { name: 'Premium support', description: 'Priority support for any issues', price: 3, selected: false },
  ];

  toggleAddon(addon: ADDON) {
    addon.selected = !addon.selected;
  }
}
