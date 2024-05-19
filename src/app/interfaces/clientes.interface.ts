export interface User {
    id: number;
    name: string;
    last_name: string;
    address: string;
    email: string;
    card_number: number;
    password: string;
    role: 'user' | 'admin'
}