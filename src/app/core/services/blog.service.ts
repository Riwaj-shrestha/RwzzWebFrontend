import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { error } from 'protractor';
import { Blogpost } from '../../shared/interface/blogpost';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private angularFirestore: AngularFirestore) { }

  getBlog = (id) => this.angularFirestore.collection('blog-collection').doc(id).valueChanges();

  getBlogList = () => this.angularFirestore.collection('blog-collection').snapshotChanges();

  createBlogPost = (blogPost: Blogpost) => {
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection('blog-collection').add(blogPost).then(response => {
        console.log(response);
      });
    });
  }

}
