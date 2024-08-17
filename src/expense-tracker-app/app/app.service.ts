import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            h1 {
              color: #4CAF50;
              font-size: 24px;
              margin-bottom: 10px;
            }
            p {
              color: #333;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>API Status</h1>
            <p>The Expense-Tracker API is working perfectly!</p>
          </div>
        </body>
      </html>
    `;
  }
}
