import { Component, inject } from '@angular/core';
import { AngularmaterialModule } from '../../angularmaterial/angularmaterial.module';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-box',
  standalone: false,
  templateUrl: './delete-box.component.html',
  styleUrl: './delete-box.component.scss'
})
export class DeleteBoxComponent {
   data = inject(MAT_DIALOG_DATA);
}
