var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the ReversePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ReversePipe = /** @class */ (function () {
    function ReversePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ReversePipe.prototype.transform = function (values) {
        return values.reverse();
    };
    ReversePipe = __decorate([
        Pipe({
            name: 'reverse',
        })
    ], ReversePipe);
    return ReversePipe;
}());
export { ReversePipe };
//# sourceMappingURL=reverse.js.map