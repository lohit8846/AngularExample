import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import { Router } from '@angular/router';
import {PostInfoService} from "../post-info.service";


@Component({
  selector: 'app-browseposts',
  templateUrl: './browseposts.component.html',
  styleUrls: ['./browseposts.component.css']
})
export class BrowsepostsComponent implements OnInit {
  auth: any;
  displayName: any;
  posts: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, public db: AngularFireDatabase,  private router: Router,private upSvc: UploadService,private postSvc: PostInfoService) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.displayName = auth.auth.displayName;
        this.auth = auth;
        this.posts = this.db.list('/posts/');
      }
    });
  }

  routeSubmission(id: string){
    this.postSvc.setPostId(id);
    this.router.navigate(['/submission']);
  }

  ngOnInit() {
  }

}
