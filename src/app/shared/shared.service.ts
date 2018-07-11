import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {
    @Output() fire: EventEmitter<any> = new EventEmitter();
    @Output() calendarSelectedDate: EventEmitter<any> = new EventEmitter();
    @Output() projectLists: EventEmitter<any> = new EventEmitter();

    constructor() { }

    update(obj) {
        console.log('calendar update');
        this.fire.emit(obj);
    }

    getEmittedValue() {
        return this.fire;
    }

    logeffortUpdate(obj) {
        console.log('logeffort update');
        this.calendarSelectedDate.emit(obj);
    }

    getLogeffort() {
        return this.calendarSelectedDate;
    }

    activeProjectLists(obj) {
        this.projectLists.emit(obj);
    }

    getActiveProjectLists() {
        return this.projectLists;
    }
}