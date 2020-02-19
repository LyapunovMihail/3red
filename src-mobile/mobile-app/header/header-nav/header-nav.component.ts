import { Component, Input, OnInit } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { HeaderService, IHeaderLink } from '../header.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  @Input() public anchors: IHeaderLink[] = [];
  @Input() public isFixed: boolean;
  @Input() public isSided: boolean;
  @Input() public pageName: string;

  public anchorBlock = '';

  constructor(
      private windowEventsService: WindowEventsService,
      private headerService: HeaderService,
      private activatedRouter: ActivatedRoute,
      public router: Router
  ) { }

  ngOnInit() {
    this.activatedRouter.fragment.subscribe((fragment) => {
      this.anchorBlock = fragment;
      console.log('this.fragment: ', this.anchorBlock);
      navigator.geolocation.getCurrentPosition((data) => console.log('navigator.authentication: ', data), (err) => {
        console.log('err: ', err);
      });
    });
  }

  toAcnchor(url) {
    const elem = document.querySelector(url);
    window.scrollTo(elem);
  }
}
