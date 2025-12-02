import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { BlaguesComponent } from './blagues/blagues';
import { SearchBlaguesComponent } from './search/search';
import { MemoryComponent } from './memory/memory';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login';
import { LabyrintheComponent } from './labyrinthe/labyrinthe';




export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'blagues', component: BlaguesComponent, canActivate: [AuthGuard], },
    { path: 'recherche', component: SearchBlaguesComponent, canActivate: [AuthGuard], },
    { path: 'memory', component: MemoryComponent, canActivate: [AuthGuard], },
    { path: 'labyrinthe', component: LabyrintheComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];
