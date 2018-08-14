//Initialize the Amazon Cognito credentials provider
// import { DynamoDB } from "aws-sdk";
// import * as AWS from "aws-sdk";

// import AWS = require('aws-sdk');
import { Injectable } from "../../node_modules/@angular/core";
import { Observable } from "../../node_modules/rxjs";
import { Http } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class FlowService {

	private url = "https://yg8rvhiiq0.execute-api.eu-west-1.amazonaws.com/poc/currentflow?moduleSN=";

	constructor(private http: Http) {
	}

	getFlow(sn: string): Observable<any> {
		let url2Use: string = this.url + sn;
		return this.http.get(url2Use).map(res => res.json());
		// .subscribe(data => {
		// 	this.posts = data;
		// });





		// return this.http.get<number[]>(url2Use, {
		// 	"headers": {
		// 		"Access-Control-Allow-Origin": "*",
		// 		"Access-Control-Allow-Headers": "Content-Type",
		// 		"Access-Control-Allow-Methods": "GET, POST",
		// 		"Access-Control-Allow-Credentials": "true"
		// 	}
		// });
	}
}
