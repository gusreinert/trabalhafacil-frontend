import { UserDTO } from "../user/user-dto";

export interface OfferDTO {
    id: string;
    occupation: string;
    title: string;
    description: string;
    postalCode: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    hireDate: string;
    endDate: string;    
    user: UserDTO;
    candidates: OfferCandidateDTO[]
}

export interface OfferCandidateDTO {
    id: string
    selected: boolean
    user?: UserDTO
}
