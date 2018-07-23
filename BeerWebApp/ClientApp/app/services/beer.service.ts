﻿
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {map, catchError} from "rxjs/operators";
import {Beer} from "../shared/beer.model";

@Injectable()
export class BeerService {
	myAppUrl: string = "";

	constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
		this.myAppUrl = baseUrl;
	}

	getBeers(query?: any): Observable<any> {
		return this.http.get(this.myAppUrl + 'api/Beers/' + (query != undefined ? '?query=' + query : ''))
			.pipe(
				map(this.extractData),
				catchError(this.errorHandler)
			);
	}

	getBeersByStyle(styleId: any): Observable<any> {
		return this.http.get(this.myAppUrl + 'api/Beers/?styleId=' + styleId)
			.pipe(
				map(this.extractData),
				catchError(this.errorHandler)
			);
	}

	getBeerStyles(): Observable<any> {
		return this.http.get(this.myAppUrl + "api/BeerStyles/")
			.pipe(
				map(this.extractData),
				catchError(this.errorHandler)
			);
	}

	getBeerById(id: string): Observable<any> {
		return this.http.get(this.myAppUrl + "api/Beer/" + id)
			.pipe(
				map(this.extractData),
				catchError(this.errorHandler)
			);
	}

	private extractData(res: Response) {
		if (res.status === 200) {
			let body = res.json();
			return Promise.resolve(body || []);
		}
		console.log(res.status);
		return Promise.reject(res);
	}

	errorHandler(error: Response) {
		console.error('An error occurred', error);
		return Promise.reject(error);
	}
}