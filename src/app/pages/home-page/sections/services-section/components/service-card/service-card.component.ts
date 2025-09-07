import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AdditionalButtonComponent } from '../additional-button/additional-button.component';
import { ServiceCard } from '../../../../../../shared/models/service-card.model';
import { ScreenService } from '../../../../../../services/screen.service';
import { combineLatest, map } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-service-card',
  imports: [
    AdditionalButtonComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  cardsContent: ServiceCard[] = [
    {
      iconPath: "/assets/icons/forklift.svg",
      cardHeader: "Складские комплексы",
      cardText: `Независимая инвентаризация для складов всех видов и классификаций,
      с различным уровнем автоматизации складских процессов, многообразием номенклатурных
      позиций и единиц измерения, а также смежные услуги, связанные с содействием в
      проведении внутренних инвентаризаций и решением сопутствующих им задач.`,
      cardType: "sklad"
    },
    {
      iconPath: "/assets/icons/cart_shopping.svg",
      cardHeader: "Розничные магазины",
      cardText: `Независимая инвентаризация для розничных сетей в независимости от специализации,
      формата, масштабирования, используемой маркировки, а также смежные услуги, связанные
      с содействием в проведении внутренних инвентаризаций и решением сопутствующих им задач.`,
      cardType: "shops"
    },
    {
      iconPath: "/assets/icons/constructor.svg",
      cardHeader: "Прочие объекты",
      cardText: `Независимая инвентаризация для предприятий из добывающей, строительной,
      производственной, сельскохозяйственной и прочих отраслей с учетом их специфики,
      уровня автоматизации, многообразия номенклатурных позиций и единиц измерения,
      а также смежные услуги, связанные с содействием в проведении внутренних инвентаризаций
      и решением сопутствующих им задач.`,
      cardType: "other"
    },
    {
      iconPath: "/assets/icons/pc.svg",
      cardHeader: "Офисы",
      cardText: `Независимая инвентаризация для офисных помещений различного класса,
      с возможностью выбора разнообразных дополнительных услуг способствующих налаживанию процессов приемки,
      размещения, учета, сохранности, перемещения имущества, а также их автоматизации.`,
      cardType: "office"
    },
  ]

  private screenService = inject(ScreenService);

  isMobile$ = this.screenService.isMobile$;
  isNotMobile$ = this.screenService.isTablet$;

  readonly showIsland$ = combineLatest([
    this.screenService.isMobile$,
    this.screenService.isTablet$
  ]).pipe(
    map(([isMobile, isTablet]) => !(isMobile || isTablet))
  );
}
