import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GearService } from '@app/service/gear.service';
import { InventoryItem, InventoryPlug, InventorySocket, Player } from '@app/service/model';

const EDITABLE_WEAPON_SOCKET_HASH = '4241085061';

@Component({
  selector: 'd2c-writable-plug',
  templateUrl: './writable-plug.component.html',
  styleUrls: ['./writable-plug.component.scss']
})
export class WritablePlugComponent implements OnInit {
  public EDITABLE_WEAPON_SOCKET_HASH = EDITABLE_WEAPON_SOCKET_HASH;

  @Input() item: InventoryItem;

  @Input() plug: InventoryPlug;

  @Input() socket: InventorySocket;

  @Input() debugmode: boolean;

  @Input() writable = false;

  @Input() player: Player;

  @Output() equip = new EventEmitter<boolean>();

  constructor(private gearService: GearService) { }

  ngOnInit(): void {
  }

  selectPlug() {
    this.gearService.insertFreeSocket(this.item, this.socket, this.plug);
  }
}
