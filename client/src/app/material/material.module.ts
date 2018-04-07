import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, 
  MatButtonModule, 
  MatIconModule, 
  MatLineModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatExpansionModule, 
  MatCardModule,
  MatInputModule 
} from '@angular/material';

@NgModule({
  imports: [ MatListModule, 
    MatButtonModule, 
    MatIconModule, 
    MatLineModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatExpansionModule, 
    MatCardModule,
    MatInputModule
  ],
  exports: [ MatListModule, 
    MatButtonModule,
    MatIconModule, 
    MatLineModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatExpansionModule, 
    MatCardModule,
    MatInputModule
  ],
})
export class MaterialModule { }