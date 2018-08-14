//Initialize the Amazon Cognito credentials provider
// import { DynamoDB } from "aws-sdk";
// import * as AWS from "aws-sdk";

// import AWS = require('aws-sdk');
import { Injectable } from "../../node_modules/@angular/core";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs";

@Injectable()
export class FlowService {

	private url = "https://yg8rvhiiq0.execute-api.eu-west-1.amazonaws.com/poc/currentflow?moduleSN=";

	constructor(private http: HttpClient) {
	}

	getFlow(sn: string): Observable<number[]> {
		let url2Use: string = this.url+sn;
		return this.http.get<number[]>(url2Use);
	}
}
