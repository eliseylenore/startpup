import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Project } from './project.model';
import { NeedComponent } from './need/need.component';
import { Need } from './need.model';


@Injectable()
export class ProjectService {
  projects: FirebaseListObservable<any[]>;
  addingNeed = [];

  constructor(private angularFire: AngularFire) {
    this.projects = angularFire.database.list('projects');
  }

  getProjects(){
    return this.projects;
  }

  getProjectById(projectId: string){
    return this.angularFire.database.object('projects/'+ projectId);
  }

  needCheck(){
    console.log(this.getProjectById[0].needs);
  }


  addNewProject(newProject: Project){
    this.projects.push(newProject);
  }

  // getNeeds(){
  //   return this.getProjectById.needs;
  // }

  addNewNeed(currentProject, newNeeds: Need[]){
    var projectEntryInFirebase = this.getProjectById(currentProject.$key);
    projectEntryInFirebase.update({
      needs: newNeeds
    })
  // this.projects.subscribe(projects => {
  //     this.addingNeed.push(newNeed);
  //   });
  //   console.log(this.addingNeed);
  //    this.addingNeed;
  // }
}
}