import {
  Directive, ElementRef, Input, SimpleChanges, Output,
  EventEmitter, HostListener, HostBinding
} from "@angular/core";
import { Product } from "../../shared/model/product.model";

@Directive({
  selector: "[mass-attr-2]"
})
export class MassAttrDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.addEventListener("click", () => {
      if (this.product != null) {
        this.click.emit(this.product.category);
      }
    });
  }

  @Input("mass-attr")
  @HostBinding("class")
  bgClass: string | null = "";

  @Input("mass-product")
  product: Product = new Product();

  @Output("mass-category")
  click = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    let change = changes["bgClass"];
    let classList = this.element.nativeElement.classList;
    if (!change.isFirstChange() && classList.contains(change.previousValue)) {
      classList.remove(change.previousValue);
    }
    if (!classList.contains(change.currentValue)) {
      classList.add(change.currentValue);
    }
  }

  @HostListener("click")
  triggerCustomEvent() {
    if (this.product != null) {
      this.click.emit(this.product.category);
    }
  }
}
