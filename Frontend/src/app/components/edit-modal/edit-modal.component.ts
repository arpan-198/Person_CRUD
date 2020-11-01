import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  edit_Person: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private addPerson: PersonService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      // console.log(params);
      this.user = params;
    });
  }

  ngOnInit() {

    this.edit_Person = this.fb.group(
      {
        _name: [this.user.name, Validators.required],
        _age: [this.user.age, Validators.required],
        _gender: [this.user.gender, Validators.required],
        _mno: [this.user.mno, Validators.required]
      }
    )
  }




  onUpdate() {
    // console.log(this.edit_Person.value);
    const data: any = {
      'name': this.edit_Person.get('_name').value,
      'age': this.edit_Person.get('_age').value,
      'gender': this.edit_Person.get('_gender').value,
      'mno': this.edit_Person.get('_mno').value
    }

    this.addPerson.httpPutPersonData(this.user.id, data).subscribe(
      (next) => {
        // console.log(next);
        alert("Updated Successfully");
        this.reset();
        this.route.navigateByUrl("");
      },
      (err) => {
        console.log(err);
      },
      () => { }
    )



  }


  get name() {
    return this.edit_Person.get('_name');
  }

  get age() {
    return this.edit_Person.get('_age');
  }

  get gender() {
    return this.edit_Person.get('_gender');
  }

  get mno() {
    return this.edit_Person.get('_mno');
  }

  reset() {
    this.edit_Person.reset();
    this.edit_Person.get('_gender').patchValue('Male');
  }

}
