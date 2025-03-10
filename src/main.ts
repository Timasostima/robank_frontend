import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {environment} from './environments/environment';


bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
