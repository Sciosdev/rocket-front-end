import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { RippleService } from './utils/ripple.service';

@NgModule({
  imports: [
    CommonModule,
  ],

  declarations: [],
})
export class CoreModule {
 
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: RippleService}
      ],
    };
  }
}
