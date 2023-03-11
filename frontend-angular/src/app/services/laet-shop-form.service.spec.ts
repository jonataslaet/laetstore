import { TestBed } from '@angular/core/testing';

import { LaetShopFormService } from './laet-shop-form.service';

describe('LaetShopFormService', () => {
  let service: LaetShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaetShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
