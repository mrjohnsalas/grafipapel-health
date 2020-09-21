import { Question } from './question';

export class Quiz {
    id: string;
    name: string;
    description: string;
    questions: Question[];
}
