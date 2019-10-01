import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoundsTableComponent } from './rounds-table/rounds-table.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {path: '', redirectTo: '/local', pathMatch: 'full'},
  {path: 'local', component: RoundsTableComponent },
  {path: 'global', component: StatisticsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
