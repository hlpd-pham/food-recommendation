import { IsString } from 'class-validator';

class GlobalApiConfig {
  @IsString()
  DB_URL: string;

  @IsString()
  NODE_ENV: string;

  constructor(config) {
    // Validate configs
    Object.assign(this, config);
  }
}

const RunConfig = {
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
};

const TestConfig = {};

export const ApiConfig = new GlobalApiConfig(
  process.env.NODE_ENV === 'e2eTest' ? TestConfig : RunConfig,
);
