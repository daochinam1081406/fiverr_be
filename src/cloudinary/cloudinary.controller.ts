import { FactoryProvider } from '@nestjs/common';
import { v2 } from 'cloudinary';

export const CloudinaryController: FactoryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  },
};
