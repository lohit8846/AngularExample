import { Injectable } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Upload } from './upload';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class UploadService {
  constructor(private af: AngularFire, private db: AngularFireDatabase) { }

  private basePath:string = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  pushUpload(upload: Upload, callback: any) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          // upload failed
          console.log(error);
        },
        () => {
          // upload success
          upload.url = this.uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          const key = this.saveFileData(upload);
          callback(this.saveFileData(upload));
        }
      );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    return this.db.list(`${this.basePath}/`).push(upload).key;
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then( () => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }
  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
