using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.Dtos;
using sdonboarding.Server.Mappers;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly OnBoardingProjectContext _context;

        public StoresController(OnBoardingProjectContext context)
        {
            _context = context;
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreDto>>> GetStores()
        {
            try
            {
                // Attempt to fetch all stores from the database
                var _stores = await _context.Stores.ToListAsync();

                if (_stores.Count > 0)
                {
                    // Return the list of stores if available
                    return Ok(_stores);
                }
                else
                {
                    // Return a 400 Bad Request if no stores are found
                    return BadRequest("There are no stores.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a 500 Internal Server Error response if an unexpected error occurs
                return StatusCode(500, "An error occurred while retrieving stores.");
            }


        }

        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDto>> GetStore(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid store ID provided.");
            }

            try
            {
                // Attempt to find the store by ID
                var store = await _context.Stores.FindAsync(id);

                if (store == null)
                {
                    return NotFound("Store not found.");
                }

                // Map the store entity to a DTO and return the result
                return Ok(StoreMapper.EntitytoDto(store));
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a generic error response
                return StatusCode(500, "An error occurred while retrieving the store.");
            }

        }

        // PUT: api/Stores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, StoreDto storeDto)
        {

            if (id <= 0)
            {
                return BadRequest("Invalid store ID provided.");
            }

            if (id != storeDto.Id)
            {
                return BadRequest("Store ID mismatch.");
            }

            // Check if the store exists in the database

            var existingStore = await _context.Stores.FindAsync(id);


            if (existingStore == null)

            {
                return NotFound("Store not found.");

            }

            // Map the DTO to the existing entity



            StoreMapper.UpdateEntityFromDto(existingStore, storeDto);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Stores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore(StoreDto store)
        {
            if (store.Id <= 0)
            {
                return BadRequest("Invalid store ID provided.");
            }

            try
            {
                // Map the DTO to the entity
                var entity = StoreMapper.DtotoEntity(store);

                // Add the entity to the database context
                _context.Stores.Add(entity);

                // Save the changes to the database
                await _context.SaveChangesAsync();

                // Return a 201 Created response with the new store's details
                return CreatedAtAction("GetStore", new { id = store.Id }, StoreMapper.EntitytoDto(entity));
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a generic error response for unexpected errors
                return StatusCode(500, "An error occurred while creating the store.");
            }

        }

        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid store ID provided.");
            }

            try
            {
                // Attempt to find the store by ID
                var store = await _context.Stores.FindAsync(id);

                if (store == null)
                {
                    return NotFound("Store not found.");
                }

                // Remove the store from the database
                _context.Stores.Remove(store);
                await _context.SaveChangesAsync();

                // Return NoContent to indicate successful deletion
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a 500 Internal Server Error response if an unexpected error occurs
                return StatusCode(500, "An error occurred while deleting the store.");
            }

        }

        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}
