using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace sdonboarding.Server.Models;

public partial class Store
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Store name is required.")]
    [StringLength(50, ErrorMessage = "Store name cannot exceed 50 characters.")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "Store Address is required.")]
    [StringLength(50, ErrorMessage = "Store Address cannot exceed 50 characters.")]
    public string? Address { get; set; }

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}
