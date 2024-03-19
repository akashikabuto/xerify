import * as https from 'https';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'https';
import * as fs from 'fs';
import * as path from 'path';

export class HttpsIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const certPath = path.resolve(__dirname, '..', 'server.cert');
    const keyPath = path.resolve(__dirname, '..', 'server.key');
    const serverOptions: ServerOptions = {
      key: fs.readFileSync(path.resolve(keyPath)),
      cert: fs.readFileSync(path.resolve(certPath)),
    };

    const server = https.createServer(serverOptions);
    const io = super.createIOServer(port, { ...options, server });

    return io;
  }
}
