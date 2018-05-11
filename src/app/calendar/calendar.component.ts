import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
	mDate: moment.Moment;
	selected?: boolean; //? makes it optional parameter
	today?: boolean; //? makes it optional parameter
	approved?: boolean;
	rejected?: boolean;
  //isRange?: boolean;
}

@Component({
	selector: 'tms-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {

	currentDate = moment();
	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	//below dates to be fetched from employee data through an api call
	approvedDates = ['05-03-2018','05-04-2018', '05-07-2018', '04-07-2018'];
	rejectedDates = ['05-02-2018','05-01-2018'];
	weeks: CalendarDate[][] = [];
	sortedDates: CalendarDate[] = [];

	@Input() selectedDates: CalendarDate[] = [];
	@Output() onSelectDate = new EventEmitter<CalendarDate>();

	constructor() { }

	ngOnInit(): void {
		this.generateCalendar();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedDates &&
			changes.selectedDates.currentValue &&
			changes.selectedDates.currentValue.length > 1) {
			// sort on date changes for better performance when range checking
			this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
			this.generateCalendar();
		}
	}

	// date checkers

	isToday(date: moment.Moment): boolean {
		return moment().isSame(moment(date), 'day');
	}

	isApproved(date: moment.Moment): boolean {
		return _.some(this.approvedDates, function (d) {
			return moment(date.format("MM-DD-YYYY")).isSame(d);
		});
	}

	isRejected(date: moment.Moment): boolean {
		return _.some(this.rejectedDates, function (d) {
			return moment(date.format("MM-DD-YYYY")).isSame(d);
		});
	}

	isSelected(date: moment.Moment): boolean {
		return _.findIndex(this.selectedDates, (selectedDate) => {
			return moment(date).isSame(selectedDate.mDate, 'day');
		}) > -1;
	}

	isSelectedMonth(date: moment.Moment): boolean {
		return moment(date).isSame(this.currentDate, 'month');
	}

	selectDate(date: CalendarDate): void {
		this.onSelectDate.emit(date);
	}

	// actions from calendar

	prevMonth(): void {
		this.currentDate = moment(this.currentDate).subtract(1, 'months');
		this.generateCalendar();
	}

	nextMonth(): void {
		this.currentDate = moment(this.currentDate).add(1, 'months');
		this.generateCalendar();
	}

	firstMonth(): void {
		this.currentDate = moment(this.currentDate).startOf('year');
		this.generateCalendar();
	}

	lastMonth(): void {
		this.currentDate = moment(this.currentDate).endOf('year');
		this.generateCalendar();
	}

	prevYear(): void {
		this.currentDate = moment(this.currentDate).subtract(1, 'year');
		this.generateCalendar();
	}

	nextYear(): void {
		this.currentDate = moment(this.currentDate).add(1, 'year');
		this.generateCalendar();
	}

	// generate the calendar grid

	generateCalendar(): void {
		console.log('curretDate value is', this.currentDate);
		const dates = this.fillDates(this.currentDate);
		const weeks: CalendarDate[][] = [];
		while (dates.length > 0) {
			weeks.push(dates.splice(0, 7));
		}
		this.weeks = weeks;
	}

	fillDates(currentMoment: moment.Moment): CalendarDate[] {
		const firstOfMonth = moment(currentMoment).startOf('month').day();
		const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
		const start = firstDayOfGrid.date();
		return _.range(start, start + 42)
			.map((date: number): CalendarDate => {
				console.log('date value of type number is', date);
				const d = moment(firstDayOfGrid).date(date);
				console.log('the approved date is ', this.isApproved(d));
				return {
					approved: this.isApproved(d),
					rejected: this.isRejected(d),
					today: this.isToday(d),
					selected: this.isSelected(d),
					mDate: d,
				};
			});
	}
}
