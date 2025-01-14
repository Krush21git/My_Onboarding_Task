﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sdonboarding.Server.Models;

public partial class Product
{

    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Product name is required.")]
    [StringLength(50, ErrorMessage = "Product name cannot exceed 50 characters.")]
    public string? Name { get; set; }


    [Range(0, double.MaxValue, ErrorMessage = "Price must be a non-negative value.")]
    public decimal? Price { get; set; }

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}