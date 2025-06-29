import { Injectable } from "@angular/core";
import { HttpService } from "src/shared/services/http.service";
import { environment } from "~root/src/environments/environment";

@Injectable()
export class NotificationService {
    constructor(
        private http: HttpService) { }

    public getAll() {
        return this.http
            .doGet(`${environment.apiUrl}/notifications/check`);
    }        
}