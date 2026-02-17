namespace Conference.API.Data;

public class Track : Conference.Model.Track
{
    public virtual ICollection<Session> Sessions { get; set; } = null!;
}
