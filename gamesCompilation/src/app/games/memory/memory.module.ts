import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryRoutingModule } from './memory-routing.module';
import { MemoryComponent } from './memory.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MemoryComponent],
  imports: [CommonModule, MemoryRoutingModule, FormsModule],
})
export class MemoryModule {}
