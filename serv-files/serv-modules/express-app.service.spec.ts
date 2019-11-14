import { Test, TestingModule } from '@nestjs/testing';
import { ExpressAppService } from './express-app.service';

describe('ExpressAppService', () => {
  let service: ExpressAppService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpressAppService],
    }).compile();
    service = module.get<ExpressAppService>(ExpressAppService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
