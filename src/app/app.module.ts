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
  MatDialogModule, MatTooltipModule, MatBottomSheetModule } from '@angular/material';

// App stuff
import { AppRoutes } from './routes';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { EventsCreatedInfoDialog } from './schedule-form/schedule-form.component';
import { ScheduleModelHelpSheet } from './schedule-form/schedule-form.component';

// External stuff
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';
import { DayOfWeekPipe } from './day-of-week.pipe';
import { ValidIfDirective } from './valid-if.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ScheduleFormComponent,
    EventsCreatedInfoDialog,
    ScheduleModelHelpSheet,
    DayOfWeekPipe,
    ValidIfDirective
  ],
  entryComponents: [EventsCreatedInfoDialog, ScheduleModelHelpSheet],
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
    MatSnackBarModule,MatDialogModule,MatTooltipModule,
    MatBottomSheetModule,
    Angular2PromiseButtonModule.forRoot(
      {disableBtn: true}
    ),
  ],
  providers: [DayOfWeekPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
