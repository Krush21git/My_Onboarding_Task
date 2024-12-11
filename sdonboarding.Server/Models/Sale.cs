using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sdonboarding.Server.Models;

public partial class Sale
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Product Id is required.")]
    public int? ProductId { get; set; }

    [Required(ErrorMessage = "Customer Id is required.")]
    public int? CustomerId { get; set; }

    [Required(ErrorMessage = "Store Id is required.")]
    public int? StoreId { get; set; }

    [Required(ErrorMessage = "Date sold is required.")]
    public DateTime? DateSold { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Store? Store { get; set; }
}
