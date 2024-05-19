export interface User {
    id: number;
    name: string;
    last_name: string;
    address: string;
    email: string;
    card_number: string;
    password: string;
    rol: 'user' | 'admin';
}