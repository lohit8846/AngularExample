import { Component, OnInit, Inject } from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import { Router } from '@angular/router';
import {PostInfoService} from "../post-info.service";

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  auth: any;
  displayName: any;
  post: any;
  classFile: any;
  testFile: any;
  sourceFile: any;
  results: string;


  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, public db: AngularFireDatabase,  private router: Router,private upSvc: UploadService, private postSvc: PostInfoService, private http: Http) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.displayName = auth.auth.displayName;
        this.auth = auth;
        this.post = db.object('/posts/' + this.postSvc.getPostId(), { preserveSnapshot: true });
        this.post.subscribe(snapshot => {
          this.classFile = db.object('/uploads/' + snapshot.val().classFile)
          this.testFile = db.object('/uploads/' + snapshot.val().testFile)
          this.post = snapshot.val();
        });
      }
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }


  uploadSubmission() {
    if (this.sourceFile !== undefined ) {
      const submissionsObservable = this.db.list('/submissions/');
      const promise = submissionsObservable.push({
        posterId: this.postSvc.getPostId(),
        name: this.displayName,
        createdAt: Date.now(),
        sourceFile: this.sourceFile
      });
      promise
        .then(obj => {
          console.log(obj);
          /*
          const endpoint = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
          const searchParams = new URLSearchParams()
          searchParams.set('submissionId', 'lol');
          this.http
            .get(endpoint, {search: searchParams})
            .map(res => res.json().response.docs);
          */
          this.router.navigateByUrl('/results');
        })
        .catch(err => console.log(err, 'You do not have access!'));
    }
  }

  uploadCodeFile() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, (key) => {

      this.sourceFile = key;
    });
  }

  ngOnInit() {
  }

}
