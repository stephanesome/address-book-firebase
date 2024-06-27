import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {AddressEntry} from "../address-entry";
import {Subscription} from "rxjs";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-address-list-element',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './address-list-element.component.html',
  styleUrl: './address-list-element.component.css'
})
export class AddressListElementComponent  implements OnInit, OnDestroy {
  @Input()
  address: AddressEntry | undefined;
  selected = false;
  subscription: Subscription | undefined;
  notificationService= inject(NotificationService);

  ngOnInit(): void {
    this.subscription = this.notificationService.selectedElement.subscribe(newAddress => {
      this.selected = newAddress === this.address;
    });
  }

  getFullName(): string {
    return `${this.address!.firstName}, ${this.address!.lastName}`;
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }
}
