import {
  Directive, ElementRef, Input, SimpleChanges, Output,
  EventEmitter, HostListener, HostBinding
} from "@angular/core";
import { Product } from "../shared/model/product.model";

@Directive({
  selector: "[mass-attr]"
})
export class PaAttrDirective {

  @Input("mass-attr")
  @HostBinding("class")
  bgClass: string | null = "";

  @Input("mass-product")
  product: Product = new Product();

  @Output("mass-category")
  click = new EventEmitter<string>();

  @HostListener("click")
  triggerCustomEvent() {
    if (this.product != null) {
      this.click.emit(this.product.category);
    }
  }
}
