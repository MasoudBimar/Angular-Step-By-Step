import {
  Directive, ElementRef, Input, SimpleChanges, Output,
  EventEmitter, HostListener, HostBinding, OnChanges, inject
} from "@angular/core";
import { Product } from "../../shared/model/product.model";

@Directive({
  selector: "[appMassAttr2]",
  standalone: true
})
export class MassAttrDirective implements OnChanges {

  private readonly element = inject(ElementRef<HTMLElement>);

  @Input()
  @HostBinding("class")
  appMassAttr2: string | null = "";

  @Input()
  product: Product = new Product();

  @Output()
  categoryChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    const change = changes["appMassAttr2"];
    const classList = this.element.nativeElement.classList;
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
      this.categoryChange.emit(this.product.category);
    }
  }
}
