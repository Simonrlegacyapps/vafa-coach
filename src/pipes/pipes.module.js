var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { SafePipe } from './safe/safe';
import { KeysPipe } from './keys/keys';
import { ReversePipe } from './reverse/reverse';
import { SearchPipe } from './search/search';
import { RoundPipe } from './round/round';
var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        NgModule({
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
    ], PipesModule);
    return PipesModule;
}());
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map