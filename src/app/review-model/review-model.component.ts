import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-review-model',
  templateUrl: './review-model.component.html',
  styleUrls: ['./review-model.component.scss']
})
export class ReviewModelComponent {
 currentRating = 0;
 comment = "";

 reviewForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<ReviewModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.reviewForm = this._fb.group({
      rating: '',
      review: ''
    });
  }
  onRated(rating: number): void {
    this.currentRating = rating;
  }
  onReview(comment: string): void {
    this.comment = comment;
  }
  onFormSubmit() {
      if (this.data.imdbId) {
        this._empService
          .createReview({"imdbId":this.data.imdbId,"body":this.comment,
          "star": this.currentRating})
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('revew added!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
    }
  }
