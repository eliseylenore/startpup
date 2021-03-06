import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Need } from '../need.model';
import { Contact } from '../contact.model';
import { SocialMedia } from '../social-media.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [UserService, ProjectService]
})
export class ProjectDetailComponent implements OnInit {
  public projectId: string;
  public projectToDisplay: any;
  public user;
  public projectNeeds: any[] = []
  public userIsOwner = false;
  public startEditing = false;
  public showAddNeed = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.projectId = urlParameters['id'];
    });
    this.projectToDisplay = this.projectService.getProjectById(this.projectId).subscribe(dataLastEmittedFromObserver => {

      this.user = this.userService.getUserById(dataLastEmittedFromObserver.owner).subscribe((dataLastEmittedFromObserver) => {
        setTimeout(() => {
          this.user = dataLastEmittedFromObserver;
          this.user.uid = dataLastEmittedFromObserver.owner;
          this.userIsOwner = this.projectService.authenticateProject(this.projectId);
        }, 1);

      });
      console.log(dataLastEmittedFromObserver.owner);
      setTimeout(() => {
        this.projectToDisplay = new Project(
          dataLastEmittedFromObserver.owner,
          dataLastEmittedFromObserver.needs,
          dataLastEmittedFromObserver.title,
          dataLastEmittedFromObserver.image,
          dataLastEmittedFromObserver.description,
          dataLastEmittedFromObserver.socialMedia,
          dataLastEmittedFromObserver.contactInformation,
          dataLastEmittedFromObserver.website
        )
      }, 1);
    });
  }

  deleteProject(projectToDelete){
    if (confirm ("Are you sure you want to delete this project?")){
      this.projectService.deleteProject(projectToDelete);
      this.router.navigate([""]);
    }
  }

  editClickSender() {
    this.startEditing = true;
  }

  needClickSender() {
    this.showAddNeed = true;
  }
}
