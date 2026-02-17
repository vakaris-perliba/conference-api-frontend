namespace Conference.API.Data;

public class Session : Conference.Model.Session
{
    public virtual ICollection<SessionSpeaker> SessionSpeakers { get; set; } = null!;

    public virtual ICollection<SessionAttendee> SessionAttendees { get; set; } = null!;

    public Track Track { get; set; } = null!;
}
