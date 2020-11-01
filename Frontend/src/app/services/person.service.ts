import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {IPerson} from '../model/person.model'

@Injectable()
export class PersonService{
    private _get_persondataURL="http://localhost:7001/person";
    private _insert_persondataURL="http://localhost:7001/person";
    private _update_persondataURL="http://localhost:7001/person";
    private _delete_persondataURL="http://localhost:7001/person";

    private share : boolean = false;
    constructor(private http : HttpClient){}

    private errorhandle(errorResponse : HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
            alert("Client Side Error"+errorResponse.error.message);
            
        }
        else{
            alert(errorResponse.error.message);
            
        }
        return throwError('There is a Problem with Service');
    }


    httpGetPersonData() :Observable<any>{
        return this.http.get(this._get_persondataURL)
        .pipe(catchError(this.errorhandle));
    }

    httpPostPersonData(Data : IPerson) :Observable<any>{
        return this.http.post(this._insert_persondataURL, Data)
        .pipe(catchError(this.errorhandle));
    }

    httpDeletePersonData(id : string) :Observable<any>{
        return this.http.delete(`${this._delete_persondataURL}/${id}`)
        .pipe(catchError(this.errorhandle));
    }

    httpPutPersonData(id : string,Data : IPerson) :Observable<any>{
        return this.http.put(`${this._update_persondataURL}/${id}`,Data)
        .pipe(catchError(this.errorhandle));
    }
}
