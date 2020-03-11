using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        private readonly IActivitiesApp _activitiesApp;

        public ActivitiesController(IActivitiesApp activitiesApp)
        {
            _activitiesApp = activitiesApp;
        }

        // GET api/activities/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<ActivityDTO>> Get(Guid id)
        {
            var activityDTO = await _activitiesApp.GetActivity(id);
            if (activityDTO == null)
            {
                return NotFound();
            }
            return Ok(activityDTO);
        }

        // GET api/activities
        [HttpGet]
        public async Task<ActionResult<List<ActivityDTO>>> Get()
        {
            var activitiesDTOs = await _activitiesApp.GetActivities();
            return Ok(activitiesDTOs);

        }

        //POST api/activities
        [HttpPost]
        public async Task<ActionResult<ActivityDTO>> Post(ActivityDTO activityDTO)
        {
            var createdActivityDTO = await _activitiesApp.PostActivity(activityDTO);
            if (createdActivityDTO == null)
                return NotFound();
            return CreatedAtAction(nameof(Get), new { id = createdActivityDTO.Id }, createdActivityDTO);
        }

        //PUT api/activities/1
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, ActivityDTO activityDTO)
        {
            activityDTO.Id = id;
            var updatedActivityDTO = await _activitiesApp.PutActivity(activityDTO);
            if (updatedActivityDTO.Message != null)
                return BadRequest(updatedActivityDTO.Message);

            return Ok(updatedActivityDTO);
        }

        //Delete api/activities
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var deleteSuccess = await _activitiesApp.DeleteActivity(id);

            if (!deleteSuccess)
                return BadRequest("Error deleting activity");

            return Ok();
        }
    }
}