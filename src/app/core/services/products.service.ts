import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from '../../shared/services/utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgProgress } from 'ngx-progressbar';
import { Config } from '../../shared/classes/app';


@Injectable()
export class ProductsService {
  _productsUrl = `${new Config().api}/products`;

  public products: BehaviorSubject<any> = new BehaviorSubject(null);

  public customers: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private utils: UtilsService, private http: Http, private router: Router, private progress: NgProgress) { }

  get(query?: any): void {
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options = new RequestOptions({ headers: headers});

    if (query) {
      const params = new URLSearchParams();
      params.append('filter', JSON.stringify(query));
      options.params = params;
    }

    this.http.get(`${this._productsUrl}`, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error); }
               );
  }

  find(id: string): void {
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options = new RequestOptions({ headers: headers });

    this.http.get(`${this._productsUrl}/${id}`, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error); }
               );
  }

  getCustomers(id: string): void {
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options = new RequestOptions({ headers: headers });

    this.http.get(`${this._productsUrl}/${id}/customers`, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequestCustomer(data),
                 error => {console.log(error); }
               );
  }

  add(product: any): void {
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');

    const body = JSON.stringify(product);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options = new RequestOptions({ headers: headers });

    this.http.post(`${this._productsUrl}/add`, body, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error); }
               );
  }

  update(id: string, product: any): void {
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');

    const body = JSON.stringify(product);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options = new RequestOptions({ headers: headers });

    this.http.put(`${this._productsUrl}/${id}/update`, body, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error); }
               );
  }

  delete(id: string): void {
    this.beforeRequest();
    const token = localStorage.getItem('oatoken');

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options = new RequestOptions({ headers: headers });

    this.http.delete(`${this._productsUrl}/${id}/delete`, options)
               .map((res: Response) => res.json().data)
               .subscribe(
                 data => this.afterRequest(data),
                 error => {console.log(error); }
               );
  }

  beforeRequest(): void {
    this.progress.start();
  }

  afterRequest(data: any): void {
    this.progress.done();
    this.products.next(data);
  }

  afterRequestCustomer(data: any): void {
    this.progress.done();
    this.customers.next(data);
  }

}
