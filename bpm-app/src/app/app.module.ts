import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule

} from '@angular/material';

import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { DeployComponent } from './components/deploy/deploy.component';
import { BpmService } from './services/bpm.servcice';
import { ServicesConfiguration } from './utils/servicesconfiguration';
import { StartprocComponent } from './components/startproc/startproc.component';
import { ListinversionesComponent } from './components/listinversiones/listinversiones.component';
import { TaskComponent } from './components/task/task.component';
import { InversiontaskComponent } from './components/inversiontask/inversiontask.component';
import { DeployResolver } from './resolvers/deploy.resolver';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    DeployComponent,
    StartprocComponent,
    ListinversionesComponent,
    TaskComponent,
    InversiontaskComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [AuthService,
    AuthGuard,
    BpmService,
    ServicesConfiguration,
    DeployResolver

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
