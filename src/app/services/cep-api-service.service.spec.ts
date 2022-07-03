import { TestBed } from '@angular/core/testing';

import { CepApiServiceService } from './cep-api-service.service';

describe('CepApiServiceService', () => {
  let service: CepApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
