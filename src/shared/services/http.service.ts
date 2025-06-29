import { Injectable } from "@angular/core";
import { Http, HttpOptions } from "@capacitor-community/http";
import { from, Observable, switchMap } from "rxjs";
import { CapacitorHttp } from '@capacitor/core';
import { StorageService } from "./storage/storage.service";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private storage: StorageService) { }

    doGet(url: string) {
        return from(this.buildOptions(url)).pipe(switchMap((options) => {
            return from(CapacitorHttp.get(options));
        }))
    }

    doPost(url: string, body?: any) {
        return from(this.buildOptions(url, body)).pipe(switchMap((options) => {
            return from(CapacitorHttp.post(options));
        }))
    }

    doPut(url: string, body?: any) {
        return from(this.buildOptions(url, body)).pipe(switchMap((options) => {
            return from(CapacitorHttp.put(options));
        }))
    }

    doDelete(url: string) {
        return from(this.buildOptions(url)).pipe(switchMap((options) => {
            return from(CapacitorHttp.delete(options));
        }))
    }

    async buildOptions(url: string, body?: any) {
        var options: HttpOptions = {
            url: url,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
        }

        const token = await this.storage.get('auth-token');
        if (token) {
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`
                }
            };
        }

        if (body) {
            options = {
                ...options,
                data: body,
            };
        }

        return options;
    }
}