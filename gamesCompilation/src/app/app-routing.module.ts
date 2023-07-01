import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'memory', loadChildren: () => import('./games/memory/memory.module').then(m => m.MemoryModule) }, { path: 'ticTacToe', loadChildren: () => import('./games/tic-tac-toe/tic-tac-toe.module').then(m => m.TicTacToeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
