using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly ActivitiesApp _activitiesApp;

        public ActivitiesController(ActivitiesApp activitiesApp)
        {
            _activitiesApp = activitiesApp;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Get(Guid id)
        {
            return Ok(await _activitiesApp.GetActivity(id));
        }

        // GET api/activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> Get()
        {
            return Ok(await _activitiesApp.GetActivities());

        }
    }
}