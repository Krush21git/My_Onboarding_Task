using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sdonboarding.Server.Models;

public partial class Customer
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Customer name is required.")]
    [StringLength(50, ErrorMessage = "Customer name cannot exceed 50 characters.")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "Customer Address is required.")]
    [StringLength(50, ErrorMessage = "Customer Address cannot exceed 50 characters.")]
    public string? Address { get; set; }

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}
