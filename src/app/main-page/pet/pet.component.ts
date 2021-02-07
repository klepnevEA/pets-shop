import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Ipet } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetComponent implements OnInit {

  @Input() pet!: Ipet;
  constructor() { }

  ngOnInit(): void {
  }

}
