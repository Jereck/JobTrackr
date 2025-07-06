using System;

namespace API.Entities;

public class JobApplication
{
  public int Id { get; set; }
  public required string JobTitle { get; set; }
  public required string CompanyName { get; set; }
  public required string Location { get; set; }
  public required string ApplicationSource { get; set; }
  public required string ResumeUsed { get; set; }
  public required string Status { get; set; }
  public decimal? Salary { get; set; }
  public DateTime DateApplied { get; set; } = DateTime.UtcNow;
  public string? Notes { get; set; }

}
