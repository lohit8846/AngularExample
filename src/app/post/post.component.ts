import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  auth: any;
  displayName: any;
  compensation: string;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, public db: AngularFireDatabase,  private router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.displayName = auth.auth.displayName;
        this.auth = auth;
      }
    });
  }

  uploadPosting() {

    console.log(this.compensation);
    /*const postsObservable = this.db.list('/posts/');
    postsObservable.push({
      compensation: 'lol',
      skeletonFile: 'lol'
    });*/

  }

  submitPost() {
  	console.log("works");
  }

  ngOnInit() {
  }


  logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

}
