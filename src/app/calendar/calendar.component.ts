import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { LoaderService } from '../loader/loader.service';
import { MatSnackBar } from '@angular/material';
import { CalendarService } from './calendar.service';
import { SharedService } from '../shared/shared.service';

export interface CalendarDate {
	mDate: moment.Moment;
	selected?: boolean; //? makes it optional parameter
	today?: boolean; //? makes it optional parameter
	approved?: boolean;
	rejected?: boolean;
	saved?: boolean;
	submitted?: boolean;
	// isRange?: boolean;
}

@Component({
	selector: 'tms-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnChanges {

	currentDate = moment();
	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	//below dates to be fetched from employee data through an api call
	approvedDates = [];
	rejectedDates = [];
	savedDates = [];
	submittedDates = [];
	weeks: CalendarDate[][] = [];
	sortedDates: CalendarDate[] = [];

	@Input() selectedDates: CalendarDate[] = [];
	@Output() onSelectDate = new EventEmitter<CalendarDate>();

	constructor(private calendarService: CalendarService,
		private loaderService: LoaderService,
		public notificationBar: MatSnackBar,
		private sharedService: SharedService) { }

	openNotificationbar(message: string, action: string) {
		this.notificationBar.open(message, action, {
			duration: 5000,
			verticalPosition: 'top'
		});
	}

	ngOnInit(): void {
		this.generateCalendar();
		this.calendar();
		//assign approvedDates and rejectedDates from localStorage
		// if (localStorage.getItem('calendarInfo')) {
		// 	var colorDates = JSON.parse(localStorage.getItem('calendarInfo'));
		// 	this.approvedDates = colorDates.approvedDates;
		// 	this.rejectedDates = colorDates.rejectedDates;
		// 	this.savedDates = colorDates.savedDates;
		// 	this.submittedDates = colorDates.submittedDates;
		// 	this.generateCalendar();
		// }
		this.sharedService.getEmittedValue()
			.subscribe(
				(item) => {
					console.log('calendar emitted value is ', item);
					this.approvedDates = JSON.parse(JSON.stringify(item.approvedDates));
					this.rejectedDates = JSON.parse(JSON.stringify(item.rejectedDates));
					this.savedDates = JSON.parse(JSON.stringify(item.savedDates));
					this.submittedDates = JSON.parse(JSON.stringify(item.submittedDates));
					this.generateCalendar();
				}
			);
	}

	calendar(): void {
		//this.showLoader();
		this.loaderService.show();
		this.calendarService.calendar()
			.subscribe(
				(response) => {
					console.log('calender api response is', response);
					if (response['status'] == 'true') {
						this.approvedDates = response['data']['approvedDates'];
						this.rejectedDates = response['data']['rejectedDates'];
						this.savedDates = response['data']['savedDates'];
						this.submittedDates = response['data']['submittedDates'];
						this.generateCalendar();
						localStorage.setItem('calendarInfo', JSON.stringify(response['data']));
					} else {
						console.log('Login failed', response);
						this.openNotificationbar(response['message'], 'Close');
					}
					this.loaderService.hide();
				}, (err) => {
					console.error('something does not look good', err);
					this.loaderService.hide();
				}, () => {
					this.loaderService.hide(); //on complete hide the loader
				}
			);
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
			//return moment(date.format("DD-MM-YYYY")).isSame(d);
			if (date.format("DD-MM-YYYY") == d) {
				return true;
			} else {
				return false;
			}
		});
	}

	isRejected(date: moment.Moment): boolean {
		return _.some(this.rejectedDates, function (d) {
			//return moment(date.format("DD-MM-YYYY")).isSame(d);
			if (date.format("DD-MM-YYYY") == d) {
				return true;
			} else {
				return false;
			}
		});
	}

	isSaved(date: moment.Moment): boolean {
		return _.some(this.savedDates, function (d) {
			//return moment(date.format("DD-MM-YYYY")).isSame(d);
			if (date.format("DD-MM-YYYY") == d) {
				return true;
			} else {
				return false;
			}
		});
	}

	isSubmitted(date: moment.Moment): boolean {
		//console.log('date is ', date);
		return _.some(this.submittedDates, function (d) {
			//console.log('inside submitted d value is ', d);
			//return moment(date.format("DD-MM-YYYY")).isSame(d);
			if (date.format("DD-MM-YYYY") == d) {
				return true;
			} else {
				return false;
			}
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
		console.log('selected date before format is ', date);
		console.log('selected date is ', date.mDate.format('DD-MM-YYYY'));
		this.loaderService.show();
		this.calendarService.calendarSelectedDate(date.mDate.format('DD-MM-YYYY'))
			.subscribe(
				(response) => {
					console.log('calendarSelectedDate api response is', response);
					if (response['status'] == 'true') {
						this.sharedService.logeffortUpdate(response['data']);
					} else {
						console.log('calendarSelectedDate failed', response);
						this.openNotificationbar(response['message'], 'Close');
					}
					this.loaderService.hide();
				}, (err) => {
					console.error('something does not look good', err);
					this.loaderService.hide();
				}, () => {
					this.loaderService.hide(); //on complete hide the loader
				}
			);
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
		//console.log('curretDate value is', this.currentDate);
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
				//console.log('date value of type number is', date);
				const d = moment(firstDayOfGrid).date(date);
				//console.log('value of d is ', d);
				//console.log('the submitted date is ', this.isSubmitted(d));
				return {
					approved: this.isApproved(d),
					rejected: this.isRejected(d),
					saved: this.isSaved(d),
					submitted: this.isSubmitted(d),
					today: this.isToday(d),
					selected: this.isSelected(d),
					mDate: d,
				};
			});
	}
}
