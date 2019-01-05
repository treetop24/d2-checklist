import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ClipboardModule } from 'ngx-clipboard';
import { GearComponent, GearDetailsDialogComponent, GearHelpDialogComponent, GearUtilitiesDialogComponent } from './gear/gear.component';
import { GearToggleComponent} from './gear/gear-toggle.component';

@NgModule({
  imports: [
    SharedModule, ClipboardModule
  ],
  declarations: [GearComponent, GearToggleComponent, GearDetailsDialogComponent, GearHelpDialogComponent, GearUtilitiesDialogComponent],
  entryComponents: [
    GearDetailsDialogComponent, GearHelpDialogComponent, GearUtilitiesDialogComponent
  ],
})
export class GearModule  { }
