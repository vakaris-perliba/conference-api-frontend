namespace Conference.Model;

public class AttendeeResponse : Attendee
{
    public ICollection<Session> Sessions { get; set; } = new List<Session>();
}
