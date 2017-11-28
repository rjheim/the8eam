import { TestBed, inject } from '@angular/core/testing';

import { FilterVarsService } from './filter-vars.service';

describe('FilterVarsService', () => {
  let service: FilterVarsService;
  beforeEach(() => {
     service = new FilterVarsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let cost: number;
  let date: number;

  it('should set music to false if first true (and vice versa)', () => {
    service.setMusic();
    expect(service.gMusic).toBeTruthy();
  });
  it('should set art to false if first true (and vice versa)', () => {
    service.setArt();
    expect(service.gArt).toBeTruthy();
  });
  it('should set food to false if first true (and vice versa)', () => {
    service.setFood();
    expect(service.gFood).toBeTruthy();
  });
  it('should set SW to false if first true (and vice versa)', () => {
    service.setSW();
    expect(service.gSW).toBeTruthy();
  });
  it('should set dance to false if first true (and vice versa)', () => {
    service.setDance();
    expect(service.gDance).toBeTruthy();
  });
  it('Should set cost', () => {
    cost = 10;
    service.setCost(cost);
    expect(service.cost).toBe(10);
  });
  it('Should set cost to negative one to uncheck (set/clicked twice)', () => {
    service.setCost(cost);
    service.setCost(cost);
    expect(service.cost).toBe(-1);
  });
  it('Should set cost', () => {
    date = 20171127;
    service.setDate(date);
    expect(service.date).toBe(20171127);
  });
  it('Should set cost to negative one to uncheck (set/clicked twice)', () => {
    service.setDate(date);
    service.setDate(date);
    expect(service.date).toBe(-1);
  });
});
