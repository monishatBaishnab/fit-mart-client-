## FitMart Express Server: Backend API for Fitness E-Commerce

The FitMart Express Server is designed to manage product data, handle user purchases, and support various e-commerce functionalities. Built with Express.js, MongoDB, and Mongoose, this server showcases advanced backend development skills and best practices in API design and error handling.

### Key Features

1. **Product Management**:
   - **Fetch All Products**: Retrieve a list of products with filtering options for search, categories, and price range.
   - **Fetch Single Product**: Get detailed information about a specific product.
   - **Create Product**: Add new products to the inventory.
   - **Update Product**: Modify existing product details.
   - **Delete Product**: Remove products from the inventory.

2. **Purchase Processing**:
   - **Create Purchase**: Process customer orders and update product stock quantities accordingly.

3. **Error Handling**:
   - **Path Error Handling**: Respond with a 404 error for undefined routes.
   - **Global Error Handling**: Provide detailed error responses for issues that occur during requests.

4. **Exception Handling**:
   - **Uncaught Exceptions and Rejections**: Gracefully handle uncaught exceptions and unhandled promise rejections to maintain server stability.

### Technology Stack

- **Server Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Error Handling**: Custom error responses
- **Environment Management**: `dotenv` for configuration
- **Server Port**: 5000 (default)

### Steps to Run the Server Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/monishatBaishnab/fit-mart-server.git
   cd fit-mart-server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory and add your environment variables:
     ```plaintext
     NODE_ENV=development
     PORT=5000
     DB_URI=your_mongodb_uri
     ```

4. **Run the Server**
   ```bash
   npm run dev
   ```

5. **Verify the Server**
   - Ensure the server is running on port 5000 and accessible at `http://localhost:5000`.

With these steps, the FitMart Express Server is ready to handle all backend operations for the FitMart e-commerce platform. Enjoy building and showcasing your backend development skills with this robust API!