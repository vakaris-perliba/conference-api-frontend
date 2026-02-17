using System.ComponentModel.DataAnnotations;

namespace Conference.Model;

public class Track
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string? Name { get; set; }
}
