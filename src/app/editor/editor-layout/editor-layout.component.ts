import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '../../general/service/pending-changes.guard';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss']
})
export class EditorLayoutComponent implements OnInit, ComponentCanDeactivate {

  id?: string | null;
  dirty = false;

  constructor(protected activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log('EditorLayoutComponent.activatedRoute');
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log("EditorLayoutComponent.ngOnInit emit resize event");
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // console.log('EditorSideComponent.canDeactivate');
    return !this.dirty;
  }

}
