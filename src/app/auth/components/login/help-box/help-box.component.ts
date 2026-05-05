import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-help-box',
  standalone: false,
  templateUrl: './help-box.component.html',
  styleUrl: './help-box.component.scss'
})
export class HelpBoxComponent {
  data = inject(MAT_DIALOG_DATA);
}
