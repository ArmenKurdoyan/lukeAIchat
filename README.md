# AI Chatbot

## Technologies Used

This project uses a combination of **React**, **NestJS**, and **PostgreSQL** to build an AI-driven chatbot application.

- **React** is used for building the client-side of the application, providing a dynamic and responsive user interface. It helps manage the front-end interactions and data visualization.
- **NestJS** is used for the server-side, providing a robust back-end to handle user interactions, process AI responses, and manage database operations.
- **PostgreSQL** is used as the database solution, where user data and chat histories are stored.
- **Socket.io** is used for real-time communication between the client and server.
- **Axios** is used for handling HTTP requests between the client and server.

These technologies were chosen because of their scalability, ease of use, and strong community support, allowing for efficient full-stack development.

## Difficult Problems & Solutions

One of the most challenging aspects of this project was integrating the **User entity** and ensuring that user-related data was handled correctly in the database. Initially, I faced issues with relationships between users and chats. However, after applying **Truncate Cascade** to the tables, I was able to solve the issues related to user-data consistency and improve the user creation process. It was a nice touch to ensure that the app could handle multiple users effectively.

Another challenging aspect was implementing the **visualization of AI responses**. I initially struggled to find appropriate front-end packages that would allow me to visualize and display the AI responses in a meaningful way. While the table visualization is not fully implemented at the moment, I plan to implement a simple solution to parse the response into a table format. A future goal would be to enhance the presentation of AI responses in a more sophisticated way.

## Finding Solutions

For the user entity issue, I implemented a simple solution by generating a random number on the client side, which is then checked on the server to ensure the correct association between users and their respective chats.

For the AI response visualization, I researched available front-end packages and found that none fully suited my needs for displaying AI responses in table format. As a result, I decided to proceed with a simple implementation, such as parsing the response and separating the table header from the body. This is a temporary solution, but I plan to improve it in the future.

## Time Spent

Overall, I spent approximately **14 hours of consecutive work** on this task, which included designing the system, implementing the logic, solving the issues mentioned above, and testing the final solution.

## Steps to Run the Application

Follow these steps to run the AI Chatbot application locally:

1. **Clone the repository** to your local machine:

   ```bash
   git clone <repository_url>
   ```

2. **Set up the server**:

   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server in development mode:
     ```bash
     npm run start:dev
     ```

3. **Set up the client**:

   - Open a new terminal window or tab and navigate to the `client` directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the client:
     ```bash
     npm start
     ```

4. **Access the application**:
   - Open your browser and go to `http://localhost:3000` to access the client-side of the application.

Ensure that both the server and the client are running for the application to function properly.
