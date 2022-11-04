using System;
using System.Collections.Generic;

namespace Project1.Models
{
    public partial class Tarea
    {
        public int Id { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? Fecha { get; set; }
    }
}
