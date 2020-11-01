import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { TableListComponent } from './components/table-list/table-list.component';


const routes: Routes = [
  {path : "",
    component : TableListComponent
  },
  {
    path: "addPerson",
    component : AddPersonComponent
  },
  {
    path : "editPerson",
    component : EditModalComponent
  },
  {
    path:"**",
    pathMatch:"full",
    redirectTo : ""
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingcomponents=[TableListComponent,AddPersonComponent,EditModalComponent]
