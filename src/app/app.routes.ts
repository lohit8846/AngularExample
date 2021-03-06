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
import { ResultsComponent } from './results/results.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'post', component: PostComponent, canActivate: [AuthGuard]},
    { path: 'browseposts', component: BrowsepostsComponent, canActivate: [AuthGuard]},
    { path: 'submission', component: SubmissionComponent, canActivate: [AuthGuard]},
    { path: 'results', component: ResultsComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
