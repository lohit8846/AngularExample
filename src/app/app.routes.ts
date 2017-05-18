import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { BrowsepostsComponent } from './browseposts/browseposts.component';
import { SubmissionComponent } from './submission/submission.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'post', component: PostComponent },
    { path: 'browseposts', component: BrowsepostsComponent },
    { path: 'submission', component: SubmissionComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
