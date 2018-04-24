import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';
import {Analysis} from "./models/analysis";
import {environment} from "../environments/environment";


@Injectable()
export class SocketService {
  private socket;

  public initSocket(priviledge: number): void {
    this.socket = socketIo(environment.serverUrl);
  }

  public onMessage(): Observable<Analysis> {
    return new Observable<Analysis>(observer => {
      this.socket.on('message', (data: Analysis) => observer.next(data));
    });
  }
}
