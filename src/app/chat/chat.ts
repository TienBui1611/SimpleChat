import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket';
import { Subscription } from 'rxjs';

interface ChatMessage {
  username: string;
  text: string;
  /* timestamp: Date; */
  isOwn: boolean;
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  notifications: string[] = [];
  currentMessage: string = '';
  username: string = '';
  tempUsername: string = '';
  
  private messageSubscription?: Subscription;
  private userJoinedSubscription?: Subscription;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Listen for incoming messages
    this.messageSubscription = this.socketService.getMessages().subscribe((data: any) => {
      const message: ChatMessage = {
        username: data.username || 'Anonymous',
        text: data.text || data.message || data,
        /* timestamp: new Date(), */
        isOwn: data.username === this.username
      };
      this.messages.push(message);
      this.scrollToBottom();
    });

    // Listen for user joined notifications
    this.userJoinedSubscription = this.socketService.getUserJoined().subscribe((notification: string) => {
      this.notifications.push(notification);
      setTimeout(() => {
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
          this.notifications.splice(index, 1);
        }
      }, 5000); // Remove notification after 5 seconds
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.userJoinedSubscription) {
      this.userJoinedSubscription.unsubscribe();
    }
    this.socketService.disconnect();
  }

  setUsername(): void {
    if (this.tempUsername.trim()) {
      this.username = this.tempUsername.trim();
      this.socketService.joinChat(this.username);
      this.tempUsername = '';
    }
  }

  sendMessage(): void {
    if (this.currentMessage.trim() && this.username) {
      const messageData = {
        username: this.username,
        text: this.currentMessage.trim(),
        /* timestamp: new Date() */
      };
      
      this.socketService.sendMessage(messageData);
      this.currentMessage = '';
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }
}
