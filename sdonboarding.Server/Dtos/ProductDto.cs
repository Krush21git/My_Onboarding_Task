using System.ComponentModel.DataAnnotations;

namespace sdonboarding.Server.Dtos
{
    public class ProductDto
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product name is required.")]
        [StringLength(50, ErrorMessage = "Product name cannot exceed 50 characters.")]
        public string? Name { get; set; }


        [Range(0, double.MaxValue, ErrorMessage = "Price must be a non-negative value.")]
        public decimal? Price { get; set; }

         // Optional: A read-only property to format Price for display purposes
        public string FormattedPrice => Price.HasValue 
            ? Price.Value.ToString("F2") // Formats with two decimal places
            : "N/A";

    }
}
