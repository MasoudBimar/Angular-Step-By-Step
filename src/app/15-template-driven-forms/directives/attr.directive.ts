import {
  Directive, ElementRef, Input, SimpleChanges, Output,
  EventEmitter, HostListener, HostBinding
} from "@angular/core";
import { Product } from "../../shared/model/product.model";

@Directive({
  selector: "[mass-attr]",
  standalone: true
})
export class MassAttrDirective {

  @Input("mass-attr")
  @HostBinding("class")
  bgClass: string | null = "";

  @Input() product: Product = new Product();

  @Output() changeCategory = new EventEmitter<string>();

  @HostListener("click")
  triggerCustomEvent() {
    if (this.product != null) {
      this.changeCategory.emit(this.product.category);
    }
  }
}
