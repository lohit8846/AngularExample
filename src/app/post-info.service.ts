import { Injectable } from '@angular/core';

@Injectable()
export class PostInfoService {
  postId: string;
  result: any;

  constructor() {
  }

  setPostId(id: string) {
    this.postId = id;
  }

  getPostId(){
    return this.postId;
  }

  setResult(res: any) {
    this.result = res;
  }

  getResult() {
    return this.result;
  }

}
