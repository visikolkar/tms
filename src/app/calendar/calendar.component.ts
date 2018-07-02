import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
	approvedDates = [];
	rejectedDates = [];
	notFilledDates = [];
	weeks: CalendarDate[][] = [];
	sortedDates: CalendarDate[] = [];

	@Input() selectedDates: CalendarDate[] = [];
	@Output() onSelectDate = new EventEmitter<CalendarDate>();

	constructor(private calendarService: CalendarService, private loaderService: LoaderService, public notificationBar: MatSnackBar, private sharedService: SharedService) { }

	openNotificationbar(message: string, action: string) {
        this.notificationBar.open(message, action, {
            duration: 5000,
        });
    }

	ngOnInit(): void {
		this.generateCalendar();
		this.calendar();
		//assign approvedDates and rejectedDates from localStorage
		if(localStorage.getItem('calendarInfo')){
			var colorDates = JSON.parse(localStorage.getItem('calendarInfo'));
			this.approvedDates = colorDates.approvedDates;
			this.rejectedDates = colorDates.rejectedDates;
			this.notFilledDates = colorDates.notFilledDates;
			this.generateCalendar();
		}
		this.sharedService.getEmittedValue()
			.subscribe(
				(item) => {
					console.log('calendar emitted value is ', item);
					this.approvedDates = JSON.parse(JSON.stringify(item.approvedDates));
					this.rejectedDates = JSON.parse(JSON.stringify(item.rejectedDates));
					this.notFilledDates = JSON.parse(JSON.stringify(item.notFilledDates));
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
                    if(response['status'] == 'true'){
						this.approvedDates = response['data']['approvedDates'];
						this.rejectedDates = response['data']['rejectedDates'];
						this.notFilledDates = response['data']['notFilledDates'];
                        localStorage.setItem('calendarInfo', JSON.stringify(response['data']));
                    } else {
                        console.log('Login failed', response);
                        this.openNotificationbar(response['message'], 'Close');
                    }
                }, (err) => {
                    console.error('something does not look good',err);
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
