import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private socket: any;
  public message: string = '';
  public messages: string[] = [];

  ngOnInit() {
    // Connect to the WebSocket server
    this.socket = io('http://localhost:3000');  // Make sure this URL matches your NestJS server

    // Listen for incoming messages
    this.socket.on('message', (msg: string) => {
      this.messages.push(msg);  // Add received message to the message list
    });
  }

  // Method to send a message to the server
  sendMessage() {
    if (this.message) {
      this.socket.emit('message', this.message);  // Emit message to the server
      this.message = '';  // Clear input field after sending
    }
  }
}
