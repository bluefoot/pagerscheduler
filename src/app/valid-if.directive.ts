/**
 * Based on https://medium.com/front-end-hacking/angular-how-to-implement-conditional-custom-validation-1ec14b0feb45
 * This Validator validates a control based on a custom boolean expression.
 * Usage: <input [validIf]="boolean_expression">
 * If boolean_expression evaluates to false, the validation will fail
 */
import { Directive,Input,SimpleChanges } from '@angular/core';
import { Validator,AbstractControl } from "@angular/forms";
import { NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: '[validIf]',
  providers: [
    {provide: NG_VALIDATORS,useExisting:ValidIfDirective, multi: true}
  ]
})
export class ValidIfDirective implements Validator {

  constructor() { }

  @Input("validIf")
  validIf: boolean;

  validate(c:AbstractControl) {
    if (this.validIf) {
      return {
        validIf: {condition:this.validIf}
      };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
  private _onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if ('validIf' in changes) {
      if (this._onChange) this._onChange();
    }
  }
}