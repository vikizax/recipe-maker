import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false
    userSubscription: Subscription
    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe(user => {
            if (user?.token) this.isAuthenticated = true
            else this.isAuthenticated = false;
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
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe()
    }

}