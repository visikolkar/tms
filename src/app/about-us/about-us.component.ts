import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  
  version: string = environment.VERSION;
  constructor() { }

  ngOnInit() {
    
    console.log('app version is ', this.version);
  }

}
