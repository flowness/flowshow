import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FlowService } from "../../lib/flow-service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public inputsn: string = "";
  public sn: string = "";
  public currentFlow: number = -2;
  public currentTimeStamp: string = "0";

  constructor(public navCtrl: NavController, public flowService: FlowService, public storage: Storage) {
    // flowService.getFlow(this.sn).subscribe(flowData => this.currentFlow = flowData[0]);;
    // Or to get a key/value pair
    storage.get('moduleSN').then((val) => {
      console.log('Your SN is', val);
      this.sn = val;
      this.inputsn = val;
    });
    setInterval(() => {
      this.updateCurrentFlow();
    }, 5000);

  }

  updateCurrentFlow(): void {
    if (this.sn != undefined && this.sn != null && this.sn != "") {
      console.log("update");
      this.flowService.getFlow(this.sn).subscribe(flowData => {
        this.currentFlow = flowData["body"]["Flow"];
        this.currentTimeStamp = this.toDateTime(flowData["body"]["TimeStamp"]);
      });
    }
  }

  private toDateTime(secs): string {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return (t.getFullYear() + '-' + ((t.getMonth() + 1)) + '-' + t.getDate() + ' ' +t.getHours() + ':' + t.getMinutes()+ ':' + t.getSeconds());
  }

  public changeSN(): void {
    this.sn = this.inputsn;
    // set a key/value
    this.storage.set('moduleSN', this.inputsn);


  }
}
