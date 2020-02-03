import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { DeployComponent } from './components/deploy/deploy.component';
import { StartprocComponent } from './components/startproc/startproc.component';
import { ListinversionesComponent } from './components/listinversiones/listinversiones.component';
import { InversiontaskComponent } from './components/inversiontask/inversiontask.component';
import { DeployResolver } from './resolvers/deploy.resolver';

// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full'},
//   { path: 'login', component: LoginComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'deploy', component: DeployComponent },
// ];

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent ,
  children: [
    { path: 'deploy', component: DeployComponent  , outlet: 'contenedor',  resolve: { listprocesses: DeployResolver }},
    { path: 'start-proc', component: StartprocComponent  , outlet: 'contenedor'},
    { path: 'list-inversiones', component: ListinversionesComponent  , outlet: 'contenedor'},
    { path: 'inversion-task/:taskId', component: InversiontaskComponent  , outlet: 'contenedor'}
  ], runGuardsAndResolvers: 'always',
}
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {enableTracing: false, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
