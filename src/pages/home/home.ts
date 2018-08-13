import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlowService } from '../../lib/flow-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public sn: string = "LessnerHome";
  public currentFlow: number;

  constructor(public navCtrl: NavController, private flowService: FlowService) {
    this.currentFlow = flowService.getFlow(this.sn);
  }

}
