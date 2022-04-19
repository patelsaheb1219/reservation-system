import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reservation System';
  currentRoute?: string;
  reservations?: Array<any> = [];

  constructor(private router: Router, private appService: AppService) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
    this.getReservations();
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.appService.getAllReservations().subscribe(response => {
      if (response.success) {
        this.reservations = response.data;
      }
    })
  }

  onEdit(reservation: any) {
    this.router.navigate(['edit'], { state: { reservation } });
  }

  async onDelete(id: string) {
    await this.appService.deleteReservation(id).subscribe(response => {
      if (response.success) {
        this.getReservations();
      }
    });
  }

  stringAsDate(dateStr: string) {
    return `${new Date(dateStr).getUTCDate()}/${new Date(dateStr).getUTCMonth()}/${new Date(dateStr).getUTCFullYear()}`;
  }
}
