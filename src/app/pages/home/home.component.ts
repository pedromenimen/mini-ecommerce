import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/types/types';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  channelList: Array<Channel>;
  constructor(private utilsService: UtilsService) {
    this.channelList = this.utilsService.getChannels();
  }

  ngOnInit(): void {}
}
