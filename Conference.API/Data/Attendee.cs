namespace Conference.API.Data;

public class Attendee : Conference.Model.Attendee
{
    public virtual ICollection<SessionAttendee> SessionsAttendees { get; set; } = null!;
}
