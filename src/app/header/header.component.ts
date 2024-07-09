import { Component } from "@angular/core";
import { DataStorageService } from "../data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    // @Output() featureSelected = new EventEmitter<string>()

    // onSelect(feature: string, event: Event) {
    //     event.preventDefault()
    //     this.featureSelected.emit(feature)
    // }
    isAuthenticated: boolean = false
    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {
        authService.user.subscribe(user => {
            if (user?.token) this.isAuthenticated = true
            else this.isAuthenticated = false;

            console.log({ user })
        })
    }
    onSaveData() {
        this.dataStorageService.storeRecipes()
    }
    onFetchData() {
        this.dataStorageService.getRecipes().subscribe()
    }

    onLogout() {
        this.authService.logout()
        this.router.navigate(['/auth'])
    }
}