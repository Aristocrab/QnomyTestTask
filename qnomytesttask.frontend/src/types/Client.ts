import { ClientStatus } from "./ClientStatus";

export interface Client {
    id: string;
    fullName: string;
    numberInLine: number;
    checkInTime: Date;
    status: ClientStatus;
}