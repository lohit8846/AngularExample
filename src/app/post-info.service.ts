import { Injectable } from '@angular/core';

@Injectable()
export class PostInfoService {
  postId: string;
  result: string;

  constructor() {
  }

  setPostId(id: string) {
    this.postId = id;
  }

  getPostId(){
    return this.postId;
  }

  setResult(res: string) {
    this.result = res;
  }

  getResult() {
    return this.result;
  }

}
