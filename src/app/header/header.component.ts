import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() featureSelected = new EventEmitter<string>()

    onSelect(feature: string, event: Event) {
        event.preventDefault()
        this.featureSelected.emit(feature)
    }
}