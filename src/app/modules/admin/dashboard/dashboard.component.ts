import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { log } from 'util';
import { Blogpost } from '../../../shared/interface/blogpost';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  blogPostForm: FormGroup;
  posts = [];
  imageUrl;

  constructor(public afAuth: AngularFireAuth, private blogService: BlogService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.blogPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      authorName: new FormControl('Riwaj Shrestha', Validators.required),
      publicationDate: new FormControl(this.getCurrentDate(), Validators.required),
      likes: new FormControl(0, Validators.required),
      image: new FormControl(null)
    });
  }

  getCurrentDate = () => {
    const today = new Date();
    return today.toDateString();
  }

  uploadFile(event) {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.blogPostForm.patchValue({
          image: reader.result
        });
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  submit() {
    console.log(this.blogPostForm.value);
    this.blogService.createBlogPost(this.blogPostForm.value).then(r => {
      console.log(r);
    });
  }

  getPosts() {
    this.blogService.getBlogList().subscribe(res => {
      this.posts = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Blogpost;
      });
      console.log(this.posts);
    });
  }

  logout(): void {
    this.afAuth.signOut().then();
  }

}
