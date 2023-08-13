import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankComponent } from './components/rank/rank.component';

const routes: Routes = [
  {
    path: 'memory',
    loadChildren: () =>
      import('./games/memory/memory.module').then((m) => m.MemoryModule),
  },
  {
    path: 'ticTacToe',
    loadChildren: () =>
      import('./games/tic-tac-toe/tic-tac-toe.module').then(
        (m) => m.TicTacToeModule
      ),
  },
  { path: 'rank', component: RankComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
