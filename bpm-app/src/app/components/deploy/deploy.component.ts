import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { BpmService } from '../../services/bpm.servcice';
import { ProcessDefinition } from '../../models/processdefinition';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit, OnDestroy {

  deployform: FormGroup;
  fileToUpload: File = null;
  mySubscription: any;
  processDefList: ProcessDefinition[] ; 
  constructor(private router: Router, private formBuilder: FormBuilder, private bpmService: BpmService) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
      }

  ngOnInit() {
    this.deployform = this.formBuilder.group({
      file: [null, Validators.required]
    });

   
    this.bpmService.getProcessDefinitions().subscribe((processDefListResul: ProcessDefinition[]) => {
      this.processDefList = processDefListResul;
    }, error => {
      console.log('Error al obtener la definicion de procesos' + error);
      throw (error);
    });
  

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

onSubmit() {
  this.bpmService.deployProcess(this.fileToUpload);
  this.router.navigate(['/home', { outlets: { contenedor: ['deploy'] } }], { skipLocationChange: true });
}

  get f() { return this.deployform.controls; }

}
