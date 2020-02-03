import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BpmService } from '../../services/bpm.servcice';
import { ProcessDefinition } from '../../models/processdefinition';
import { Observable } from 'rxjs';
import { DeployResolver } from '../../resolvers/deploy.resolver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit, OnDestroy {

  deployform: FormGroup;
  fileToUpload: File = null;
  mySubscription: any;
  processDefList: ProcessDefinition[];
  data: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private bpmService: BpmService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    //Refresco de router
    this.router.routeReuseStrategy.shouldReuseRoute = (() => {
      return false;
    });

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

   
  }

  ngOnInit() {
    this.deployform = this.formBuilder.group({
      file: [null, Validators.required]
    });

    this.route.data.subscribe((data: { listprocesses: any }) => {
      this.processDefList = data.listprocesses;
      //console.log(data.listprocesses)
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

    window.location.href = 'home/(contenedor:deploy)';
   /* this.toastr.success('Inversiones BPM',
      'Proceso desplegado',
      {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      });*/

  }

  get f() { return this.deployform.controls; }

}
