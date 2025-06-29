import { environment as def } from '~environments/environment.default';

export const environment = {
  ...def,
  production: true,
  apiUrl: "http://192.168.1.3:8080"
};
