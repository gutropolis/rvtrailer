import { Component, OnDestroy,  AfterViewInit, EventEmitter,  Input,  Output, OnInit } from '@angular/core';


@Component({
  selector: 'cms-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input() elementId: String;
  @Output() onEditorKeyup: EventEmitter<any> = new EventEmitter<any>();

  editor;

  constructor() { }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: '../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
          editor.on('keyup', () => {
            const content = editor.getContent();
      this.onEditorKeyup.emit(content);
    });
  }

    });
  }

    ngOnDestroy() {
    tinymce.remove(this.editor);
  }





  ngOnInit() {
  }

}
