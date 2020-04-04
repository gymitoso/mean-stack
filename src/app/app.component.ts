import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LoadService } from './shared';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();

  loading = false;

  constructor(
    private loadService: LoadService,
    private translate: TranslateService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd && event.snapshot.children.length === 0) )
      .subscribe((event: ActivationEnd) => {
        const lang: string = this.route.snapshot.queryParamMap.get('lang');
        if (lang === 'pt' || lang === 'en') {
          this.translate.use(lang);
        }
      });

    this.loadService.isLoading$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((isLoading) => {
        this.loading = isLoading;
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
