import { Injectable } from "@angular/core";
import { OfferCandidateDTO, OfferDTO } from "~core/entities/offer/offer-dto";
import { OfferRatingDTO } from "~core/entities/offer/offer-rating-dto";
import { environment } from "~environments/environment";
import { HttpService } from "~shared/services/http.service";

@Injectable()
export class OfferService {
    constructor(
        private http: HttpService) { }

    public create(body: OfferDTO) {
        return this.http
            .doPost(`${environment.apiUrl}/offer`, body);
    }

    public update(body: OfferDTO) {
        return this.http
            .doPut(`${environment.apiUrl}/offer/${body.id}`, body);
    }

    public getAll() {
        return this.http
            .doGet(`${environment.apiUrl}/offer`);
    }

    public getById(offerId: string) {
        return this.http
            .doGet(`${environment.apiUrl}/offer/${offerId}`);
    }

    public delete(offerId: string) {
        return this.http
            .doDelete(`${environment.apiUrl}/offer/${offerId}`);
    }

    public addCandidate(offerId: string) {
        return this.http
            .doPost(`${environment.apiUrl}/offer/${offerId}/candidates`);
    }

    public updateCandidate(offerId: string, body: OfferCandidateDTO) {
        return this.http
            .doPut(`${environment.apiUrl}/offer/${offerId}/candidates/${body.id}`, body);
    }

    public addRating(offerId: string, body: OfferRatingDTO) {
        return this.http
            .doPost(`${environment.apiUrl}/offer/${offerId}/ratings`, body);
    }
}