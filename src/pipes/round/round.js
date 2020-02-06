var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the RoundPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var RoundPipe = /** @class */ (function () {
    function RoundPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    RoundPipe.prototype.transform = function (value) {
        return Math.round(value);
    };
    RoundPipe = __decorate([
        Pipe({
            name: 'round',
        })
    ], RoundPipe);
    return RoundPipe;
}());
export { RoundPipe };
//# sourceMappingURL=round.js.map