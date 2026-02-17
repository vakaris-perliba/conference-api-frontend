namespace Conference.API.Data;

public class Speaker : Conference.Model.Speaker
{
    public virtual ICollection<SessionSpeaker> SessionSpeakers { get; set; } = new List<SessionSpeaker>();
}
