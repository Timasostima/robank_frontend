const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../src/app/core/environments/environment.ts');
const templatePath = path.resolve(__dirname, '../src/app/core/environments/environment.template.ts');

const template = fs.readFileSync(templatePath, 'utf8');

const envConfigFile = template
  .replace('${API_URL}', process.env.API_URL || 'http://localhost:8080/api')
  .replace('${FIREBASE_API_KEY}', process.env.FIREBASE_API_KEY || '')
  .replace('${FIREBASE_AUTH_DOMAIN}', process.env.FIREBASE_AUTH_DOMAIN || '')
  .replace('${FIREBASE_PROJECT_ID}', process.env.FIREBASE_PROJECT_ID || '')
  .replace('${FIREBASE_APP_ID}', process.env.FIREBASE_APP_ID || '')
  .replace('${FIREBASE_DATABASE_URL}', process.env.FIREBASE_DATABASE_URL || '')
  .replace('${FIREBASE_STORAGE_BUCKET}', process.env.FIREBASE_STORAGE_BUCKET || '')
  .replace('${FIREBASE_MESSAGING_SENDER_ID}', process.env.FIREBASE_MESSAGING_SENDER_ID || '')
  .replace('${FIREBASE_MEASUREMENT_ID}', process.env.FIREBASE_MEASUREMENT_ID || '');

const dirName = path.dirname(targetPath);
if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName, { recursive: true });
}

fs.writeFileSync(targetPath, envConfigFile);

console.log(`Environment file generated at ${targetPath}`);
