using Microsoft.EntityFrameworkCore;

namespace Conference.API.Data;

public static class SeedData
{
    public static async Task InitializeAsync(ApplicationDbContext context, ILogger logger)
    {
        // Check if database already has data
        if (await context.Speakers.AnyAsync() || 
            await context.Sessions.AnyAsync() || 
            await context.Attendees.AnyAsync())
        {
            logger.LogInformation("Database already contains data - skipping seed");
            return;
        }

        logger.LogInformation("Seeding database with sample data...");

        // Add Tracks
        var tracks = new[]
        {
            new Track { Name = "Backend Development" },
            new Track { Name = "Frontend Development" },
            new Track { Name = "Cloud & DevOps" },
            new Track { Name = "Mobile Development" },
            new Track { Name = "Data & AI" }
        };

        context.Tracks.AddRange(tracks);
        await context.SaveChangesAsync();
        logger.LogInformation("Added {Count} tracks", tracks.Length);

        // Add Speakers
        var speakers = new[]
        {
            new Speaker
            {
                Name = "Scott Hunter",
                Bio = "Scott Hunter is the VP of Product for Azure Developer Experience at Microsoft, overseeing .NET, Visual Studio, and Azure developer tools.",
                WebSite = "https://twitter.com/coolcsh"
            },
            new Speaker
            {
                Name = "David Fowler",
                Bio = "David Fowler is a Partner Software Architect on the ASP.NET team at Microsoft and creator of SignalR.",
                WebSite = "https://twitter.com/davidfowl"
            },
            new Speaker
            {
                Name = "Safia Abdalla",
                Bio = "Safia Abdalla is a software engineer on the .NET team at Microsoft, working on ASP.NET Core.",
                WebSite = "https://twitter.com/captainsafia"
            },
            new Speaker
            {
                Name = "Glenn Condron",
                Bio = "Glenn Condron is a Program Manager on the ASP.NET Core team at Microsoft.",
                WebSite = "https://twitter.com/condrong"
            },
            new Speaker
            {
                Name = "Mads Kristensen",
                Bio = "Mads Kristensen is a Principal Program Manager at Microsoft, working on Visual Studio extensibility and web tools.",
                WebSite = "https://twitter.com/mkristensen"
            },
            new Speaker
            {
                Name = "Damian Edwards",
                Bio = "Damian Edwards is a Principal Architect on the ASP.NET team at Microsoft.",
                WebSite = "https://twitter.com/damianedwards"
            }
        };

        context.Speakers.AddRange(speakers);
        await context.SaveChangesAsync();
        logger.LogInformation("Added {Count} speakers", speakers.Length);

        // Add Sessions
        var startDate = DateTime.Today.AddDays(30); // Conference starts 30 days from now
        
        var sessions = new[]
        {
            new Session
            {
                Title = "What's New in .NET 8",
                Abstract = "Join us for an overview of the latest features and improvements in .NET 8, including performance enhancements, new APIs, and developer productivity improvements.",
                StartTime = startDate.AddHours(9),
                EndTime = startDate.AddHours(10),
                TrackId = tracks[0].Id
            },
            new Session
            {
                Title = "Building Modern Web Apps with Blazor",
                Abstract = "Learn how to build interactive web applications using Blazor, Microsoft's framework for building web apps with C# instead of JavaScript.",
                StartTime = startDate.AddHours(10).AddMinutes(15),
                EndTime = startDate.AddHours(11).AddMinutes(15),
                TrackId = tracks[1].Id
            },
            new Session
            {
                Title = "ASP.NET Core Performance Best Practices",
                Abstract = "Discover the latest performance optimization techniques for ASP.NET Core applications, including caching strategies, async patterns, and efficient data access.",
                StartTime = startDate.AddHours(11).AddMinutes(30),
                EndTime = startDate.AddHours(12).AddMinutes(30),
                TrackId = tracks[0].Id
            },
            new Session
            {
                Title = "Deploying .NET Apps to Azure",
                Abstract = "A comprehensive guide to deploying .NET applications to Azure, covering App Service, Container Apps, and Kubernetes.",
                StartTime = startDate.AddHours(13).AddMinutes(30),
                EndTime = startDate.AddHours(14).AddMinutes(30),
                TrackId = tracks[2].Id
            },
            new Session
            {
                Title = "SignalR Deep Dive",
                Abstract = "Explore real-time communication in .NET with SignalR. Learn about hubs, clients, scaling, and advanced patterns.",
                StartTime = startDate.AddHours(14).AddMinutes(45),
                EndTime = startDate.AddHours(15).AddMinutes(45),
                TrackId = tracks[0].Id
            },
            new Session
            {
                Title = "Building RESTful APIs with Minimal APIs",
                Abstract = "Learn how to build lightweight, high-performance APIs using the Minimal APIs approach in ASP.NET Core.",
                StartTime = startDate.AddHours(9),
                EndTime = startDate.AddHours(10),
                TrackId = tracks[0].Id
            },
            new Session
            {
                Title = "Entity Framework Core Tips and Tricks",
                Abstract = "Advanced patterns and best practices for working with Entity Framework Core, including performance optimization and advanced querying.",
                StartTime = startDate.AddDays(1).AddHours(9),
                EndTime = startDate.AddDays(1).AddHours(10),
                TrackId = tracks[0].Id
            },
            new Session
            {
                Title = "Front-end Development with Modern JavaScript",
                Abstract = "Explore modern JavaScript frameworks and tools for building rich, interactive user interfaces.",
                StartTime = startDate.AddDays(1).AddHours(10).AddMinutes(15),
                EndTime = startDate.AddDays(1).AddHours(11).AddMinutes(15),
                TrackId = tracks[1].Id
            },
            new Session
            {
                Title = "Machine Learning with ML.NET",
                Abstract = "Introduction to machine learning in .NET using ML.NET. Build, train, and deploy ML models in your .NET applications.",
                StartTime = startDate.AddDays(1).AddHours(11).AddMinutes(30),
                EndTime = startDate.AddDays(1).AddHours(12).AddMinutes(30),
                TrackId = tracks[4].Id
            },
            new Session
            {
                Title = "Mobile Development with .NET MAUI",
                Abstract = "Build cross-platform mobile applications using .NET MAUI. Learn about UI design, platform-specific features, and deployment.",
                StartTime = startDate.AddDays(1).AddHours(13).AddMinutes(30),
                EndTime = startDate.AddDays(1).AddHours(14).AddMinutes(30),
                TrackId = tracks[3].Id
            }
        };

        context.Sessions.AddRange(sessions);
        await context.SaveChangesAsync();
        logger.LogInformation("Added {Count} sessions", sessions.Length);

        // Add Session-Speaker relationships
        var sessionSpeakers = new[]
        {
            new SessionSpeaker { SessionId = sessions[0].Id, SpeakerId = speakers[0].Id }, // Scott Hunter - What's New in .NET 8
            new SessionSpeaker { SessionId = sessions[1].Id, SpeakerId = speakers[2].Id }, // Safia Abdalla - Blazor
            new SessionSpeaker { SessionId = sessions[2].Id, SpeakerId = speakers[1].Id }, // David Fowler - Performance
            new SessionSpeaker { SessionId = sessions[2].Id, SpeakerId = speakers[5].Id }, // Damian Edwards - Performance
            new SessionSpeaker { SessionId = sessions[3].Id, SpeakerId = speakers[3].Id }, // Glenn Condron - Azure
            new SessionSpeaker { SessionId = sessions[4].Id, SpeakerId = speakers[1].Id }, // David Fowler - SignalR
            new SessionSpeaker { SessionId = sessions[5].Id, SpeakerId = speakers[5].Id }, // Damian Edwards - Minimal APIs
            new SessionSpeaker { SessionId = sessions[6].Id, SpeakerId = speakers[3].Id }, // Glenn Condron - EF Core
            new SessionSpeaker { SessionId = sessions[7].Id, SpeakerId = speakers[4].Id }, // Mads Kristensen - JavaScript
            new SessionSpeaker { SessionId = sessions[8].Id, SpeakerId = speakers[0].Id }, // Scott Hunter - ML.NET
            new SessionSpeaker { SessionId = sessions[9].Id, SpeakerId = speakers[2].Id }, // Safia Abdalla - MAUI
        };

        foreach (var ss in sessionSpeakers)
        {
            context.Add(ss);
        }
        await context.SaveChangesAsync();
        logger.LogInformation("Added {Count} session-speaker relationships", sessionSpeakers.Length);

        // Add Sample Attendees
        var attendees = new[]
        {
            new Attendee
            {
                FirstName = "John",
                LastName = "Doe",
                UserName = "johndoe",
                EmailAddress = "john.doe@example.com"
            },
            new Attendee
            {
                FirstName = "Jane",
                LastName = "Smith",
                UserName = "janesmith",
                EmailAddress = "jane.smith@example.com"
            },
            new Attendee
            {
                FirstName = "Bob",
                LastName = "Johnson",
                UserName = "bobjohnson",
                EmailAddress = "bob.johnson@example.com"
            }
        };

        context.Attendees.AddRange(attendees);
        await context.SaveChangesAsync();
        logger.LogInformation("Added {Count} attendees", attendees.Length);

        // Register attendees for some sessions
        var sessionAttendees = new[]
        {
            new SessionAttendee { SessionId = sessions[0].Id, AttendeeId = attendees[0].Id },
            new SessionAttendee { SessionId = sessions[1].Id, AttendeeId = attendees[0].Id },
            new SessionAttendee { SessionId = sessions[2].Id, AttendeeId = attendees[0].Id },
            new SessionAttendee { SessionId = sessions[0].Id, AttendeeId = attendees[1].Id },
            new SessionAttendee { SessionId = sessions[3].Id, AttendeeId = attendees[1].Id },
            new SessionAttendee { SessionId = sessions[4].Id, AttendeeId = attendees[2].Id },
        };

        foreach (var sa in sessionAttendees)
        {
            context.Add(sa);
        }
        await context.SaveChangesAsync();
        logger.LogInformation("Added {Count} session attendee registrations", sessionAttendees.Length);

        logger.LogInformation("Database seeding completed successfully!");
        logger.LogInformation("Summary: {Tracks} tracks, {Speakers} speakers, {Sessions} sessions, {Attendees} attendees", 
            tracks.Length, speakers.Length, sessions.Length, attendees.Length);
    }
}
