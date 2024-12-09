using System.Net;
using sdonboarding.Server.Dtos;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class CustomerMapper
    {
        public static Customer DtotoEntity(CustomerDto customerDto)
        {
            var entity = new Customer
            {
                Id = customerDto.Id,
                Name = customerDto.Name,
                Address = customerDto.Address,
            };
            return entity;
        }

        public static CustomerDto EntitytoDto(Customer customer)
        {
            var dto = new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address,
            };
            return dto;
        }

         public static void UpdateEntityFromDto(Customer entity, CustomerDto dto)
         {
              entity.Id = dto.Id;
              entity.Name = dto.Name;
              entity.Address = dto.Address;
                    // Map other fields as needed
         }

    }
}
