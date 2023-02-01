using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SistemaVendas.Dto.OrderItemDTO;
using SistemaVendas.Models;
using SistemaVendas.Repository;

namespace SistemaVendas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderItemController : ControllerBase
    {
        private readonly OrderItemRepository _repository;

        public OrderItemController(OrderItemRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public IActionResult Register(RegisterOrderItemDTO dto)
        {
            var orderItem = new OrderItem(dto);
            _repository.Register(orderItem);
            return Ok(orderItem);
        }

        [HttpGet("{orderId}")]
        public IActionResult List(int orderId)
        {
            var orderItems = _repository.List(orderId);

            if (orderItems.Count() > 0)
            {
                return Ok(orderItems);
            }
            else
            {
                return NotFound(new { Message = "There aren't items linked to order specified"});
            }
        }

        [HttpDelete]
        public IActionResult Delete(int orderId, int serviceId)
        {
            var orderItem = _repository.GetOrderItem(orderId, serviceId);

            if(orderItem is not null)
            {
                _repository.DeleteOrderItem(orderItem);
                return NoContent();
            }
            else
            {
                return NotFound(new { Message = "The item wasn't found"});
            }
        }

        [HttpPatch("{orderId}")]
        public IActionResult Update(int orderId, int serviceId, UpdateOrderItemDTO dto)
        {
            var orderItem = _repository.GetOrderItem(orderId, serviceId);

            if (orderItem is not null)
            {
                orderItem.MapUpdateOrderItem(dto);
                _repository.Update(orderItem);
                return Ok(orderItem);
            }
            else
            {
                return NotFound(new { Message = "Item not found"});
            }
        }

    }
}