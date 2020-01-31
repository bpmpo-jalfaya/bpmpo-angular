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
      error => console.log('oops', error)
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



 

  // errorHandl(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }

}
