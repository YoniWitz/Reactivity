using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application;
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

        // GET api/activities/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<Activity>> Get(Guid id)
        {
            var activity = await _activitiesApp.GetActivity(id);
            return Ok(activity);
        }

        // GET api/activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> Get()
        {
            var activities = await _activitiesApp.GetActivities();
            return Ok(activities);

        }

        //POST api/activities
        [HttpPost]
        public async Task<ActionResult<Activity>> Post(Activity activity){
            await _activitiesApp.PostActivity(activity);
            return CreatedAtAction(nameof(Get), new { id = activity.Id }, activity);
        }

        //PUT api/activities/1
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, Activity activity){
            activity.Id = id;
            var updatedActivity = await _activitiesApp.PutActivity(activity);
            if(updatedActivity == null)
                return NotFound();

            return Ok(updatedActivity);
        }

        //Delete api/activities
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id){
            var deleteSuccess = await _activitiesApp.DeleteActivity(id);
            
            if(!deleteSuccess)
                return NotFound();

            return Ok();
        }
    }
}