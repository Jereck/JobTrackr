using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobApplicationController(AppDbContext context) : ControllerBase
{
  [HttpGet]
  public async Task<ActionResult<List<JobApplication>>> GetAllApplications()
  {
    var applications = await context.JobApplications.ToListAsync();
    return applications;
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<JobApplication>> GetJobApplicationById(int id)
  {
    var application = await context.JobApplications.FindAsync(id);

    if (application == null) return NotFound();

    return application;
  }

  [HttpPost]
  public async Task<ActionResult<JobApplication>> CreateJobApplication(JobApplication app)
  {
    var application = new JobApplication
    {
      Id = 2,
      JobTitle = app.JobTitle,
      CompanyName = app.CompanyName,
      Location = app.Location,
      ApplicationSource = app.ApplicationSource,
      ResumeUsed = app.ResumeUsed,
      Status = app.Status,
      Salary = app.Salary,
      DateApplied = DateTime.UtcNow,
      Notes = app.Notes
    };

    context.JobApplications.Add(application);
    await context.SaveChangesAsync();
    return application;
  }
}
