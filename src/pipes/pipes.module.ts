import { NgModule } from '@angular/core';
import { SafePipe } from './safe/safe';
import { KeysPipe } from './keys/keys';
import { ReversePipe } from './reverse/reverse';
import { RoundPipe } from './round/round';
import { Search } from './search/search';
@NgModule({
    declarations: [SafePipe,
        KeysPipe,
        ReversePipe,
        RoundPipe,
        Search],
    imports: [],
    exports: [SafePipe,
        KeysPipe,
        ReversePipe,
        RoundPipe,
        Search]
})
export class PipesModule { }
