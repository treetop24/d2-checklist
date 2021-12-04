import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GearComponent } from '@app/gear';
import { GearService } from '@app/service/gear.service';
import { IconService } from '@app/service/icon.service';
import { Character, InventoryItem, ItemType } from '@app/service/model';
import { SignedOnUserService } from '@app/service/signed-on-user.service';
import { StorageService } from '@app/service/storage.service';
import { ChildComponent } from '@app/shared/child.component';
import { BehaviorSubject, iif } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'd2c-mod-helper-dialog',
  templateUrl: './mod-helper-dialog.component.html',
  styleUrls: ['./mod-helper-dialog.component.scss']
})
export class ModHelperDialogComponent extends ChildComponent implements OnInit {

  parent: GearComponent;

  equipped$: BehaviorSubject<InventoryItem[]> = new BehaviorSubject([]);
  public char$: BehaviorSubject<Character> = new BehaviorSubject(null);
  public pve$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private gearService: GearService,
    private signedOnUserService: SignedOnUserService,
    public iconService: IconService,
    public storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(storageService);
    this.parent = data.parent;
    this.parent.player$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(player => {
      if (!player || player.characters.length < 1) {
        this.char$.next(null);
      } else {
        this.char$.next(player.characters[0]);
      }
    });
    this.char$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(char => {
      if (!char) {
        this.equipped$.next([]);
        return;
      }
      const player = this.parent.player$.getValue();
      const equipped = player.gear.filter(i => (i.equipped.getValue())).filter(i => i.type == ItemType.Armor || i.type == ItemType.Weapon).filter(i => i.owner.getValue().id == char.id);
      this.equipped$.next(equipped);

    });
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }
}
