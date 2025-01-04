using System.ComponentModel.DataAnnotations;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Dtos
{
    public class StoreDto
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Store name is required.")]
        [StringLength(50, ErrorMessage = "Store name cannot exceed 50 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Store Address is required.")]
        [StringLength(50, ErrorMessage = "Store Address cannot exceed 50 characters.")]
        public string? Address { get; set; }

    }
}
