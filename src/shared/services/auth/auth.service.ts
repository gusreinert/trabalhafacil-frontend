import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, tap } from "rxjs";
import { HttpService } from "src/shared/services/http.service";
import { StorageService } from "~root/src/shared/services/storage/storage.service";
import { LoginInput } from "~root/src/app/core/interfaces/login-input";
import { RegisterInput } from "~root/src/app/core/interfaces/register-input";
import { environment } from "~root/src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userDataSubject = new BehaviorSubject<any>(null);

    constructor(private http: HttpService, private storage: StorageService) {
        this.loadUserDataFromStorage();
    }

    public login(body: LoginInput) {
        return this.http
            .doPost(`${environment.apiUrl}/auth/login`, body)
            .pipe(tap(response => {
                this.saveToken(response.data?.token);
                this.saveUserData(response.data?.user);
            }));
    }

    public register(body: RegisterInput) {
        return this.http
            .doPost(`${environment.apiUrl}/auth/register`, body)
            .pipe(tap(response => {
                this.saveToken(response.data?.token);
                this.saveUserData(response.data?.user);
            }));
    }

    public userData() {
        return this.userDataSubject.pipe(filter(user => user !== null));
    }

    public isLoggedIn() {
        return !!this.storage.get('auth-token');
    }

    public logout() {
        this.storage.remove('user-data');
        this.storage.remove('auth-token');

        this.userDataSubject.next(null);
    }

    private saveToken(token: string) {
        this.storage.set('auth-token', token);
    }

    private saveUserData(userData: any) {
        this.userDataSubject.next(userData);
        this.storage.set('user-data', JSON.stringify(userData));
    }

    private async loadUserDataFromStorage() {
        const storedUserData = await this.storage?.get('user-data');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            this.userDataSubject.next(parsedUserData);
        }
    }
}