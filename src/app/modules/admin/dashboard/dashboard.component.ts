import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { log } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  blogPostForm: FormGroup;

  constructor(public afAuth: AngularFireAuth, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      authorName: new FormControl('Riwaj Shrestha', Validators.required),
      publicationDate: new FormControl(Date.now(), Validators.required),
      likes: new FormControl(0, Validators.required)
    });
  }

  submit() {
    console.log(this.blogPostForm.value);
    this.blogService.createBlogPost(this.blogPostForm.value).then(r => {
      console.log(r);
    });
  }

  logout(): void {
    this.afAuth.signOut().then();
  }

}
