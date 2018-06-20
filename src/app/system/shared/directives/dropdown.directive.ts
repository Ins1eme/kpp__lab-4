import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[hmDropdown]'
})

export class DropdownDirective {

    
    constructor() {}

    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('click', ['$event']) onclick() {
        this.isOpen = !this.isOpen
    }

}