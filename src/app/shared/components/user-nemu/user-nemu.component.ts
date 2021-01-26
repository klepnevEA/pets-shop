import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-nemu',
  templateUrl: './user-nemu.component.html',
  styleUrls: ['./user-nemu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNemuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
