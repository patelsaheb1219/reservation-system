import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  title = 'client';
  currentRoute?: string;
  roomType?: string = "";
  fromDate?: Date;
  toDate?: Date;
  breakfast: any = false;
  air_conditioner?: boolean = false;
  wakeup_service?:boolean = false;

  constructor(private router: Router, private appService: AppService) {
    
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    let facilityArr = [];
    if (this.roomType === "" || this.fromDate === undefined || this.toDate === undefined) {
      alert('Please enter all * required fields');
      return;
    }
    if (this.air_conditioner === true) {
      facilityArr.push("air_conditioner");
    }
    if (this.wakeup_service === true) {
      facilityArr.push("wakeup_service");
    }
    const reservation = {
      roomType: this.roomType,
      breakfast: (this.breakfast === "Yes"),
      fromDate: this.fromDate,
      toDate: this.toDate,
      extraFacilities: facilityArr
    };

    this.appService.createReservation(reservation).subscribe(response => {
      if (response.success) {
        window.location.href = "/";
      }
    });
  }

}
