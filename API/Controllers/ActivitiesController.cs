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
        public async Task<ActionResult<ActivityDTO>> Get(Guid id)
        {
            var activityDto = await _activitiesApp.GetActivityDTO(id);
            return Ok(activityDto);
        }

        // GET api/activities
        [HttpGet]
        public async Task<ActionResult<List<ActivityDTO>>> Get()
        {
            var activitiesDtos = await _activitiesApp.GetActivitiesDTOs();
            return Ok(activitiesDtos);

        }

        //POST api/activities
        [HttpPost]
        public async Task<ActionResult<ActivityDTO>> Post(ActivityDTO activityDto){
            var createdActivityDto = await _activitiesApp.PostActivityDTO(activityDto);
            return CreatedAtAction(nameof(Get), new { id = createdActivityDto.Id }, createdActivityDto);
        }

        //PUT api/activities/1
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, ActivityDTO activityDto){
            activityDto.Id = id;
            var updatedActivityDto = await _activitiesApp.PutActivityDTO(activityDto);
            if(updatedActivityDto == null)
                return NotFound();

            return Ok(updatedActivityDto);
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