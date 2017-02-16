
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AddTopicComponent} from "./add-topic/add-topic.component";
import {AddConceptComponent} from "./add-concept/add-concept.component";
import {AddProblemComponent} from "./add-problem/add-problem.component";
/**
 * Created by nitish on 7/2/17.
 */


export const router:Routes=[
  {path:'login',component:LoginComponent},
  {path:'home',component:AddTopicComponent},
];

export const routes:ModuleWithProviders=RouterModule.forRoot(router);
