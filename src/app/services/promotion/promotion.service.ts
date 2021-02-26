import { Injectable } from '@angular/core';
import { Promotion } from '../../shared/promotion';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from '../http/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  getpromotions(): Observable<Promotion[]> {
    return  this.http.get<Promotion[]>(BaseURL + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return  this.http.get<Promotion>(BaseURL + 'promotions/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return  this.http.get<Promotion[]>(BaseURL + 'promotions?featured=true').pipe(map(Promotiones => Promotiones[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
