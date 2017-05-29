import { Injectable } from '@angular/core';

@Injectable()
export class PostInfoService {
  postId: string;

  constructor() {
  }

  setPostId(id: string) {
    this.postId = id;
  }

  getPostId(){
    return this.postId;
  }

}
