import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdditionalPageComponent } from './pages/additional-page/additional-page.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { PublicLayoutComponent } from './pages/layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'additional/:type', component: AdditionalPageComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'personal-data', component: PersonalDataComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], // 👈 ЗАЩИТА
    children: [{ path: '', component: AdminPageComponent }],
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
