export class Pager {
    index: number;
    size: number;
    count: number;
    completed: number;
    completedPercent: string;

    constructor(index: number, size: number, count: number) {
        this.index = index;
        this.size = size;
        this.count = count;
    }
}
