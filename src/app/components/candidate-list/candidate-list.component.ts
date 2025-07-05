import { Component, inject } from '@angular/core';
import { ICandidate } from '../../interfaces/candidate';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,RouterLink],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css',
})
export class CandidateListComponent {
  router=inject(Router);
  candidateList: ICandidate[] = [];
  httpService = inject(HttpService);
  toaster = inject(ToastrService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'id',
    'jobTitle',
    'fName',
    'lName',
    'email',
    'phone',
    'workAuth',
    'cRate',
    'relocate',
    'manager',
    'action'
  ]; //'zipCode','state','city'

  ngOnInit() {
    this.getCandidateFromServer();
  }
  getCandidateFromServer(){
    this.httpService.getAllCandidate().subscribe((result) => {
    this.candidateList = result;
    console.log(this.candidateList);
    });
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/candidate/"+id)
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.deleteCandidate(id).subscribe(() => {
          console.log("Deleted");
          this.getCandidateFromServer();
          this.toaster.error('Record deleted successfully');
        });
      }
    });
  }
  // delete(id: number){
  //   this.httpService.deleteCandidate(id).subscribe(()=>{
  //     console.log("Deleted");
  //     //window.location.reload();
  //     this.getCandidateFromServer();
  //     this.toaster.error("Record deleted successfully");
  //   })
  // }
}
