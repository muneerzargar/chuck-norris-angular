export interface IJokeItem {
    id: number;
    joke: string;
    category: string[];
    buttonLabel?: string;
    type?: string;
}

export interface IResponse {
    type: string;
    value: IJokeItem[];
}
