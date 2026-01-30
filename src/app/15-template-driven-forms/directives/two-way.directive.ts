import {
  Input,
  Output,
  EventEmitter,
  Directive,
  HostBinding,
  HostListener,
  SimpleChanges,
  OnChanges
} from "@angular/core";

@Directive({
  selector: "input[appMassModel]",
  exportAs: "appMassModel",
  standalone: true
})
/**
 * Directive that provides a minimal two-way binding surface for native `input` elements.
 *
 * Usage example (preferred: property binding):
 *  <input [appMassModel]="value" (appMassModelChange)="value = $event" />
 *
 * - `@Input() appMassModel` receives the current model value.
 * - `@Output() appMassModelChange` emits when the input value changes.
 * - `fieldValue` is kept in sync with the host element's `value`.
 * - `direction` indicates whether the last update came from the model or the element.
 */
export class MassModel implements OnChanges {

  /** Indicates where the last update originated. */
  direction: "None" | "Model" | "Element" = "None";

  /**
   * Bound input value from the host component. Provide as `appMassModel`.
   * Accepts `string | null | undefined`. When `null`/`undefined` the host
   * input `value` will be an empty string.
   * Example: `<input [appMassModel]="value" (appMassModelChange)="value = $event">`
   */
  @Input()
  appMassModel: string | null | undefined = null;

  /** Binds to the host element's `value` property. */
  @HostBinding("value")
  fieldValue: string = "";

  /**
   * Keep host `value` in sync when the input binding changes.
   * Uses `SimpleChanges` and guards against undefined entries.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes["appMassModel"];
    if (change && change.currentValue !== this.fieldValue) {
      // Normalize null/undefined -> empty string; otherwise stringify.
      this.fieldValue = change.currentValue == null ? "" : String(change.currentValue);
      this.direction = "Model";
    }
  }

  /** Emits `appMassModelChange` when the user types into the host input. */
  @Output()
  readonly appMassModelChange = new EventEmitter<string>();

  /**
   * Host listener for the native `input` event. Emits only when value actually
   * changes and updates the internal `fieldValue`.
   */
  @HostListener("input", ["$event"])
  updateValue(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const newValue = target?.value ?? "";
    if (newValue !== this.fieldValue) {
      this.fieldValue = newValue;
      this.appMassModelChange.emit(newValue);
      this.direction = "Element";
    }
  }
}
