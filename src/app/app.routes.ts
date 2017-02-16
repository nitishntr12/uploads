
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AddTopicComponent} from "./add-topic/add-topic.component";
import {AddConceptComponent} from "./add-concept/add-concept.component";
import {AddProblemComponent} from "./add-problem/add-problem.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {TopicsComponent} from "./topics/topics.component";
import {ChaptersComponent} from "./chapters/chapters.component";
/**
 * Created by nitish on 7/2/17.
 */


export const router:Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',pathMatch:'full',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'topic',component:AddTopicComponent},
  {path:'concept',component:AddConceptComponent},
  {path:'problem',component:AddProblemComponent},
  {path:'topics',component:TopicsComponent},
  {path:'chapters',component:ChaptersComponent}
];

export const routes:ModuleWithProviders=RouterModule.forRoot(router);
