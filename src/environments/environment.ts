import 'zone.js/plugins/zone-error';
import { environment as def } from '~environments/environment.default';

export const environment: any = {
  ...def,
  apiUrl: "http://192.168.1.3:8080"
};