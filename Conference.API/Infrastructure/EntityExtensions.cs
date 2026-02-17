namespace Conference.API.Data;

public static class EntityExtensions
{
    public static Conference.Model.SessionResponse MapSessionResponse(this Session session) =>
        new Conference.Model.SessionResponse
        {
            Id = session.Id,
            Title = session.Title,
            StartTime = session.StartTime,
            EndTime = session.EndTime,
            Speakers = session.SessionSpeakers?
                              .Select(ss => new Conference.Model.Speaker
                              {
                                  Id = ss.SpeakerId,
                                  Name = ss.Speaker.Name
                              })
                               .ToList() ?? new(),
            TrackId = session.TrackId,
            Track = new Conference.Model.Track
            {
                Id = session?.TrackId ?? 0,
                Name = session?.Track?.Name
            },
            Abstract = session?.Abstract
        };

    public static Conference.Model.SpeakerResponse MapSpeakerResponse(this Speaker speaker) =>
        new Conference.Model.SpeakerResponse
        {
            Id = speaker.Id,
            Name = speaker.Name,
            Bio = speaker.Bio,
            WebSite = speaker.WebSite,
            Sessions = speaker.SessionSpeakers?
                .Select(ss =>
                    new Conference.Model.Session
                    {
                        Id = ss.SessionId,
                        Title = ss.Session.Title
                    })
                .ToList() ?? new()
        };

    public static Conference.Model.AttendeeResponse MapAttendeeResponse(this Attendee attendee) =>
        new Conference.Model.AttendeeResponse
        {
            Id = attendee.Id,
            FirstName = attendee.FirstName,
            LastName = attendee.LastName,
            UserName = attendee.UserName,
            Sessions = attendee.SessionsAttendees?
                .Select(sa =>
                    new Conference.Model.Session
                    {
                        Id = sa.SessionId,
                        Title = sa.Session.Title,
                        StartTime = sa.Session.StartTime,
                        EndTime = sa.Session.EndTime
                    })
                .ToList() ?? new()
        };
}
