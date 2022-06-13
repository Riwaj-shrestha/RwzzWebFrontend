import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../shared/interface/blogpost';
import { BlogService } from '../core/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
posts = [];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getBlogList().subscribe(res => {
      this.posts = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Blogpost;
      });
    });
  }


}
