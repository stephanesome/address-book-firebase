import {Component, inject, OnInit} from '@angular/core';
import {AddressEntry} from "./address-entry";
import {NotificationService} from "./notification.service";
import {AddressListElementComponent} from "./address-list-element/address-list-element.component";
import {AddressViewComponent} from "./address-view/address-view.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {AddressDbService} from "./firestore/address-db.service";

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [
    AddressListElementComponent,
    AddressViewComponent,
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css',
  providers: [NotificationService]
})
export class AddressListComponent implements OnInit {
  addresses: AddressEntry[] = [];
  currentAddress: AddressEntry | null = null;
  message: string = '';
  hideMsg = true;
  msgStyle = {
    color: '',
    'background-color': 'white',
    'font-size': '150%',
  };
  private notificationService: NotificationService = inject(NotificationService);
  private store: AddressDbService = inject(AddressDbService);

  ngOnInit(): void {
    this.message = '';
    this.store.getAddresses().subscribe(data => {
      this.addresses = data.map(e => {
        return {
          id: e.id,
          ...e
        } as AddressEntry;
      });
    });
  }

  select(address: AddressEntry): void {
    this.currentAddress = address;
    this.notificationService.selectionChanged(address);
  }

  showMessage(type: string, msg: string): void {
    this.msgStyle.color = type === 'error' ? 'red' : 'blue';
    this.message = msg;
    this.hideMsg = false;
    setTimeout(
      () => {
        this.hideMsg = true;
      }, 2500
    );
  }

  addAddress(): void {
    const newAddress = new AddressEntry('New', 'Entry');
    this.addresses = [newAddress, ...this.addresses];
    this.select(newAddress);
  }

  deleteCurrent(): void {
    if (this.currentAddress && this.currentAddress.id !== null) {
      this.addresses =
        this.addresses.filter((address: AddressEntry) => address !== this.currentAddress);
      // **** permanently delete
      this.store.deleteAddress(this.currentAddress.id!)
        .then(_ =>
          this.showMessage('info', 'The address entry was successfully deleted')
        )
        .catch(_ =>
          this.showMessage('error', 'Error unable to delete the address entry')
        );
      this.currentAddress = null;
    }
  }

  saveCurrent(): void {
    if (this.currentAddress && this.currentAddress.id === null) {
      this.store.createAddress(this.currentAddress)
        .then(
          (docRef: any) => {
            this.currentAddress!.id = docRef.id;
            this.showMessage('info', 'The address entry was successfully saved');
          }
        )
        .catch((_: any) =>
          this.showMessage('error', 'Error unable to save the address entry')
        );
    } else {
      this.store.updateAddress(this.currentAddress!)
        .then((_: any) =>
          this.showMessage('info', 'The address entry was successfully updated')
        )
        .catch((_: any) =>
          this.showMessage('error', 'Error unable to update the address entry')
        );
    }
  }
}
