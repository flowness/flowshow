//Initialize the Amazon Cognito credentials provider
import { DynamoDB } from "aws-sdk";
import * as AWS from "aws-sdk";

// import AWS = require('aws-sdk');
import { Injectable } from "../../node_modules/@angular/core";

@Injectable()
export class FlowService {

	// AWS.config.region = 'eu-west-1'; // Region
	// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	// 	IdentityPoolId: 'eu-west-1:36f1e9aa-6149-4205-835d-4a79041b32c1',
	// });

	// var params = { TableName: 'Notification' };

	// console.log(AWS.config.credentials);
	// var dynamodb = new AWS.DynamoDB();

	// /* Set the options for our chart */
	// var options = {
	// 	segmentShowStroke: false,
	// 	animateScale: true,
	// 	percentageInnerCutout: 50,
	// 	showToolTips: true,
	// 	tooltipEvents: ["mousemove", "touchstart", "touchmove"],
	// 	tooltipFontColor: "#fff",
	// 	animationEasing: 'easeOutCirc'
	// }
	private dynamodb: DynamoDB;
	private credentials: AWS.CognitoIdentityCredentials;


	constructor() {
		this.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: 'eu-west-1:0d079a73-dcef-4e53-a772-b5629e323a26',
		})
	}

	getFlow(sn: string): number {
		if (this.dynamodb == undefined) {
			let options = {
				"region": "eu-west-1",
				"credentials": this.credentials
			};
			this.dynamodb = new DynamoDB(options);
			console.log("ddbconfig= " + this.dynamodb.config);
			console.dir(this.dynamodb);
		}
		let params: DynamoDB.DocumentClient.GetItemInput = {
			TableName: 'Measurement',
			Key: {
				'SN': { S: sn }
			}
		};
		let item = this.dynamodb.getItem(params, (err, data) => {
			console.log("err= " + err);
			console.log("data= " + data);
		});
		console.log("item=" + item);
		console.dir(item);
		// 	var el = document.getElementById("comp-jhysym7tcollection");
		// 	console.log(el);
		// 	console.log(el.options[el.selectedIndex].value);
		// 	tag = el.options[el.selectedIndex].value;
		// 	console.log("my tag = " + tag);
		// 	if (tag == "approvedVsNotApproved") {
		// 		this.approvedVsNotApproved();
		// 	} else {
		// 		alert("not implemented")
		// 	}
		return 1;
	}

	// approvedVsNotApproved() {
	// 	console.log("Hello world! DATA?!");
	// 	// console.log(AWS.config.credentials);
	// 	dynamodb.scan(params, function (err, data) {
	// 		if (err) {
	// 			console.log(err);
	// 			return null;
	// 		} else {
	// 			var approved = 0;
	// 			var notApproved = 0;

	// 			for (var i in data['Items']) {
	// 				if (data['Items'][i]['approved']['BOOL']) {
	// 					approved++;
	// 				} else {
	// 					notApproved++;
	// 				}
	// 			}

	// 			init = {
	// 				datasets: [{
	// 					data: [
	// 						notApproved,
	// 						approved
	// 					],
	// 					backgroundColor: [
	// 						"#e74c3c",
	// 						"#2ecc71"
	// 					],
	// 					label: 'Dataset 1'
	// 				}],
	// 				labels: [
	// 					'Not Approved',
	// 					'Approved'
	// 				]
	// 			}

	// 			graph_0 = new Chart(ctx, { type: 'doughnut', data: init, options });
	// 		}
	// 	});
	// }

}



/* Set the inital data 
var init = [
  {
      value: 1,
      color:"#e74c3c",
      highlight: "#c0392b",
      label: "Red"
  },
  {
      value: 1,
      color: "#2ecc71",
      highlight: "#27ae60",
      label: "Green"
  },
  {
      value: 1,
      color: "#3498db",
      highlight: "#2980b9",
      label: "Blue"
  }
];
*/


// $(function() {
// 	getData_0();
//   	$.ajaxSetup({ cache: false });
//   	/*setInterval(getData_0, 3000);*/
// });

/* Makes a scan of the DynamoDB table to set a data object for the chart */

