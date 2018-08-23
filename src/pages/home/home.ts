import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FlowService } from "../../lib/flow-service";
import { Storage } from "@ionic/storage";
import * as HighCharts from "highcharts";
import * as HighchartsMore from "highcharts/highcharts-more";
import * as SolidGauge from "highcharts/modules/solid-gauge";
HighchartsMore(HighCharts);
SolidGauge(HighCharts);

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public inputsn: string = "";
  public sn: string = "";
  public currentFlow: number = -999;
  public currentTimeStamp: string = "0";
  private chart: any;

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

  ionViewDidLoad() {
    console.log("ionViewDidLoad ");
    var gaugeOptions = {
      chart: {
        spacingTop: 10,
        spacingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        type: 'solidgauge',
        backgroundColor: 'gray'
      },
      title: null,
      pane: {
        center: ['50%', '50%'],
        size: '90%',
        startAngle: -90,
        endAngle: 70,
        background: {
          backgroundColor: (HighCharts.theme && HighCharts.theme.background2) || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      tooltip: {
        enabled: false
      },
      // the value axis
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -80
        },
        labels: {
          y: 16
        }
      },
    
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      }
    };
    
    this.chart = HighCharts.chart('container', HighCharts.merge(gaugeOptions, {
      yAxis: {
        min: 0,
        max: 1200,
        title: {
          text: 'Flow'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Consumption',
        data: [this.currentFlow],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:25px;color:' +
            ((HighCharts.theme && HighCharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
               '<span style="font-size:12px;color:silver">ml/sec</span></div>'
        },
        tooltip: {
          valueSuffix: ' ml/sec'
        }
      }]
    
    }));
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
          this.chart.series[0].points[0].update(this.currentFlow);
        } else {
          this.currentFlow = -999;
          this.currentTimeStamp = "N/A";
        }
      });
    }
  }

  private toDateTime(secs): string {
    var t = new Date(secs * 1000);
    return (this.zeroPadding(t.getDate()) + "-"
      + this.zeroPadding(t.getMonth() + 1) + "-"
      + t.getFullYear() + " "
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
