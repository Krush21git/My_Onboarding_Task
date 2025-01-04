using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using sdonboarding.Server.Dtos;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class SaleMapper
    {
        public static Sale DtotoEntity(SaleDto saleDto)
        {
            var entity = new Sale
            {
                Id = saleDto.Id,
                ProductId = saleDto.ProductId,
                CustomerId = saleDto.CustomerId,
                StoreId = saleDto.StoreId,
                DateSold  = saleDto.DateSold,
            };
            return entity;
        }

        public static SaleDto EntitytoDto(Sale sale)
        {
            var dto = new SaleDto
            {
                Id = sale.Id,
                ProductId = sale.ProductId,
                CustomerId = sale.CustomerId,
                StoreId = sale.StoreId,
                DateSold = sale.DateSold,
            };
            return dto;
        }

        public static void UpdateEntityFromDto(Sale sale, SaleDto saleDto)
        {
            // Update the entity with the values from the DTO
            sale.ProductId = saleDto.ProductId;
            sale.CustomerId = saleDto.CustomerId;
            sale.StoreId = saleDto.StoreId;
            sale.DateSold = saleDto.DateSold;
        }
    }
}
