import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
  ORDERS_MS_HOST: string;
  ORDERS_MS_PORT: number;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: EnvVars = value;

export const envs = {
  PORT: config.PORT,
  PRODUCTS_MS_HOST: config.PRODUCTS_MS_HOST,
  PRODUCTS_MS_PORT: config.PRODUCTS_MS_PORT,
  ORDERS_MS_HOST: config.ORDERS_MS_HOST,
  ORDERS_MS_PORT: config.ORDERS_MS_PORT,
};
