import { Injectable } from '@angular/core';
import {HttpClient , HttpClientModule} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postContact(data:any){
    return this.http.post<any>("https://contact-book-8df6f-default-rtdb.firebaseio.com/fieldforce.json",data)
    .pipe(map((res:any)=>{
      return res;
    }))
    
  }
   getContact(){
    return this.http.get<any>("https://contact-book-8df6f-default-rtdb.firebaseio.com/fieldforce.json")
    .pipe(map((res:any)=>{
      return res;
    }))
    
  }
  updateContact(data:any ,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
    
  }
  deleteContact(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
    
  }
}
