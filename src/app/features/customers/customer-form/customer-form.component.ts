import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormGenerator, PractitionerCategories, monthsOptions } from 'src/app/shared/components/form-generator/form-generator-interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {
  title: string = "Add new Client";
  formUrl: string = "customer";
  existingUrl: string = "customer";
  fields: IFormGenerator[] = [
    {
      label: "Type",
      name: "type",
      hint: "choose whether this is a company or individual",
      options: [
        { key: "Choose One", value: "" },
        { key: "Individual", value: "Individual" },
        {key:"Company",value: "Company"}],
      type: "select",
      value: "",
      required: true
    },
    {
      label: "Name",
      name: "name",
      hint: "the name of the person/company",
      options: [],
      type: "text",
      value: "",
      required: true
    },
    {
      label: "Phone number",
      name: "phone",
      hint: "the phone number of the person/company",
      options: [],
      type: "text",
      value: "",
      required: true
    },
    {
      label: "Email address",
      name: "email",
      hint: "the email address of the person/company",
      options: [],
      type: "email",
      value: "",
      required: false
    },
    {
      label: "Location",
      name: "location",
      hint: "",
      options: [],
      type: "text",
      value: "",
      required: false
    },
    {
      label: "Sex",
      name: "sex",
      hint: "",
      options: [{ key: "Male", value: "Male" },
      { key: "Female", value: "Female" }],
      type: "select",
      value: "Male",
      required: false
    },

  ];
  id: string;
  constructor(ar: ActivatedRoute, private router: Router) {
    this.id = ar.snapshot.params['id'];
    if (this.id) {
      this.title = "Edit client";
      this.existingUrl = `customer/customer/${this.id}`
    }
  }

  ngOnInit(): void {
  }

  formSubmitted(args:any) {
    if (args) {
      this.router.navigate(['/customers'])
    }
  }
}
