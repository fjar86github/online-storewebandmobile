import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesStatisticPage } from './sales-statistic.page';

describe('SalesStatisticPage', () => {
  let component: SalesStatisticPage;
  let fixture: ComponentFixture<SalesStatisticPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesStatisticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
