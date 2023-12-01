import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PERMISSION_EDIT_SALES } from 'src/app/core/models/permissions';
import { isEmpty } from 'src/app/shared/utils/helper';
import { IEnterQuantity } from '../../models/enter_quantity.model';

@Component({
  selector: 'app-enter-quantity',
  templateUrl: './enter-quantity.component.html',
  styleUrls: ['./enter-quantity.component.scss']
})
export class EnterQuantityComponent {
  public form = new FormGroup({
    quantity: new FormControl('', [Validators.required, ]),
    label: new FormControl(''),
  });

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<EnterQuantityComponent, IEnterQuantity>,
    private el: ElementRef, private renderer: Renderer2) {
  }

  keyChangeQuantity(event:KeyboardEvent) {
    if (event.keyCode == 40) {
      this.decrement();
    }

    // up key
    else if (event.keyCode == 38) {

      this.increment();

    }
    this.focusCursor();
  }


  increment() {

    this.updateQuantityField(1)

  }


  decrement() {
    this.updateQuantityField(-1)

  }

  private updateQuantityField(quantity: number) {
    const control = this.form.controls["quantity"];
    const value = control.value;

    if (isEmpty(value)) {
      control.setValue("0")
    }
    else if (value && isNaN(parseFloat(value))) {
      control.setErrors({
        notANumber: 'Only numbers are allowed',
      })
    }
    else if (value && parseFloat(value) + quantity >= 0) {
      control.setValue((parseFloat(value) + quantity).toString());
      if (control.hasError('notANumber')) {
        control.setErrors(null);
      }
    }
    // Set focus after a short delay
    setTimeout(() => {
      this.focusCursor();
    });
  }

  focusCursor() {
    const inputElement: HTMLInputElement = this.el.nativeElement.querySelector('#numericInput');
    if (inputElement) {
      this.renderer.selectRootElement(inputElement).focus();
    }
  }

  submit() {
    this.dialogRef.close({
      quantity: this.form.get('quantity') ? parseFloat(this.form.get('quantity')?.value!) : 0,
      label: this.form.get('label')?.value!
    })
  }
}
