import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-signout-box',
  standalone: false,
  templateUrl: './signout-box.component.html',
  styleUrl: './signout-box.component.scss'
})
export class SignoutBoxComponent {
  data = inject(MAT_DIALOG_DATA);
}
