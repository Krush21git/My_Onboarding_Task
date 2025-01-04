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
            var _stores = await _context.Stores.ToListAsync();

            if (_stores.Count > 0)

            {

                return Ok(_stores);

            }

            else

            {

                return BadRequest("There are no store");

            }


        }

        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDto>> GetStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return StoreMapper.EntitytoDto(store);
        }

        // PUT: api/Stores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, StoreDto storeDto)
        {
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
            var entity = StoreMapper.DtotoEntity(store);
            _context.Stores.Add(entity);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetStore", new { id = store.Id }, StoreMapper.EntitytoDto(entity));
        }

        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}
