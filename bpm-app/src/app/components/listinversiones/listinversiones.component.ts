import { Component, OnInit } from '@angular/core';
import { BpmService } from '../../services/bpm.servcice';
import { ProcessInstance } from '../../models/processinstance';
import { ProcessMeta } from '../../models/processmeta';
import { Task } from '../../models/task';
import { User } from '../../models/user';

@Component({
  selector: 'app-listinversiones',
  templateUrl: './listinversiones.component.html',
  styleUrls: ['./listinversiones.component.css']
})
export class ListinversionesComponent implements OnInit {

  processInstancesList: ProcessInstance[];
  taskList: Task [];

  processMeta: ProcessMeta;
  constructor(private bpmService: BpmService) { }

  ngOnInit() {

    this.bpmService.getProcessInstances().subscribe((processInstancesList: ProcessInstance[]) => {
      this.processInstancesList = processInstancesList;
    }, error => {
      console.log('Error al obtener las instacias de procesos' + error);
      throw error;
    });
    const user: User = JSON.parse(localStorage.getItem('currentuser'));
    this.bpmService.getMyTask(user.username).subscribe((taskList: Task[]) => {
      this.taskList = taskList;
    }, error => {
      console.log('Error al obtener las tareas del usuario' + error);
      throw error;
    });
  }

  invDetail(pi: ProcessInstance){
    this.bpmService.getProcessMeta(pi.id).subscribe((processMeta: ProcessMeta) => {
      this.processMeta = processMeta;
    }, error => {
      console.log('Error al obtener el detalle del procesos' + error);
      throw error;
    });
  }

}
