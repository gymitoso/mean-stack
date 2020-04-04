import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorI18n extends MatPaginatorIntl {
  translate: TranslateService;
  itemsPerPageLabel = 'Itens por página';
  nextPageLabel     = 'Proxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel = function(page, pageSize, length) {
    const of = this.translate ? this.translate.instant('paginator.of') : 'de';

    if (length === 0 || pageSize === 0) {
      return `0 ${of} ${length}`;
    }

    // tslint:disable-next-line:no-parameter-reassignment
    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1}  - ${endIndex} ${of} ${length}`;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
      this.changes.next();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('paginator.items-per-page');
    this.nextPageLabel = this.translate.instant('paginator.next-page');
    this.previousPageLabel = this.translate.instant('paginator.previous-page');
  }
}
