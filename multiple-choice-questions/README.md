# Multiple-Choice Questions Answers

# 1. REST API Best Practices

### 1. What is the most appropriate HTTP status code to return when a resource is successfully created?

- :white_large_square: 200
- :white_check_mark: 201
- :white_large_square: 202
- :white_large_square: 204

### 2. Which of these HTTP methods is not typically idempotent?

- :white_large_square: GET
- :white_check_mark: POST
- :white_large_square: PUT
- :white_large_square: DELETE

### 3. Which HTTP status code best represents a successful DELETE operation with no content to return?

- :white_large_square: 200
- :white_check_mark: 204
- :white_large_square: 400
- :white_large_square: 404

### 4. Which practice is NOT recommended in REST API design?

- :white_check_mark: Use GET for all operations.
- :white_large_square: Use plural nouns for resources.
- :white_large_square: Include version numbers in the URL.
- :white_large_square: Return detailed error messages.

### 5. Which approach is best for adding filtering in a REST API without overloading the server?

- :white_check_mark: Use query parameters for filters.
- :white_large_square: Load all data on the client side and filter.
- :white_large_square: Implement full-text search on every field.
- :white_large_square: Separate endpoints for each filter.

### 6. In designing a REST API, which of these is a recommended practice for error handling?

- :white_large_square: Return status code 500 for all errors.
- :white_check_mark: Use descriptive error codes and messages.
- :white_large_square: Only return generic error messages to the client.
- :white_large_square: Avoid returning error codes, only messages.

### 7. What is the primary purpose of pagination in API design?

- :white_large_square: To simplify frontend development.
- :white_large_square: To handle filtering of resources.
- :white_check_mark: To manage large datasets and reduce server load.
- :white_large_square: To improve data integrity.

### 8. Which approach would best ensure that a REST API remains responsive under heavy load?

- :white_large_square: Increase database connection pool size.
- :white_check_mark: Implement rate limiting to control incoming requests.
- :white_large_square: Shift all endpoints to synchronous processing.
- :white_large_square: Remove pagination to reduce server processing time.

# 2. Role-Based Access Control (RBAC) Concepts

### 1. Which of the following best describes the “least privilege” principle in RBAC?

- :white_large_square: Allowing users to access all resources.
- :white_check_mark: Granting users access only to resources necessary for their role.
- :white_large_square: Allowing only administrators to access all resources.
- :white_large_square: Restricting all users to read-only access.

### 2. What is a practical approach to enforcing role-based access control in a REST API?

- :white_large_square: Embed role information in each payload.
- :white_large_square: Check roles in each endpoint individually.
- :white_check_mark: Centralize role checks with middleware.
- :white_large_square: Store roles in

### 3. In designing RBAC for a REST API, which approach is generally more scalable and maintainable?

- :white_large_square: Implement role checks directly within each route handler.
- :white_check_mark: Define access control policies in a central middleware or authorization service.
- :white_large_square: Use a separate role for every unique endpoint combination.
- :white_large_square: Allow each endpoint to specify its own roles and permissions without central oversight.

# 3. GCP and Cloud Knowledge

### 1. Which GCP service is best suited for hosting containerized applications?

- :white_large_square: Firebase
- :white_large_square: Firestore
- :white_large_square: Cloud Functions
- :white_check_mark: Google Kubernetes Engine (GKE)

### 2. What is a primary advantage of using Google Cloud Run for a serverless deployment?

- :white_large_square: Persistent data storage.
- :white_check_mark: Automatically scales based on request load.
- :white_large_square: Fixed pricing model regardless of usage.
- :white_large_square: No requirement for containerization.

### 3. Which Google Cloud service is best for handling asynchronous messaging between services?

- :white_check_mark: Cloud Pub/Sub
- :white_large_square: Firestore
- :white_large_square: GKE
- :white_large_square: Cloud Run

### 4. What is Firestore’s main advantage as a database choice?

- :white_large_square: Enforces strict schema.
- :white_check_mark: Real-time sync and scalability.
- :white_large_square: Native support for complex joins.
- :white_large_square: Built-in role-based access.

# 4. Database Design and Best Practices

### 1. In a document-based NoSQL database like Firestore, how would you best store a list of related items (e.g., a list of horse vaccinations) in a horse document?

- :white_check_mark: Use a sub-collection within each horse document.
- :white_large_square: Store the list in a relational database instead.
- :white_large_square: Store each item in a separate collection at the root level.
- :white_large_square: Store the list as a string field.

### 2. Which of these is a drawback of using NoSQL databases for storing highly relational data?

- :white_large_square: Limited scalability.
- :white_check_mark: Inefficiency in handling complex joins.
- :white_large_square: High storage costs.
- :white_large_square: Inflexible schema structure.
