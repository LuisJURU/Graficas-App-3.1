import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarrasComponent } from './barras/barras.component';
import { AnillosComponent } from './anillos/anillos.component';
import { DispersionComponent } from './dispersion/dispersion.component';
import { RadarComponent } from './radar/radar.component';
import { CircularesComponent } from './circulares/circulares.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'barras', component: BarrasComponent, canActivate: [AuthGuard] },
    { path: 'circulares', component: CircularesComponent, canActivate: [AuthGuard] },
    { path: 'anillos', component: AnillosComponent, canActivate: [AuthGuard] },
    { path: 'dispersion', component: DispersionComponent, canActivate: [AuthGuard] },
    { path: 'radar', component: RadarComponent, canActivate: [AuthGuard] },
];