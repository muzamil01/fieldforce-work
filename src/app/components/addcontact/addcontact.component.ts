import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { contactModel } from './addcontact.model';
import {  EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css'],
})
export class AddcontactComponent implements OnInit {
  formValue!: FormGroup;
  contactModelobj: contactModel = new contactModel();
  showAdd!: boolean;
  employeeDataBackup: contactModel[] = [];
  contactData: contactModel[] = [];
  showUpdate!: boolean;
  showClose!: boolean;
  searchValue: string = "";
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      contact: ['',Validators.required],
      address: ['',Validators.required],
      dob: [''],
      email: ['',Validators.required],
    });

    this.getAllContacts();
  }
 
  clickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postContactDetails() {
    this.contactModelobj.firstName = this.formValue.value.firstName;
    this.contactModelobj.lastName = this.formValue.value.lastName;
    this.contactModelobj.contact = this.formValue.value.contact;
    this.contactModelobj.address = this.formValue.value.address;
    this.contactModelobj.dob = this.formValue.value.dob;
    this.contactModelobj.email = this.formValue.value.email;
    this.api.postContact(this.contactModelobj).subscribe(
      (res) => {
        console.log(res);

        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllContacts();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
  getAllContacts() {
    this.api.getContact().subscribe((res) => {
      this.contactData = res;
      this.employeeDataBackup = res;
      console.log(res);
    });
  }
  deleteContact(row: any) {
    this.api.deleteContact(row.id).subscribe((res) => {
      alert('you are deleting a contact');
      this.getAllContacts();
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.contactModelobj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['email'].setValue(row.email);
  }
  onview(row: any) {
    this.showAdd = false;
    this.showUpdate = false;
    this.contactModelobj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['email'].setValue(row.email);
  }
  updateContactDetails() {
    this.contactModelobj.firstName = this.formValue.value.firstName;
    this.contactModelobj.lastName = this.formValue.value.lastName;
    this.contactModelobj.contact = this.formValue.value.contact;
    this.contactModelobj.address = this.formValue.value.address;
    this.contactModelobj.dob = this.formValue.value.dob;
    this.contactModelobj.email = this.formValue.value.email;
    this.api
      .updateContact(this.contactModelobj, this.contactModelobj.id)
      .subscribe((res) => {
        alert('Contact updated');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllContacts();
      });
  }
  searchfunction(event: any) {
    console.log(event);
    console.log(this.searchValue);
    debugger;
    this.contactData = this.contactData.filter(
      (row) =>
        row.firstName.includes(this.searchValue) ||
        row.email.includes(this.searchValue)
    );

    if (this.searchValue.length == 0) {
      this.contactData = this.employeeDataBackup;
    }
  }
}
