import { Quiz } from './quiz';
import { Employee } from './employee';

export class UserQuiz {
    id?: string;
    date: Date;
    employeeId: string;
    quiz: Quiz;
    employee?: Employee;
}
