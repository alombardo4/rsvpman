import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notes-modal',
  template: `
    <div mat-dialog-content>
      <p *ngIf="data.note">{{data.note}}</p>
      <p *ngIf="!data.note">Sorry, no notes here!</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrls: ['./notes-modal.component.css']
})
export class NotesModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NotesModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
