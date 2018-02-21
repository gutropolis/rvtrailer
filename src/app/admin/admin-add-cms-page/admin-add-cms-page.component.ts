import { ApiService } from './../../api.service';
import { Component, OnInit, Input, Output,  AfterViewInit, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'rv-admin-add-cms-page',
  templateUrl: './admin-add-cms-page.component.html',
  styleUrls: ['./admin-add-cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAddCmsPageComponent implements OnInit, AfterViewInit, OnDestroy  {

@Input() elementId: String;
@Input() content: String;

  @Output() onEditorContentChange = new EventEmitter();

  editor;
rForm: FormGroup;
cmspage: {};
text = "";

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: '../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  constructor(private fb: FormBuilder,
              public router:Router,
              public apiService:ApiService) {

      this.rForm = fb.group({
      'slug' : [null, Validators.required],
      'body' : [null, Validators.required],
      'created_at':Date.now(),
      });

  }

  ngOnInit() {
  }

  onSubmitNewCmsPage() {
     this.apiService.addCmsPage(this.rForm.value).then((result) => {
      console.log(this.rForm.value);
        let id = result['_id'];
        this.router.navigate(['admin/cmspage']);
      }, (err) => {
        console.log(err);
      });
  }

    onSubmit() {
    this.apiService.addUser(this.rForm.value).then((result) => {
     // console.log(this.rForm.value);
      let id = result['_id'];
      this.router.navigate(['admin/user']);
    }, (err) => {
      console.log(err);
    });
  }

}
