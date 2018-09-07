import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>;

  selectedVideo: Video;
  private hidenewVideo:boolean = true;

  constructor(private _videoService : VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video:any){
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddValue(video : Video){
      this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        // This code is mainly used for updated videos show in UI 
          this.videos.push(resNewVideo);
          this.hidenewVideo = true;
          this.selectedVideo = resNewVideo;
      });
  }

  onUpdateVideoEvent(video : any){
    this._videoService.updateVideo(video)
    .subscribe(resUpdateVideo => video = resUpdateVideo);
    this.selectedVideo = null;
  };

  onDeleteVideoEvent(video : any){
      let videoArray = this.videos;
      this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for(let i=0;i < videoArray.length ; i++){
          if(videoArray[i]._id === video._id)
          {
            videoArray.splice(i,1);
          }
        }
      });
      this.selectedVideo = null;
  };

  newVideo(){
      this.hidenewVideo = false;
  }

}
