import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { BrowsepostsComponent } from './browseposts/browseposts.component';

export const firebaseConfig = {
  apiKey: "AIzaSyChwh3aLut1bbNq8J2elNwUOurbM35tKHc",
    authDomain: "devonauthproject.firebaseapp.com",
    databaseURL: "https://devonauthproject.firebaseio.com",
    storageBucket: "devonauthproject.appspot.com",
    messagingSenderId: "836353649797"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    HomeComponent,
    PostComponent,
    BrowsepostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
