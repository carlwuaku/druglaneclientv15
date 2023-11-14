import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { DateService } from '../../date/date.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverAddress = new BehaviorSubject("");
  public socketAddress = new BehaviorSubject("http://127.0.0.1:5000");

  constructor(private httpClient: HttpClient, private dateService: DateService) {
    //if offline version, use the server address. else use the explicitly set address
    if (environment.environment == 'offline') {
      const url = window.location.href;
      const parts = url.split("/")//get localhost:5000 or something, login
      const _url = parts[0] + "//" + parts[1] + "" + parts[2] + "/"
      this.serverAddress.next(_url);
      this.socketAddress.next(_url);
    }
    else {
      this.serverAddress.next(environment.host)
    }
   }

  public constructURL(url: string, doNotEncode?: boolean): string {
    if (doNotEncode) {
      return `${this.serverAddress.value}${url}`;
    }
    return encodeURI(
      `${this.serverAddress.value}${url}`
    );
  }

  private getHeaders(additionalHeaders?: HttpHeaders): HttpHeaders {
    const result: HttpHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "cache-control": "no-cache",
      Pragma: "no-cache",
      Expires: "Sat, 01 Jan 2000 00:00:00 GMT"
    });

    if (!additionalHeaders) {
      return result;
    } // No additional headers, do an early exit

    for (const key in additionalHeaders.keys()) {
      if (result.has(key)) {
        // Header already exists, update its value
        result.set(key, additionalHeaders.get(key)!);
        continue;
      }

      result.append(key, additionalHeaders.get(key)!);
    }

    return result;
  }



  public get<T>(url: string, doNotEncode?: boolean): Observable<T> {
    const headers = this.getHeaders();
    if (url.indexOf("?") == -1) {
      url += "?ts=" + this.dateService.getToday("timestamp")
    }
    else {
      url += "&ts=" + this.dateService.getToday("timestamp")
    }

    return this.httpClient.get<T>(this.constructURL(url, doNotEncode), { headers: headers }).pipe(
      map(data => {
        return data;
      })
    );
  }

  public post<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.constructURL(url), data)
  }

  public delete<T>(url: string): Observable<T> {


    return this.httpClient.delete<T>(this.constructURL(url));
  }

}
