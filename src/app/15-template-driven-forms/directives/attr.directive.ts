import {
  Directive, Input, Output,
  EventEmitter, HostListener, HostBinding
} from "@angular/core";
import { Product } from "../../shared/model/product.model";

@Directive({
  selector: "[appMassAttr]",
  standalone: true
})
export class MassAttrDirective {

  @Input()
  @HostBinding("class")
  appMassAttr: string | null = "";

  @Input() product: Product = new Product();

  @Output() changeCategory = new EventEmitter<string>();

  @HostListener("click")
  triggerCustomEvent() {
    if (this.product != null) {
      this.changeCategory.emit(this.product.category);
    }
  }
}
