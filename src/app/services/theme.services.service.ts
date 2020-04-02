import { Injectable, RendererFactory2, Inject, Renderer, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  renderer: Renderer2;

  constructor(private renderFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = this.renderFactory.createRenderer(null , null);
   }

  enableDark() {
    console.log("enabling dark");
    
    this.renderer.addClass(this.document.body, 'dark-theme');
  }
  enableLight() {
    console.log("enabling light");
    this.renderer.removeClass(this.document.body, 'dark-theme');

  }
 
}
