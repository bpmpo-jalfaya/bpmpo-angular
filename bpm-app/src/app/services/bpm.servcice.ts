import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ServicesConfiguration } from '../utils/servicesconfiguration';
import { Observable } from 'rxjs';
import { ProcessDefinition } from '../models/processdefinition';
import { ProcessInstance } from '../models/processinstance';
import { Inversion } from '../models/inversion';
import { error } from '@angular/compiler/src/util';
import { ProcessMeta } from '../models/processmeta';
import { Task } from '../models/task';
import { InversionTask } from '../models/inversiontask';

@Injectable({
  providedIn: 'root'
})
export class BpmService {

  constructor(private httpClient: HttpClient, private configuration: ServicesConfiguration) { }
  /**
   * Despliegue un procesos en activiti
   * @param file  Fichero con la definición del proceso
   */
  public deployProcess(file: File) {

    const data = new FormData();
    data.append('file', file);

    return this.httpClient.post<any>(this.configuration.deployProcess, data, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      data => console.log('success', data),
      error => console.log('Error al desplegar el proceso', error)
    );
  }

  public createProcess(inversion: Inversion): Observable<ProcessInstance> {
    this.httpClient.post<any>(this.configuration.createProcess, inversion, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      data => console.log('success', data),
      error => console.log('Error al crear inversiones', error)
    );
    return this.httpClient.post<any>(this.configuration.createProcess,
      inversion);
  }



  /**
   * Obtiene las deficiciones de procesos
   */
  public getProcessDefinitions(): Observable<ProcessDefinition[]> {
    return this.httpClient.get<ProcessDefinition[]>(this.configuration.getProcessDefinitions);
  }

  /**
   * Obtiene las instancias de procesos del sistema
   */

  /**
   * Obtiene las deficiciones de procesos
   */
  public getProcessInstances(): Observable<ProcessInstance[]> {
    return this.httpClient.get<ProcessInstance[]>(this.configuration.getProcessInstances);
  }

  /**
   * Obtiene el detalle del proceso
   */
  public getProcessMeta(idProcessInstance: string): Observable<ProcessMeta> {
    return this.httpClient.get<ProcessMeta>(this.configuration.processMeta + '/' + idProcessInstance);
  }

  /**
   * Obtiene la lista de tareas pendientes pas un usurio
   */

   public getMyTask(username: string): Observable<Task[]>{
    return this.httpClient.get<Task[]>(this.configuration.myTasks + '/' + username);
   }

   /**
    * Obtiene un objeto de tipo inversionTask
    */

    public getInversionTask(taskId: string, userName: string): Observable<InversionTask>{
      return this.httpClient.get<InversionTask>(this.configuration.inversionTask + '/' + taskId + '/' + userName);
    }

    // public endInversionTask(inversionTask: InversionTask): Observable<InversionTask>{
    //   this.httpClient.post<any>(this.configuration.createProcess, inversionTask, {
    //     reportProgress: true,
    //     observe: 'events'
    //   }).subscribe(
    //     data => console.log('success', data),
    //     error => console.log('Error al crear inversiones', error)
    //   );
      
    //   return data;
    // }


   

    endInversionTask(inversionTask: InversionTask): Observable<InversionTask> {
      return this.httpClient.post<InversionTask>(this.configuration.endInversionTask, inversionTask)
        .pipe(
          catchError(this.handleError)
        );
    }


    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }


}
