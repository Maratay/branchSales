import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { HttpService } from '../../http.service';
import { ICandidate } from '../../interfaces/candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelect,
    MatButton,
  ],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.css',
})
export class CandidateFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  candidateForm = this.formBuilder.group({
    candidateId: ['', [Validators.required]],
    id: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    workAuth: ['', [Validators.required]],
    cRate: ['', [Validators.required]],
    relocate: ['', [Validators.required]],
    manager: ['', [Validators.required]],
  });

  // emailFormControl = new FormControl('',
  // [
  //   Validators.required,
  //   Validators.email,
  // ]);

  candidateId!: number;
  isEdit = false;
  ngOnInit() {
    this.candidateId = this.route.snapshot.params['id'];
    if (this.candidateId) {
      this.isEdit = true;
      this.httpService.getCandidate(this.candidateId).subscribe((result) => {
        console.log(result);
        this.candidateForm.patchValue(result);
      });
    }
  }

  save() {
    console.log(this.candidateForm.value);
    const candidate: ICandidate = {
      candidateId: this.candidateForm.value.id!,
      id: this.candidateForm.value.id!, //parseInt(this.candidateForm.value.id!),
      jobTitle: this.candidateForm.value.jobTitle!,
      fName: this.candidateForm.value.fName!,
      lName: this.candidateForm.value.lName!,
      email: this.candidateForm.value.email!,
      phone: this.candidateForm.value.phone!,
      city: this.candidateForm.value.city!,
      state: this.candidateForm.value.state!,
      zipCode: this.candidateForm.value.zipCode!,
      workAuth: this.candidateForm.value.workAuth!,
      cRate: this.candidateForm.value.cRate!,
      relocate: this.candidateForm.value.relocate!,
      manager: this.candidateForm.value.manager!,
    };
    if (this.isEdit) {
      this.httpService
        .updateCandidate(this.candidateId, candidate)
        .subscribe(() => {
          console.log('Updated');
          this.toaster.info('Record updated successfully');
          this.router.navigateByUrl('candidate-list');
        });
    } else {
      console.log(candidate);
      this.httpService.createCandidate(candidate).subscribe(() => {
        console.log('Added');
        this.toaster.success('Record added successfully');
        this.router.navigateByUrl('candidate-list');
      });
    }
  }
}
