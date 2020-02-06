var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Pipe } from '@angular/core';
var Search = /** @class */ (function () {
    function Search() {
    }
    Search.prototype.transform = function (list, searchTerm) {
        if (searchTerm) {
            searchTerm = searchTerm.toUpperCase();
            return list.filter(function (item) {
                return item.player_name.toUpperCase().indexOf(searchTerm) !== -1;
            });
        }
        else {
            return list;
        }
    };
    Search = __decorate([
        Pipe({
            name: 'search',
            pure: true
        }),
        Injectable()
    ], Search);
    return Search;
}());
export { Search };
//# sourceMappingURL=search.js.map