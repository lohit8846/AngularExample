import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayName: any;

  constructor(public af: AngularFire, public db: AngularFireDatabase, private router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log(auth);
        this.displayName = auth.auth.displayName;
        const usersObservable = db.object('/users/' + auth.uid)
        usersObservable.set({
          displayName: auth.auth.displayName,
          email: auth.auth.email
        });
      }
    });
  }


  logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

  paymentMethod() {
    this.router.navigateByUrl('/payment');
  }

  ngOnInit() {
  }

}
