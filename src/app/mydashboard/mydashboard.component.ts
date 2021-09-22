import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employer } from './employer.model';
@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent implements OnInit {
  onAdd !: boolean;
  onUpdate !: boolean;

  employerData!: any
  employerModelObject: Employer = new Employer();
  formValue!: FormGroup;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group(
      {
        prenom: [''],
        nom: [''],
        email: [''],
        adresse: [''],
        tel: [''],

      },

    ),
      this.getAllEmployer();
  }
  clickAdd() {
    this.formValue.reset();
    this.onAdd = true;
    this.onUpdate = false;

  }
  addEmployers() {
    this.employerModelObject.prenom = this.formValue.value.prenom;
    this.employerModelObject.nom = this.formValue.value.nom;
    this.employerModelObject.email = this.formValue.value.email;
    this.employerModelObject.adresse = this.formValue.value.adresse;
    this.employerModelObject.tel = this.formValue.value.tel;

    this.api.addEmployer(this.employerModelObject)
      .subscribe(res => {
        console.log(res)
        alert("L'ajout employer reussit")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployer();
      },
        err => {
          alert("Erreur d'ajout")
        })

  }
  getAllEmployer() {
    this.api.getEmployer().subscribe(res => {
      this.employerData = res
    })
  }
  delEmployer(row: any) {
    this.api.deleteEmployer(row.id).subscribe(
      res => {
        alert("L'employer a été suprimé avec succé");
        this.getAllEmployer();

      })
  }

  onEdit(row: any) {
    this.onAdd = false;
    this.onUpdate = true;
    this.employerModelObject.id = row.id
    this.formValue.controls["prenom"].setValue(row.prenom)
    this.formValue.controls["nom"].setValue(row.nom)
    this.formValue.controls["email"].setValue(row.email)
    this.formValue.controls["adresse"].setValue(row.adresse)
    this.formValue.controls["tel"].setValue(row.tel)

  }
  updateEmployers() {
    this.employerModelObject.prenom = this.formValue.value.prenom;
    this.employerModelObject.nom = this.formValue.value.nom;
    this.employerModelObject.email = this.formValue.value.email;
    this.employerModelObject.adresse = this.formValue.value.adresse;
    this.employerModelObject.tel = this.formValue.value.tel;


    this.api.updateEmployer(this.employerModelObject, this.employerModelObject.id).subscribe(
      res => {
        alert("Modification reussit")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployer();
      }
    )

  }
}
