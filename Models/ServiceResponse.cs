namespace FavoriteVerse.Models
{
    /// <summary>
    /// Used siplify getting messages from the server
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ServiceResponse<T>
    {
        public T Data {get; set;}
        public bool  Success { get; set; } = true;
        public string Message { get; set; } = null;
    }
}