import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  add_Person: FormGroup;


  constructor(private fb: FormBuilder, private addPerson: PersonService) { }

  ngOnInit() {
    this.add_Person = this.fb.group(
      {
        _name: ['', Validators.required],
        _age: ['', Validators.required],
        _gender: ['Male', Validators.required],
        _mno: ['', Validators.required]
      }
    )
  }

  onAdd() {
    // console.log(this.add_Person.value);
    const data: any = {
      'name': this.add_Person.get('_name').value,
      'age': this.add_Person.get('_age').value,
      'gender': this.add_Person.get('_gender').value,
      'mno': this.add_Person.get('_mno').value
    }

    this.addPerson.httpPostPersonData(data).subscribe(
      (next) => {
        console.log(next);
        alert("New Entry Created");
        // this.addPerson.UPload=true;

      },
      (err) => {
        console.log(err);
      },
      () => { }
    )
    this.reset();


  }

  get name() {
    return this.add_Person.get('_name');
  }

  get age() {
    return this.add_Person.get('_age');
  }

  get gender() {
    return this.add_Person.get('_gender');
  }

  get mno() {
    return this.add_Person.get('_mno');
  }

  reset() {
    this.add_Person.reset();
    this.add_Person.get('_gender').patchValue('Male');
  }

}
