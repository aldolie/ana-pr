import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxEditorModule } from 'ngx-editor';


import { AppComponent } from './app.component';
import { AnalyzesComponent } from './analyzes/analyzes.component';
import { AnalysisDetailComponent } from './analysis-detail/analysis-detail.component';

import { AnalysisService } from './analysis.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SafeHtml } from './safe-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AnalyzesComponent,
    AnalysisDetailComponent,
    DashboardComponent,
    NavigationComponent,
    LoginComponent,
    ProfileComponent,
    SafeHtml,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFontAwesomeModule,
    NgxEditorModule,
    AppRoutingModule
  ],
  providers: [
    AnalysisService,
    AuthService,
    AuthGuardService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true 
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
