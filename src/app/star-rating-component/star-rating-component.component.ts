// star-rating.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating-component.component.html',
  styleUrls: ['./star-rating-component.component.scss'],
})
export class StarRatingComponent {
  @Input() value = 0;
  @Output() rated = new EventEmitter<number>();

  stars = Array(5).fill(0);

  rate(value: number): void {
    this.value = value;
    this.rated.emit(value);
  }
}
