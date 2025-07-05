import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

export const routes: Routes = [
  {
    path: '',
    component: CandidateListComponent,
  },
  {
    path: 'candidate-list',
    component: CandidateListComponent,
  },
  {
    path: 'create-candidate',
    component: CandidateFormComponent,
  },
  {
    path: 'candidate/:id',
    component: CandidateFormComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), MatDialogModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
