import { Injectable } from '@angular/core';
import {
  Http, URLSearchParams, RequestOptions, RequestOptionsArgs, Response,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs';
import { ContactModel } from './contact.model';

@Injectable()
export class ContactsRestService {
  baseUrl: string = 'http://localhost:3030/contacts';

  constructor(private http: Http) {}

  getList(params?: any): Observable<ContactModel[]> {
    const search = new URLSearchParams();
    for (const k in params) search.append(k, params[k]);
    return this.getRequest(this.baseUrl, new RequestOptions({ search: search }))
      .map(res => this.buildListFromResponse(res)) as Observable<ContactModel[]>;
  }

  get(id: number);
  get(entity: ContactModel);
  get(entity): Observable<ContactModel> {
    let id;
    if (typeof entity == "number") {
      id = entity;
      entity = new ContactModel();
    } else {
      id = entity.id;
    }
    return this.getRequest(`${this.baseUrl}/${id}`)
      .map(res => this.updateEntityFromResponse(res, entity)) as Observable<ContactModel>;
  }

  save(entity: ContactModel, entityToUpdate?: ContactModel): Observable<ContactModel> {
    if (entity.id == null) {
      return this.create(entity, entityToUpdate);
    } else {
      return this.update(entity, entityToUpdate);
    }
  }

  create(entity: ContactModel, entityToUpdate?: ContactModel): Observable<ContactModel> {
    if (entityToUpdate === undefined) entityToUpdate = entity;
    return this.postRequest(this.baseUrl, JSON.stringify(entity))
      .map(res => this.updateEntityFromResponse(res, entityToUpdate)) as Observable<ContactModel>;
  }

  update(entity: ContactModel, entityToUpdate?: ContactModel): Observable<ContactModel> {
    if (entityToUpdate === undefined) entityToUpdate = entity;
    return this.patchRequest(`${this.baseUrl}/${entity.id}`, JSON.stringify(entity))
      .map(res => this.updateEntityFromResponse(res, entityToUpdate)) as Observable<ContactModel>;
  }

  remove(id: number) {
    return this.deleteRequest(`${this.baseUrl}/${id}`)
      .map(res => res);
  }

  private buildListFromResponse(res: Response): ContactModel[] {
    const list = res.json();
    return list.map(item => Object.assign(new ContactModel(), item));
  }

  private updateEntityFromResponse(res: Response, entity: ContactModel): ContactModel {
    return Object.assign(entity, res.json());
  }

  private getRequest(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(url, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  private postRequest(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  private patchRequest(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  private deleteRequest(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  private addHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    if (!options.headers) options.headers = new Headers();
    options.headers.set('Content-Type', 'application/json');
    return options;
  }

  private handleError(error: any): Observable<any> {
    // show notification to user
    return Observable.throw(error);
  }
}
