import {Component, OnInit} from '@angular/core';
import {Analysis} from '../models/analysis';
import {AnalysisService} from '../analysis.service';
import {AuthService} from '../auth.service';
import {PageEvent} from '@angular/material';
import {SocketService} from "../socket.service";


@Component({
    selector: 'app-analyzes',
    templateUrl: './analyzes.component.html',
    styleUrls: ['./analyzes.component.css']
})
export class AnalyzesComponent implements OnInit {

    page: number = 0;
    size: number = 0;


    pageEvent: PageEvent;


    analyzes: Analysis[];

    isAdmin: boolean = false;

    ioConnection: any;

    constructor(private analysisService: AnalysisService, private authService: AuthService, private socketService: SocketService) {
        this.isAdmin = this.authService.isAdmin();
        this.authService.getSession.subscribe(session => {
            this.isAdmin = this.authService.isAdmin();
        });
    }

    ngOnInit() {
        this.getAnalyzes();
        if (!this.isAdmin) {
            this.initSocketConnection();
        }
    }

    initSocketConnection() {
        this.socketService.initSocket(this.authService.getPriviledge());
        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: Analysis) => {
                this.analyzes.unshift(message);
            });
    }

    getData($event): any {
        this.page = $event.pageIndex;
        this.getAnalyzes();
        return $event;
    }

    getAnalyzes(): void {
        this.analysisService.getAnalyzes(this.page + 1).subscribe((data: any) => {
            this.analyzes = data.result;
            this.page = data.page - 1;
            this.size = data.count;
        });
    }

}
