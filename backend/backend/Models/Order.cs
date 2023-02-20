using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Order
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public string OriginTown { get; set; }

        [Required]
        public string OriginAddress { get; set; }

        [Required]
        public string DestinationTown { get; set;}

        [Required]
        public string DestinationAddress { get; set; }

        [Required]
        public float Weight { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
