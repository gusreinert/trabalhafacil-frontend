import { Injectable } from "@angular/core";
import { environment } from "~environments/environment";
import { HttpService } from "~shared/services/http.service";

@Injectable()
export class UserService {

    constructor(
        private http: HttpService) { }

    public me() {
        return this.http
            .doGet(`${environment.apiUrl}/user/me`);
    }
}