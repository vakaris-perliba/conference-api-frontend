# Conference Planner API Documentation

## Overview
This API provides endpoints to manage conference sessions, speakers, and attendees. All endpoints return JSON responses.

## Base URL
- Development: `https://localhost:7112`
- Production: Configure based on your deployment

## API Endpoints

### Sessions

#### Get All Sessions
```http
GET /api/sessions
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Introduction to .NET 8",
    "abstract": "Learn about the latest features in .NET 8",
    "startTime": "2026-01-15T09:00:00",
    "endTime": "2026-01-15T10:00:00",
    "trackId": 1,
    "track": {
      "id": 1,
      "name": "Backend Development"
    },
    "speakers": [
      {
        "id": 1,
        "name": "John Doe"
      }
    ]
  }
]
```

#### Get Session by ID
```http
GET /api/sessions/{id}
```

**Parameters:**
- `id` (integer, required): Session ID

**Response:** `200 OK` or `404 Not Found`

#### Create Session
```http
POST /api/sessions
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Advanced C# Patterns",
  "abstract": "Deep dive into advanced C# design patterns",
  "startTime": "2026-01-15T11:00:00",
  "endTime": "2026-01-15T12:00:00",
  "trackId": 1
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "title": "Advanced C# Patterns",
  "abstract": "Deep dive into advanced C# design patterns",
  "startTime": "2026-01-15T11:00:00",
  "endTime": "2026-01-15T12:00:00",
  "trackId": 1,
  "track": {
    "id": 1,
    "name": "Backend Development"
  },
  "speakers": []
}
```

#### Update Session
```http
PUT /api/sessions/{id}
Content-Type: application/json
```

**Parameters:**
- `id` (integer, required): Session ID

**Request Body:**
```json
{
  "id": 2,
  "title": "Advanced C# Patterns - Updated",
  "abstract": "Deep dive into advanced C# design patterns",
  "startTime": "2026-01-15T11:00:00",
  "endTime": "2026-01-15T12:30:00",
  "trackId": 1
}
```

**Response:** `204 No Content` or `404 Not Found`

#### Delete Session
```http
DELETE /api/sessions/{id}
```

**Parameters:**
- `id` (integer, required): Session ID

**Response:** `204 No Content` or `404 Not Found`

#### Upload Sessions
```http
POST /api/sessions/upload
Content-Type: text/plain
```

**Request Body:** Session data file

**Response:** `204 No Content` or `409 Conflict`

---

### Speakers

#### Get All Speakers
```http
GET /api/speakers
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "bio": "Senior Software Engineer with 10+ years experience",
    "webSite": "https://johndoe.dev",
    "sessions": [
      {
        "id": 1,
        "title": "Introduction to .NET 8"
      }
    ]
  }
]
```

#### Get Speaker by ID
```http
GET /api/speakers/{id}
```

**Parameters:**
- `id` (integer, required): Speaker ID

**Response:** `200 OK` or `404 Not Found`

---

### Attendees

#### Get Attendee by Username
```http
GET /api/attendees/{username}
```

**Parameters:**
- `username` (string, required): Attendee username

**Response:** `200 OK` or `404 Not Found`
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Smith",
  "userName": "janesmith",
  "sessions": [
    {
      "id": 1,
      "title": "Introduction to .NET 8",
      "startTime": "2026-01-15T09:00:00",
      "endTime": "2026-01-15T10:00:00"
    }
  ]
}
```

#### Get Attendee's Sessions
```http
GET /api/attendees/{username}/sessions
```

**Parameters:**
- `username` (string, required): Attendee username

**Response:** `200 OK`

#### Create Attendee
```http
POST /api/attendees
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "userName": "janesmith",
  "emailAddress": "jane.smith@example.com"
}
```

**Response:** `201 Created` or `409 Conflict`

#### Add Attendee to Session
```http
POST /api/attendees/{username}/sessions/{sessionId}
```

**Parameters:**
- `username` (string, required): Attendee username
- `sessionId` (integer, required): Session ID

**Response:** `201 Created` or `404 Not Found`

#### Remove Attendee from Session
```http
DELETE /api/attendees/{username}/sessions/{sessionId}
```

**Parameters:**
- `username` (string, required): Attendee username
- `sessionId` (integer, required): Session ID

**Response:** `204 No Content` or `404 Not Found`

---

### Search

#### Search Sessions and Speakers
```http
GET /api/search/{term}
```

**Parameters:**
- `term` (string, required): Search term

**Response:** `200 OK`
```json
[
  {
    "type": "Session",
    "session": {
      "id": 1,
      "title": "Introduction to .NET 8",
      "abstract": "Learn about the latest features in .NET 8",
      "startTime": "2026-01-15T09:00:00",
      "endTime": "2026-01-15T10:00:00",
      "trackId": 1,
      "track": {
        "id": 1,
        "name": "Backend Development"
      },
      "speakers": []
    }
  },
  {
    "type": "Speaker",
    "speaker": {
      "id": 1,
      "name": "John Doe",
      "bio": "Senior Software Engineer",
      "webSite": "https://johndoe.dev",
      "sessions": []
    }
  }
]
```

---

### Health

#### Health Check
```http
GET /health
```

**Response:** `200 OK`
```json
{
  "status": "Healthy"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Title": ["The Title field is required."]
  }
}
```

### 404 Not Found
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404
}
```

### 409 Conflict
```json
{
  "message": "Sessions already uploaded"
}
```

## Common Response Headers
- `Content-Type: application/json; charset=utf-8`
- `Date: [Current date/time]`
- `Server: Kestrel`

## Testing with curl

### Create a Session
```bash
curl -X POST https://localhost:7112/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Session",
    "abstract": "This is a test",
    "startTime": "2026-01-15T14:00:00",
    "endTime": "2026-01-15T15:00:00",
    "trackId": 1
  }'
```

### Get All Sessions
```bash
curl https://localhost:7112/api/sessions
```

### Search
```bash
curl https://localhost:7112/api/search/.NET
```

## Notes
- All datetime values are in ISO 8601 format
- The API uses camelCase for JSON property names
- CORS is enabled for all origins in development mode
