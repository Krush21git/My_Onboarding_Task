using sdonboarding.Server.Dtos;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class StoreMapper
    {
        public static Store DtotoEntity(StoreDto storeDto)
        {
            var entity = new Store
            {
                Id = storeDto.Id,
                Name = storeDto.Name,
                Address = storeDto.Address,
            };
            return entity;
        }

        public static StoreDto EntitytoDto(Store store)
        {
            var dto = new StoreDto
            {
                Id = store.Id,
                Name = store.Name,
                Address = store.Address,
            };
            return dto;
        }

        public static void UpdateEntityFromDto(Store entity, StoreDto dto)
        {
            entity.Id = dto.Id;
            entity.Name = dto.Name;
            entity.Address = dto.Address;
            // Map other fields as needed
        }
    }
}
