import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, RequestOptionsArgs, RequestMethod, Headers, Request } from '@angular/http';
const ipfs = require('ipfs-js');

@Injectable()
export class IpfsService {

  ipfsEndpoint = 'http://localhost:4201/upload/ipfs';
  constructor(private http: Http) { }

  fileChange(fileList: FileList) {
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file);
      const headers = new Headers();
      headers.append('Accept', 'application/json');

      const basicOptions: RequestOptionsArgs = {
        url: this.ipfsEndpoint,
        method: RequestMethod.Post,
        headers: headers,
        body: formData
      };

      const options = new RequestOptions(basicOptions);
      return this.http.request(new Request(options))
        .map(res => res.json());
    }
  }

  getBase64(files, callback) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function (readerEvt) {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

}
