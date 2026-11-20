# Part C — API Tests (Postman + Newman)

Collection: `jsonplaceholder-users.postman_collection.json`

## Run with Newman (CLI)

```bash
# from project root
npm run test:api

# or directly
npx newman run api-tests/jsonplaceholder-users.postman_collection.json
```

## What it covers

1. **GET** `/users` — status 200, non-empty array, each user has `id`, `name`, `email`; saves one `userId`
2. **PUT** `/users/{id}` — updates `name`, `email`, `company.name` with dynamic values; validates returned id, non-empty phone, and updated name
