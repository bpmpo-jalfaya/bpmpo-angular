import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BpmService } from '../../services/bpm.servcice';
import { ProcessInstance } from '../../models/processinstance';
import { Inversion } from '../../models/inversion';

@Component({
  selector: 'app-startproc',
  templateUrl: './startproc.component.html',
  styleUrls: ['./startproc.component.css']
})
export class StartprocComponent implements OnInit {

  inversionForm: FormGroup;
  inversion: Inversion;
  constructor(private router: Router, private formBuilder: FormBuilder,private bpmService: BpmService) { }

  // convenience getter for easy access to form fields
  get f() { return this.inversionForm.controls; }
  
  ngOnInit() {

    this.inversionForm = this.formBuilder.group({
      objeto: ['', Validators.required],
      lugar: ['', Validators.required],
      cantidad: [null, [Validators.required]]
    });


   
  }


  createInversion(){

    if (this.inversionForm.invalid) {
      return;
    }

    this.inversion = {
      objeto: this.f.objeto.value,
      lugar: this.f.lugar.value, 
      cantidad: this.f.cantidad.value
    };

    this.bpmService.createProcess(this.inversion);
    alert('Inversión creada');
    this.router.navigate(['/home', { outlets: { contenedor: ['list-inversiones'] } }], { skipLocationChange: true });
  }

}
