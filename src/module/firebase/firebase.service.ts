import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    const credential = {
      type: process.env.FB_TYPE,
      project_id: process.env.FB_PROJECT_ID,
      private_key_id: process.env.FB_PRIVATE_KEY_ID,
      private_key: process.env.FB_PRIVATE_KEY,
      client_email: process.env.FB_CLIENT_EMAIL,
      client_id: process.env.FB_CLIENT_ID,
      auth_uri: process.env.FB_AUTH_URI,
      token_uri: process.env.FB_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FB_UNIVERSE_DOMAIN,
    } as admin.ServiceAccount;

    admin.initializeApp({
      credential: admin.credential.cert(credential),
      storageBucket: `dietprm-3c63c.appspot.com`,
    });
    this.storage = admin.storage();
  }

  getFirestoreInstance(): admin.storage.Storage {
    return this.storage;
  }
}
