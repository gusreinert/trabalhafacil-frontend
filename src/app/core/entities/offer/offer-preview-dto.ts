import { UserDTO } from "~core/entities/user/user-dto";

export interface OfferPreviewDTO {
    id: string;
    occupation: string;
    title: string;
    description: string;
    user: UserDTO;
    candidates: string[];
}