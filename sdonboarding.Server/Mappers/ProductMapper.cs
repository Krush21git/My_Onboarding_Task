using Microsoft.AspNetCore.Mvc;
using sdonboarding.Server.Dtos;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class ProductMapper
    {
        public static Product DtotoEntity(ProductDto productDto)
        {
            var entity = new Product
            {
                Id = productDto.Id,
                Name = productDto.Name,
                Price = productDto.Price,
            };
            return entity;
        }

        public static ProductDto EntitytoDto(Product product)
        {
            var dto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
            };
            return dto;
        }

        public static void UpdateEntityFromDto(Product entity, ProductDto dto)
        {
            entity.Id = dto.Id;
            entity.Name = dto.Name;
            entity.Price = dto.Price;
            // Map other fields as needed
        }

        internal static ActionResult<StoreDto> EntitytoDto(Store store)
        {
            throw new NotImplementedException();
        }
    }
}
