import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
