import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import {
  Injectable,
  Injector,
  StaticProvider,
  TemplateRef,
  Type,
} from '@angular/core';

import { MyOverlayRef } from './myoverlay-ref';

import { OverlayComponent } from '@shared/modal/overlay.component';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>,
    data: T
  ): MyOverlayRef<R> {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'is-active'],
      backdropClass: 'modal-background',
      positionStrategy,
    });

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: MyOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
    // const a: StaticProvider[] = [{ provide: MyOverlayRef, useValue: inj }];

    // return new PortalInjector(inj, injectorTokens);

    return Injector.create({
      providers: [{ provide: MyOverlayRef, useValue: ref }],
    });
  }
}
