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
    public class ProductsController : ControllerBase
    {
        private readonly OnBoardingProjectContext _context;

        public ProductsController(OnBoardingProjectContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            try
            {
                var _products = await _context.Products.ToListAsync();

                if (_products.Count > 0)
                {
                    return Ok(_products);
                }
                else
                {
                    return BadRequest("There are no products available.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception (optional: if you have a logging mechanism like Serilog, NLog, etc.)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a generic error message
                return StatusCode(500, "An error occurred while retrieving the products.");
            }

        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            try
            {
                // Check if the id is null or invalid
                if (id <= 0)
                {
                    return BadRequest("Invalid product ID provided.");
                }

                // Find the product by ID
                var product = await _context.Products.FindAsync(id);

                if (product == null)
                {
                    return NotFound("Product not found.");
                }

                // Map the product entity to a DTO and return the result
                return Ok(ProductMapper.EntitytoDto(product));
            }
            catch (Exception ex)
            {
                // Log the exception (use a logging mechanism in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a generic error response
                return StatusCode(500, "An error occurred while processing your request.");
            }

        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductDto productDto)
        {            // Validate if the ID in the URL matches the ID in the DTO

            // Validate the ID is greater than 0
            if (id <= 0)
            {
                return BadRequest("Invalid product ID provided.");
            }

            // Validate that the route ID matches the DTO ID
            if (id != productDto.Id)

            {

                return BadRequest("Product ID mismatch.");

            }

            // Check if the product exists in the database

            var existingProduct = await _context.Products.FindAsync(id);

            if (existingProduct == null)

            {
                return NotFound("Product not found.");

            }

            // Map the DTO to the existing entity

            ProductMapper.UpdateEntityFromDto(existingProduct, productDto);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(ProductDto product)
        {
            try
            {
                // Map the DTO to an entity
                var entity = ProductMapper.DtotoEntity(product);

                // Add the entity to the database
                _context.Products.Add(entity);

                // Save the changes
                await _context.SaveChangesAsync();

                // Return a 201 Created response with the new product details
                return CreatedAtAction("GetProduct", new { id = entity.Id }, ProductMapper.EntitytoDto(entity));
            }
            catch (Exception ex)
            {
                // Log the exception (use a proper logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a 500 Internal Server Error response
                return StatusCode(500, "An error occurred while creating the product.");
            }

        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid product ID provided.");
            }

            try
            {
                // Attempt to find the product by ID
                var product = await _context.Products.FindAsync(id);

                if (product == null)
                {
                    return NotFound("Product not found.");
                }

                // Remove the product from the database
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                // Return 204 No Content response
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception (use a logging framework in production)
                Console.WriteLine($"An error occurred: {ex.Message}");

                // Return a 500 Internal Server Error response
                return StatusCode(500, "An error occurred while deleting the product.");
            }

        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
