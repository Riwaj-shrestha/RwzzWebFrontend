import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { SkillsComponent } from './skills/skills.component';
import { BlogComponent } from './blog/blog.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { TruncateTextPipe } from './core/helper/utilities';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    WorkComponent,
    SkillsComponent,
    BlogComponent,
    BlogPostComponent,
    TruncateTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    TruncateTextPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
