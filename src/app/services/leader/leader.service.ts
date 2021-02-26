import { Injectable } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from '../http/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
    return  this.http.get<Leader[]>(BaseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return  this.http.get<Leader>(BaseURL + 'leadership/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(BaseURL + 'leadership?featured=true').pipe(map(Leaderes => Leaderes[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
