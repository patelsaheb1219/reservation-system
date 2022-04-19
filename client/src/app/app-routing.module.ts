import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  { path: "about", component: AboutComponent },
  { path: "info", component: InfoComponent },
  { path: "add", component: AddReservationComponent },
  { path: "edit", component: EditReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
