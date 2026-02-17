# Quick Start Guide

Get the Conference Planner API up and running in minutes!

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) installed
- Your favorite code editor (Visual Studio 2022, VS Code, or Rider)

## 5-Minute Setup

### 1. Navigate to the Project
```bash
cd BackEnd
```

### 2. Restore Dependencies
```bash
dotnet restore
```

### 3. Run the Application
```bash
dotnet run
```

**That's it!** The database will be created automatically on first run with sample data included!

The API will start and display:
```
Now listening on: https://localhost:7112
Now listening on: http://localhost:5112
Database migrated successfully
Seeding database with sample data...
Added 5 tracks
Added 6 speakers
Added 10 sessions
Added 3 attendees
Database seeding completed successfully!
```

### 4. Open Your Browser
Navigate to: `https://localhost:7112`

You'll see the Swagger UI with interactive API documentation!

## Database Setup

**Good news!** The database is now created automatically when you run the application for the first time, **including sample data**!

### What Happens Automatically:
1. ✅ Database file is created (`ConferencePlanner.db`)
2. ✅ All tables are created (Sessions, Speakers, Attendees, Tracks)
3. ✅ Relationships are set up
4. ✅ **Sample data is populated:**
   - 5 conference tracks (Backend, Frontend, Cloud, Mobile, Data & AI)
   - 6 speakers (including Scott Hunter, David Fowler, and more)
   - 10 sessions spread across 2 conference days
   - 3 sample attendees with session registrations
5. ✅ You're ready to test the API immediately!

### Sample Data Included

**Tracks:**
- Backend Development
- Frontend Development
- Cloud & DevOps
- Mobile Development
- Data & AI

**Speakers:**
- Scott Hunter - VP of Product for Azure Developer Experience
- David Fowler - Creator of SignalR
- Safia Abdalla - ASP.NET Core Engineer
- Glenn Condron - ASP.NET Core Program Manager
- Mads Kristensen - Visual Studio Principal PM
- Damian Edwards - ASP.NET Principal Architect

**Sessions:**
- What's New in .NET 8
- Building Modern Web Apps with Blazor
- ASP.NET Core Performance Best Practices
- Deploying .NET Apps to Azure
- SignalR Deep Dive
- Building RESTful APIs with Minimal APIs
- Entity Framework Core Tips and Tricks
- Front-end Development with Modern JavaScript
- Machine Learning with ML.NET
- Mobile Development with .NET MAUI

**Attendees:**
- johndoe (john.doe@example.com)
- janesmith (jane.smith@example.com)
- bobjohnson (bob.johnson@example.com)

### Manual Database Commands (Optional)

If you prefer to run migrations manually or need to troubleshoot:

```bash
# Apply migrations manually
dotnet ef database update

# Add a new migration (after model changes)
dotnet ef migrations add YourMigrationName

# Remove last migration (if not applied to database)
dotnet ef migrations remove
```

## First API Call

### Using Swagger UI
1. Open `https://localhost:7112` in your browser
2. Expand the **Sessions** section
3. Click on `GET /api/sessions`
4. Click **Try it out**
5. Click **Execute**
6. **You'll see 10 pre-populated sessions!** 🎉

### Using curl
```bash
curl https://localhost:7112/api/sessions
```

### Using PowerShell
```powershell
Invoke-RestMethod -Uri "https://localhost:7112/api/sessions" -Method Get
```

## Test the API (No Setup Needed!)

Since the database is pre-populated, you can immediately test all endpoints:

### Get All Sessions
```bash
curl https://localhost:7112/api/sessions
```

### Get a Specific Speaker
```bash
curl https://localhost:7112/api/speakers/1
```

### Search for Sessions
```bash
curl https://localhost:7112/api/search/.NET
```

### Get an Attendee
```bash
curl https://localhost:7112/api/attendees/johndoe
```

### Get Sessions for an Attendee
```bash
curl https://localhost:7112/api/attendees/johndoe/sessions
```

### Create a New Session
```bash
curl -X POST https://localhost:7112/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with .NET 8",
    "abstract": "Learn the basics of .NET 8 development",
    "startTime": "2026-06-01T09:00:00",
    "endTime": "2026-06-01T10:00:00",
    "trackId": 1
  }'
```

### Create a New Attendee
```bash
curl -X POST https://localhost:7112/api/attendees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Williams",
    "userName": "alicew",
    "emailAddress": "alice.williams@example.com"
  }'
```

### Register Attendee for Session
```bash
curl -X POST https://localhost:7112/api/attendees/johndoe/sessions/2
```

## Database Management

### View the Database
The SQLite database is created at `BackEnd/ConferencePlanner.db`

You can use tools like:
- [DB Browser for SQLite](https://sqlitebrowser.org/)
- Visual Studio's SQLite/SQL Server Object Explorer
- VS Code SQLite extension

### Reset the Database
Simply delete the database file and restart the app:
```bash
# Stop the app (Ctrl+C)
rm ConferencePlanner.db
dotnet run
```

The database will be recreated automatically with fresh sample data!

### Check Database Status
Look for these messages in the console when the app starts:
```
Database migrated successfully
Seeding database with sample data...
Database seeding completed successfully!
Summary: 5 tracks, 6 speakers, 10 sessions, 3 attendees
```

### Skip Seeding (For Production)
The seeding logic automatically checks if data exists. If you already have data in your database, seeding is skipped:
```
Database already contains data - skipping seed
```

## Development Tips

### Hot Reload
The app supports hot reload! Make changes to your code and see them immediately:
```bash
dotnet watch run
```

### Check Health
```bash
curl https://localhost:7112/health
```

### View Logs
Logs are output to the console. In development, you'll see detailed information including:
- Database migration status
- Data seeding progress
- HTTP requests
- EF Core queries (if enabled)

## Common Issues

### "SQLite Error 1: 'no such table: Speakers'"
**Solution:** The database wasn't initialized properly. 
1. Stop the app
2. Delete `ConferencePlanner.db`
3. Run `dotnet run` again
4. The database will be recreated automatically with sample data

### Port Already in Use
If port 7112 or 5112 is already in use, edit `BackEnd/Properties/launchSettings.json`:
```json
"applicationUrl": "https://localhost:YOUR_PORT;http://localhost:YOUR_PORT"
```

### HTTPS Certificate Issues
Trust the development certificate:
```bash
dotnet dev-certs https --trust
```

### Database Locked
If you get a database locked error, close any database tools accessing the file.

### Migration Error
If you see migration errors:
```bash
# Delete the database
rm ConferencePlanner.db

# Recreate migrations (if needed)
dotnet ef migrations remove
dotnet ef migrations add InitialCreate

# Run the app (auto-migration will apply it)
dotnet run
```

## Project Structure

```
ConferencePlanner/
├── BackEnd/
│   ├── Data/              # Entity models and DbContext
│   │   ├── Session.cs
│   │   ├── Speaker.cs
│   │   ├── Attendee.cs
│   │   ├── Track.cs
│   │   ├── ApplicationDbContext.cs
│   │   └── SeedData.cs    # Sample data seeding
│   ├── Endpoints/         # API endpoints
│   │   ├── SessionEndpoints.cs
│   │   ├── SpeakerEndpoints.cs
│   │   ├── AttendeeEndpoints.cs
│   │   └── SearchEndpoints.cs
│   ├── Migrations/        # EF Core migrations (auto-generated)
│   ├── Program.cs         # Application startup + auto-migration + seeding
│   └── appsettings.json   # Configuration
└── ConferenceDTO/         # Shared data models
    ├── Session.cs
    ├── Speaker.cs
    └── Attendee.cs
```

## API Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sessions` | GET | Get all sessions (returns 10 sample sessions) |
| `/api/sessions/{id}` | GET | Get specific session |
| `/api/sessions` | POST | Create session |
| `/api/sessions/{id}` | PUT | Update session |
| `/api/sessions/{id}` | DELETE | Delete session |
| `/api/speakers` | GET | Get all speakers (returns 6 sample speakers) |
| `/api/speakers/{id}` | GET | Get specific speaker |
| `/api/attendees/{username}` | GET | Get attendee (try: johndoe, janesmith, bobjohnson) |
| `/api/attendees` | POST | Create attendee |
| `/api/attendees/{username}/sessions` | GET | Get attendee's sessions |
| `/api/attendees/{username}/sessions/{id}` | POST | Register for session |
| `/api/attendees/{username}/sessions/{id}` | DELETE | Unregister from session |
| `/api/search/{term}` | GET | Search sessions/speakers (try: .NET, Blazor, Azure) |
| `/health` | GET | Health check |

## Next Steps

1. ✅ Explore the Swagger UI at `https://localhost:7112`
2. 🎯 Try the sample data endpoints (sessions, speakers, attendees are pre-populated!)
3. 📖 Read the full [API Documentation](API_DOCUMENTATION.md)
4. 🔧 Customize the configuration in `appsettings.json`
5. 🎨 Add your own endpoints in the `Endpoints` folder
6. 🗄️ Modify the data models in the `Data` folder
7. 🌱 Customize the seed data in `Data/SeedData.cs`

## Docker (Optional)

### Build Docker Image
```bash
docker build -t conference-api .
```

### Run in Container
```bash
docker run -p 8080:8080 conference-api
```

Access at: `http://localhost:8080`

## Learning Resources

- [.NET 8 Documentation](https://docs.microsoft.com/dotnet/core/whats-new/dotnet-8)
- [ASP.NET Core Minimal APIs](https://docs.microsoft.com/aspnet/core/fundamentals/minimal-apis)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [Swagger/OpenAPI](https://swagger.io/docs/)

## Getting Help

- 📖 Check [README.md](README.md) for detailed information
- 📚 Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for endpoint details
- 🔄 See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for upgrade information
- 📝 Read [CHANGELOG.md](CHANGELOG.md) for version history

## Happy Coding! 🚀

Now you're ready to build amazing conference management features!

**Remember:** The database is created automatically with sample data - just run `dotnet run` and start exploring! ✨

**No setup required** - 5 tracks, 6 speakers, 10 sessions, and 3 attendees are ready to go! 🎉
