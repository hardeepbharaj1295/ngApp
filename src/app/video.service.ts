import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Video } from './video';

@Injectable()
export class VideoService {

  /**
   * Select, Insert, Update, Delete
   * connection url
   */
  private _getUrl = "/api/videos";
  private _postUrl = "/api/video";
  private _putUrl = "/api/video/";
  private _deleteUrl = "/api/video/";


  constructor(private _http: Http) { }

  /**
   * method to get data from the db
   */
  getVideos(){
      return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }
  /**
   * MEthod to insert data into db
   */
  addVideo(video : Video){
      let headers = new Headers({ 'Content-Type' : 'application/json'});
      let options = new RequestOptions({ headers : headers});
      return this._http.post(this._postUrl,JSON.stringify(video), options)
      .map((response : Response) => response.json());
  }

  /**
   * Method to update data into db
   */
  updateVideo(video : Video){
    let headers = new Headers({ 'Content-Type' : 'application/json'});
    let options = new RequestOptions({ headers : headers});
    return this._http.put(this._putUrl + video._id,JSON.stringify(video), options)
    .map((response : Response) => response.json());
  }

  /**
   * Method to delete data into db
   */
  deleteVideo(video : Video){
    return this._http.delete(this._deleteUrl + video._id)
    .map((response : Response) => response.json());
  }
}
