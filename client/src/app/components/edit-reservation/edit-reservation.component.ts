import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  title = 'client';
  reservation?: any;
  roomType?: string = "";
  fromDate?: Date;
  toDate?: Date;
  breakfast: any = false;
  air_conditioner?: boolean = false;
  wakeup_service?: boolean = false;

  constructor(private router: Router, private appService: AppService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['reservation']) {
      this.reservation = navigation?.extras?.state?.['reservation'];
      console.log(this.reservation);
      this.roomType = this.reservation.roomType;
      this.fromDate = this.reservation.fromDate;
      this.toDate = this.reservation.toDate;
      this.breakfast = this.reservation.breakfast ? "Yes" : "No";
      this.air_conditioner = this.reservation.extraFacilities.includes("air_conditioner") ? true : false;
      this.wakeup_service = this.reservation.extraFacilities.includes("wakeup_service") ? true : false;
    } else {
      this.router.navigate(["/"]);
    }
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
    
    this.appService.updateReservation(this.reservation._id, reservation).subscribe(response => {
      if (response.success) {
        window.location.href = "/";
      }
    });
  }

}
