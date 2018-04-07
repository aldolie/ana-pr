import { Component, OnInit } from '@angular/core';
import { Analysis } from '../models/analysis';
import { AnalysisService } from '../analysis.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-analyzes',
  templateUrl: './analyzes.component.html',
  styleUrls: ['./analyzes.component.css']
})
export class AnalyzesComponent implements OnInit {

  selectedAnalysis: Analysis;

  analyzes: Analysis[];

  isAdmin: boolean = false;


  constructor(private analysisService: AnalysisService, private authService: AuthService) { 
      this.isAdmin = this.authService.isAdmin();
      this.authService.getSession.subscribe(session => {
          this.isAdmin = this.authService.isAdmin();
      });
  }

  ngOnInit() {
    this.getAnalyzes();
  }

  onSelect(analysis: Analysis): void {
    this.selectedAnalysis = analysis;
  }

  getAnalyzes(): void {
    this.analysisService.getAnalyzes().subscribe(analyzes => this.analyzes = analyzes);
  }

}
