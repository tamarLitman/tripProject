using AutoMapper;
using Bll.IServices;
using Dal.IRepositories;
using Dal.Modules;
using Dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll.Services
{
    public class TripTypeBll : ITripTypeBll
    {
        ITripTypeDal dal;
        IMapper mapper;
        public TripTypeBll(ITripTypeDal dal)
        {
            this.dal = dal;

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Dto.Classes.Mapper>();
            });
            mapper = config.CreateMapper();
        }

        public async Task<int> AddTripType(string typeName)
        {
            return await dal.AddTripType(typeName);
        }

        public async Task<bool> DeleteTripType(int code)
        {
            return await dal.DeleteTripType(code);
        }

        public async Task<List<TripTypeDto>> GetAllTripTypes()
        {
            List<TripType> t= await dal.GetAllTripType();
            return mapper.Map<List<TripTypeDto>>(t);
          
        }
    }
}
