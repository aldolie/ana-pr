import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../analysis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis-add',
  templateUrl: './analysis-add.component.html',
  styleUrls: ['./analysis-add.component.css']
})
export class AnalysisAddComponent implements OnInit {

  name: string = '';
  value: string = '';
  priviledge: number;

  config = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "0",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"]
    ]
};

  constructor(private router: Router, private analysisService: AnalysisService) { }

  ngOnInit() {


  }

  submit() {
    this.analysisService.createAnalysis({
        id: null,
        priviledge: this.priviledge,
        name: this.name,
        value: this.value
    }).subscribe(analysis => {
        this.router.navigate(['dashboard']);
    }, error => {
      console.log(error);
    });
  }

}
