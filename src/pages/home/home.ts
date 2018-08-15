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
  public currentFlow: number = -999;
  public currentTimeStamp: string = "0";

  constructor(public navCtrl: NavController, public flowService: FlowService, public storage: Storage) {
    // flowService.getFlow(this.sn).subscribe(flowData => this.currentFlow = flowData[0]);;
    // Or to get a key/value pair
    storage.get("moduleSN").then((val) => {
      console.log("Your SN is", val);
      this.sn = val;
      this.inputsn = val;
    });
    setInterval(() => {
      this.updateCurrentFlow();
    }, 5000);

  }

  eventHandler(keyCode) {
    console.dir(keyCode);
    if (keyCode === 13) {
      this.changeSN();
    }
  }

  updateCurrentFlow(): void {
    if (this.sn != undefined && this.sn != null && this.sn != "") {
      console.log("update");
      this.flowService.getFlow(this.sn).subscribe(flowData => {
        if (flowData != undefined && flowData["body"] != undefined) {
          let body = flowData["body"];
          this.currentFlow = body["Flow"];
          this.currentTimeStamp = this.toDateTime(body["TimeStamp"]);
        } else {
          this.currentFlow = -999;
          this.currentTimeStamp = "N/A";
        }
      });
    }
  }

  private toDateTime(secs): string {
    var t = new Date(secs * 1000);
    return (t.getFullYear() + "-"
      + this.zeroPadding(t.getMonth() + 1) + "-"
      + this.zeroPadding(t.getDate()) + " "
      + this.zeroPadding(t.getHours()) + ":"
      + this.zeroPadding(t.getMinutes()) + ":"
      + this.zeroPadding(t.getSeconds()));
  }

  private zeroPadding(n: number): string {
    return n < 10 ? "0" + n : "" + n;
  }

  public changeSN(): void {
    this.sn = this.inputsn;
    // set a key/value
    this.storage.set("moduleSN", this.inputsn);


  }
}
