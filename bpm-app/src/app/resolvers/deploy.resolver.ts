import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { BpmService } from '../services/bpm.servcice';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProcessDefinition } from '../models/processdefinition';
import { Observable } from 'rxjs';

@Injectable()
export class DeployResolver implements Resolve<any> {
  constructor(private bpmService: BpmService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProcessDefinition[]> {
    return this.bpmService.getProcessDefinitions();
  }
}
