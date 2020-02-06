import { NgModule } from '@angular/core';
import { SafePipe } from './safe/safe';
import { KeysPipe } from './keys/keys';
import { ReversePipe } from './reverse/reverse';
import { SearchPipe } from './search/search';
import { RoundPipe } from './round/round';
@NgModule({
	declarations: [SafePipe,
    KeysPipe,
    ReversePipe,
    SearchPipe,
    RoundPipe],
	imports: [],
	exports: [SafePipe,
    KeysPipe,
    ReversePipe,
    SearchPipe,
    RoundPipe]
})
export class PipesModule {}
