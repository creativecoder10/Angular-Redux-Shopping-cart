import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getItemDetails() {
        return this.http.get('../../../assets/shopping-items.json');
    }
}
