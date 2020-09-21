import { Option } from './option';

export class Question {
    id: number;
    name: string;
    options: Option[];
    answered: boolean;
}
