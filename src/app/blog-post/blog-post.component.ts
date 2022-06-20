import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../core/services/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  postId;
  blogPost;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.postId = this.activeRoute.snapshot.paramMap.get('postId');
    this.blogService.getBlog(this.postId).subscribe(data => {
      this.blogPost = data;
    });
  }

}
