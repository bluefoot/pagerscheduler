// Core stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material stuff
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule,
  MatInputModule, MatFormFieldModule, MatIconModule, MatSnackBarModule,
  MatDialogModule } from '@angular/material';

// App stuff
import { AppRoutes } from './routes';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { EventsCreatedInfoDialog } from './schedule-form/schedule-form.component';

// External stuff
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ScheduleFormComponent,
    EventsCreatedInfoDialog
  ],
  entryComponents: [EventsCreatedInfoDialog],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,MatFormFieldModule,MatIconModule,
    MatSnackBarModule,MatDialogModule,
    Angular2PromiseButtonModule.forRoot(
      {disableBtn: true}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
