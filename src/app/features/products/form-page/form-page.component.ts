import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { goBack } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent {
  id: string;
  title:string = "Add Product"
  constructor(private ar: ActivatedRoute, private router:Router) {
    this.id = ar.snapshot.params['id'];
    if(this.id) this.title = "Edit Product"
  }

  formSubmitted(args:any) {
    this.router.navigate(['/products'])
  }
}
