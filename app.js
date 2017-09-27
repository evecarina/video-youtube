"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class Youtube {
   constructor() {
   this.result = {
      videos: [],
      selectedVideo: null,
      searchTerm: "iPhone X"
      };
      this.youtubeSearch("iPhone X");
      /*arrow function necesario*/
      $('#video-search').click(()=>{
         let current_video = $('#input-data').val();
        $("#root").empty();
         console.log(current_video);
         this.youtubeSearch(current_video);
      });

      $('div').click(()=>{
        let current_video = $('#input-data').val();
        this.playVideo(current_video);
      });
   }

   //<iframe className="embed-responsive-item" src={url}> </iframe>
   getVideoList(videos) {
     return videos.map((video, index) => {
        const imageUrl = video.snippet.thumbnails.default.url;
        const url = `https://www.youtube.com/embed/${video.id.videoId}`;
        const description=video.snippet.description;
        const title=video.snippet.title;

         return $('#root').append(`<div><img class="media-object" src=${imageUrl} />
         <p>${title}</p></div>`)


     });
   }

   youtubeSearch(searchTerm) {
      console.log(searchTerm);
      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         this.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         console.log('video',this.result.selectedVideo);
         let list = this.getVideoList(this.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });

   }

   videoList(videos) {
          const title=videos.snippet.title;
          const description=videos.snippet.description;
          const url = `https://www.youtube.com/embed/${videos.id.videoId}`;
         return $('#div_vprincipal').html(`<iframe class="embed-responsive-item" src=${url}> </iframe><p>${title}</p><p>${description}</p>`)
    }

  playVideo(searchTerm){
    let sour=event.target.src;

    let position;
    console.log('sour',sour);
       this.result.videos.map((video,index)=>{
        const imageUrl = video.snippet.thumbnails.default.url;
         return (sour==imageUrl)? position=index: '';
       });
       this.videoList(this.result.videos[position]);
}

  //  videoSearch(searchTerm) {
  //     jQuery.getJSON("list.json", data => {
  //        console.log("result", data.items);
  //        this.result = {
  //           videos: data.items,
  //           selectedVideo: data.items[0],
  //           searchTerm: searchTerm
  //        };
  //        var list = app.getVideoList(app.result.videos[0]);
  //        console.log("lis: ", list);
  //        $("#div_vprincipal").append(list);
  //     });
  //  }
}

let video = new Youtube();
