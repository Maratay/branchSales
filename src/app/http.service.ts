import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICandidate } from './interfaces/candidate';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "https://localhost:44345";
  http= inject(HttpClient);
  constructor() { }

  getAllCandidate(){
    return this.http.get<ICandidate[]>(this.apiUrl + "/api/GetAllCandidates");  
  }
  createCandidate(candidate:ICandidate){
    console.log(candidate,"Service");
    return this.http.post(this.apiUrl + '/api/SaveCandidate',candidate);
  }
  getCandidate(id: number) {
    return this.http.get<ICandidate>(`${this.apiUrl}/api/GetCandidateById/${id}`);
  }
  updateCandidate(candidateId: number,candidate:ICandidate) {
    return this.http.put<ICandidate>(this.apiUrl + '/api/UpdateCandidate/' +candidateId,candidate);
  }
  deleteCandidate(id: number) {
    return this.http.delete<ICandidate>(`${this.apiUrl}/api/DeleteCandidate/${id}`);
  }
}
// const param = new HttpParams().set('id', candidateId);
// return this.http.get<ICandidate>(`${this.apiUrl}/api/GetCandidateById`, { params: param });