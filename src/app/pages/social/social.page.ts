import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  popUpCenter(url, title, w, h) {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )
    if (window.focus) newWindow.focus();
  }

share(socialPlatform: any) {
    const url = encodeURIComponent("www.journal4life.com");
    switch (socialPlatform) {
      case 'fb':
        this.popUpCenter(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'Share to Facebook', 700, 500);
        break;
      case 'tw':
        this.popUpCenter(`https://twitter.com/home?status=${url}`, 'Share to Twitter', 700, 500);
        break;
      case 'in':
        this.popUpCenter(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, 'Share to Linkedin', 700, 500);
        break;
      case 'tr':
        this.popUpCenter(`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}`, 'Share to Tumblr', 700, 500);
        break;
      case 'rd':
        this.popUpCenter(`https://reddit.com/submit?url=${url}`, 'Share to Reddit', 700, 500);
        break;
      case 'pn':
        this.popUpCenter(`https://www.pinterest.com/pin/find/?url=${url}`, 'Share to Pinterest', 700, 500);
        break;
      default:
        break;
    }
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
