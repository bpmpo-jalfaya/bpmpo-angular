import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class ServicesConfiguration {
    public Server = environment.apiUrl;
    public ApiContext = '/bpm';

     // End points api
     public BpmBaseEndPoint = this.Server + this.ApiContext;
     //Despliegue de proceso
     public deployProcess = this.BpmBaseEndPoint + '/deploy-process';
     //lista de procesos desplegados
     public getProcessDefinitions = this.BpmBaseEndPoint + '/get-process-definitions';

      //lista de instacias de procesos
      public getProcessInstances = this.BpmBaseEndPoint + '/process-instances';

      //Crear proceso
      public createProcess = this.BpmBaseEndPoint + '/start-process';

      //ProcessMeta detalle de un proceso
      public processMeta = this.BpmBaseEndPoint + '/process-detail';

      //Lista de tareas de un usuario
      public myTasks = this.BpmBaseEndPoint + '/get-mytask';
}