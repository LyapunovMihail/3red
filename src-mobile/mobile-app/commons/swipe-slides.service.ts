import { PlatformDetectService } from './../platform-detect.service';
import { Input,
     ChangeDetectorRef,
     ElementRef,
     OnChanges,
     SimpleChanges,
     Output,
     EventEmitter,
     Injectable
} from '@angular/core';

declare let window: any;

@Injectable()

export class SwipeSlides {
     public counter = 0;
     public left: any = 0;

     constructor (
         private ref: ChangeDetectorRef,
         private elRef: ElementRef,
         public platform: PlatformDetectService
     ) { }

     public startPosition ( val, elem, size, px ) {
         this.counter = val;
         elem.style.left = - (size * val) + px;
         this.ref.detectChanges();
     }
     /*
          sliderListParent - Контейнер слайдера (id)
          sliderList - Сам слайдер (id)
          slideWidth - Ширина одного слайда
          units - Единица измерения
     */
     public sliderInit ( sliderListParent, sliderList, egLeft, egRight, slideWidth, units ) {
          let blockSlider = sliderListParent;
          let sliderInner = sliderList;
          let that = this;
          let edgeLeft = egLeft;
          let edgeRight = egRight;

          blockSlider.ontouchstart = (e) => {

               let sliderItems = sliderInner.children;
               let startPoint = e.touches[0].pageX;
               let sliderInnerCoords = getCoords(sliderInner);
               let shiftX = e.touches[0].pageX - sliderInnerCoords.left;
               let blockSliderCoords = getCoords(blockSlider);

               window.addEventListener('touchmove', touchMoveEvent );
               window.addEventListener('touchend', touchEndEvent);

               function touchMoveEvent(e) {
                    let newLeft = e.touches[0].pageX - shiftX - blockSliderCoords.left;
                    if (newLeft > 0) {
                         newLeft = 0;
                         edgeLeft = 70;
                         setTimeout(() => {
                              edgeLeft = 0;
                         }, 300);
                    }
                    let rightEdge = blockSlider.offsetWidth - sliderInner.offsetWidth;
                    if (newLeft < rightEdge) {
                         newLeft = rightEdge;
                         edgeRight = 70;
                         setTimeout(() => {
                              edgeRight = 0;
                         }, 300);
                    }
                    sliderInner.style.left = newLeft + 'px';
               }

               function touchEndEvent(e) {

                    window.removeEventListener('touchmove', touchMoveEvent);
                    window.removeEventListener('touchend', touchEndEvent);

                    sliderInner.ontouchmove = sliderInner.ontouchend = null;
                    let slideRange = (startPoint - e.changedTouches[0].pageX);
                    let direction = (slideRange >= 0) ? 'LEFT' : 'RIGHT';
                    let timeValue = 300;
                    sliderInner.style.transition = timeValue + 'ms linear';

                    Array.prototype.forEach.call(sliderItems, (item, i) => {
                         if (item.getBoundingClientRect().left >= blockSlider.getBoundingClientRect().left
                              && item.getBoundingClientRect().left < blockSlider.getBoundingClientRect().left + blockSlider.offsetWidth) {
                              if ( direction === 'LEFT'
                                   && item.getBoundingClientRect().left >= blockSlider.offsetWidth / 1.2
                                   || direction === 'RIGHT'
                                   && item.getBoundingClientRect().left > blockSlider.getBoundingClientRect().left + blockSlider.offsetWidth - blockSlider.offsetWidth / 2
                              ) {
                                   that.startPosition( i - 1, sliderInner, slideWidth, units );
                              } else {
                                   that.startPosition( i, sliderInner, slideWidth, units );
                              }
                              setTimeout(() => {
                                   sliderInner.style.transition = '0s';
                              }, timeValue);
                         }
                    });
               }
               return false;

               function getCoords(elem) {
                   let box = elem.getBoundingClientRect();
                   return {
                       top: box.top + pageYOffset,
                       left: box.left + pageXOffset
                   };
               }
          };

          sliderInner.ondragstart = () => {
              return false;
          };
     }
}
