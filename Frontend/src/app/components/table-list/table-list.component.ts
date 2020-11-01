import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IPerson } from 'src/app/model/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  personData$: any;
  isEmpty:boolean;
  finalData: IPerson[] = [];

  constructor(private personservice: PersonService, private route: Router) { 
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.personservice.httpGetPersonData().subscribe(
      (next) => {
        this.isEmpty=false;
        this.personData$ = next;
      },
      (err) => {
        console.log(err);
        this.isEmpty=true;

      },
      () => {
        // console.log(this.personData$);
        this.finalData = [];
        this.personData$.data.filter(element => {
          this.finalData.push({
            "name": element.name,
            "age": element.age,
            "gender": element.gender,
            "mno": element.mno,
            "id": element._id
          });

        });
        // console.log(this.finalData);


      }

    )
  }


  editing(id: any) {
    // console.log(id);
    let navExt: NavigationExtras = {
      queryParams: id
    };
    this.route.navigate(["editPerson"], navExt);

  }

  deleting(id) {
    if (confirm("Are you sure to delete ")) {
      // console.log("yes");
      this.personservice.httpDeletePersonData(id).subscribe(
        (next) => { },
        (err) => {
          console.log(err);
        },
        () => {
          alert("Person Deleted");
          this.loadData();
        }
      )

    }
    else {
      // console.log("no");

    }

  }

}
