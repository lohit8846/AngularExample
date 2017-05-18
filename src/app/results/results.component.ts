import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  auth: any;
  displayName: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, public db: AngularFireDatabase,  private router: Router,private upSvc: UploadService) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.displayName = auth.auth.displayName;
        this.auth = auth;
      }
    });
  }

  ngOnInit() {
  }

}
