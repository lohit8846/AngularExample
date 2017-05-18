import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import { Router } from '@angular/router';

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
  classFile: any;
  codeFile: any;

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

  uploadCodeFile() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, function(key){

      this.codeFile = key;
    });
  }

  setTimeout(function() {
      this.router.navigate(['/browseposts']);
  }, 3000);


  ngOnInit() {
  }

}
