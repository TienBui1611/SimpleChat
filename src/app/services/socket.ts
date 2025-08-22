import { Injectable } from '@angular/core';
import { io, Socket as SocketIOClient } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient;

  constructor() {
    // Connect to the server running on localhost:3000
    this.socket = io('http://localhost:3000');
  }

  // Send a message to the server
  sendMessage(message: any): void {
    this.socket.emit('message', message);
  }

  // Listen for messages from the server
  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
      
      // Clean up the listener when the observable is unsubscribed
      return () => {
        this.socket.off('message');
      };
    });
  }

  // Send join notification
  joinChat(username: string): void {
    this.socket.emit('join', username);
  }

  // Listen for user joined notifications
  getUserJoined(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('userJoined', (data: string) => {
        observer.next(data);
      });
      
      return () => {
        this.socket.off('userJoined');
      };
    });
  }

  // Disconnect from the socket
  disconnect(): void {
    this.socket.disconnect();
  }
}
