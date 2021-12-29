import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  private subscription!: Subscription;
  private timeSub!: Subscription;
  public timeLeft!: Date;
  public isLoggedIn = false;

  constructor (
    private readonly recipeService: RecipeService,
    private readonly authService: AuthService,
    ) {}

  ngOnInit() {
    this.subscription = this.authService.user.subscribe((user: User | null) => {
      this.isLoggedIn = !!user;
    });
  }

  onFetchData() {
    this.recipeService.fetchRecipes().subscribe();
  }

  onSaveData() {
    this.recipeService.saveRecipes();
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.timeSub.unsubscribe();
  }
}
