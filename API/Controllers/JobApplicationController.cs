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

  [HttpPut("{id}")]
  public async Task<ActionResult<JobApplication>> UpdateJobApplication(int id, [FromBody] JobApplication updatedApp)
  {
    var application = await context.JobApplications.FindAsync(id);

    if (application == null) return NotFound();

    application.JobTitle = updatedApp.JobTitle;
    application.CompanyName = updatedApp.CompanyName;
    application.Location = updatedApp.Location;
    application.ApplicationSource = updatedApp.ApplicationSource;
    application.ResumeUsed = updatedApp.ResumeUsed;
    application.Status = updatedApp.Status;
    application.Salary = updatedApp.Salary;
    application.DateApplied = updatedApp.DateApplied;
    application.Notes = updatedApp.Notes;

    await context.SaveChangesAsync();

    return application;
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteJobApplication(int id)
  {
    var application = await context.JobApplications.FindAsync(id);

    if (application == null) return NotFound();

    context.JobApplications.Remove(application);
    await context.SaveChangesAsync();

    return NoContent();
  }
}
