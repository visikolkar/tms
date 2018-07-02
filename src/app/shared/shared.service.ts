import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {
    @Output() fire: EventEmitter<any> = new EventEmitter();

    constructor() { }

    update(obj) {
        console.log('calendar update');
        this.fire.emit(obj);
    }

    getEmittedValue() {
        return this.fire;
    }
}