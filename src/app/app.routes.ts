import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdditionalPageComponent } from './pages/additional-page/additional-page.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent  },
  { path: 'additional/:type', component: AdditionalPageComponent  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent  },
  { path: 'personal-data', component: PersonalDataComponent  },
  { path: '**', component: NotFoundPageComponent },
];
