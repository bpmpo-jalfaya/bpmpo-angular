import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Route } from '@angular/router';
import { InversionTask } from '../../models/inversiontask';
import { BpmService } from '../../services/bpm.servcice';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-inversiontask',
  templateUrl: './inversiontask.component.html',
  styleUrls: ['./inversiontask.component.css']
})
export class InversiontaskComponent implements OnInit, OnDestroy {

  inversionTask: InversionTask;
  taskId: string;
  inversionTaskForm: FormGroup;
  navigationSubscription;

  constructor(private router: Router,
              private activatedroute: ActivatedRoute,
              private bpmService: BpmService,
              private formBuilder: FormBuilder) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        //this.initialiseInvites();
      }
    });
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.taskId = params.get('taskId');
    });
    this.inversionTaskForm = this.formBuilder.group({
      inversion: this.formBuilder.group({
        cantidad: ['', Validators.required],
        objeto: ['', Validators.required],
        lugar: ['', Validators.required],
        clasificacion: [''],
        taskId: [''],
        taskName: [''],
        aprobada: ['true']
      })
    });

    const user: User = JSON.parse(localStorage.getItem('currentuser'));

    this.bpmService.getInversionTask(this.taskId, user.username).subscribe((inversonTaskObtenida: InversionTask) => {
      this.inversionTask = inversonTaskObtenida;
      this.inversionTaskForm.patchValue(this.inversionTask);
    }, error => {
      console.log('Error al obtener inversion task' + error);
      throw error;
    });





  }


  endInversionTask() {
    const user: User = JSON.parse(localStorage.getItem('currentuser'));
    const result: InversionTask = Object.assign({}, this.inversionTaskForm.value);
    console.log(result);
    result.taskId = this.inversionTask.taskId;
    result.taskName = this.inversionTask.taskName;
    result.userName = user.username;
    //result.inversion.aprobada = (this.f.aprobada.value);
    this.bpmService.endInversionTask(result).subscribe(inversionTask => {
      this.inversionTask = inversionTask;
      this.router.navigate(['/home', { outlets: { contenedor: ['list-inversiones'] } }],
      { skipLocationChange: true });
    }, error => {
      console.log('Error al finalizar a tarea' + error);
      alert('Se ha producido un error al finalizar la tarea');
      throw error;
    });

   



  }


  get f() { return this.inversionTaskForm.controls; }

}
