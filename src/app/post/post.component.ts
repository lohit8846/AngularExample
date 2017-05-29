import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  auth: any;
  displayName: any;
  compensation: any;
  classFile: any;
  testFile: any;
  title: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, public db: AngularFireDatabase,  private router: Router,private upSvc: UploadService) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.displayName = auth.auth.displayName;
        this.auth = auth;
      }
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadClassFile() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, (key) => {
      this.classFile = key;
    });
  }

  uploadTestFile() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, (key) => {

      this.testFile = key;
    });
  }


  uploadPosting() {
    if (this.compensation !== undefined && this.classFile !== undefined && this.testFile !== undefined) {
       const postsObservable = this.db.list('/posts/');
       postsObservable.push({
          posterId: this.auth.uid,
          name: this.displayName,
          createdAt: Date.now(),
          title: this.title,
          compensation: this.compensation,
          classFile: this.classFile,
          testFile: this.testFile
       });
      this.router.navigateByUrl('/browseposts');
    }
  }

  ngOnInit() {
  }


  logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

}
