using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.AspNetCore.Identity;

namespace LibraryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly Db _context;

        public BookController(Db context)
        {
            _context = context;
        }

        [HttpPost] //POST /api/book enter a book
        public async Task<IActionResult> AddBook(Book book)
        {
           try
            { 
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return Ok(book); //200 OK
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,ex.Message); //500
            }
        }

        [HttpGet] //GET /api/book get all books
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var books = await _context.Books.ToListAsync();
                return Ok(books); //200 OK
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); //500
            }
        }

        [HttpGet("{id:int}")] //GET /api/book/:id get book by id
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);

                if(book is null)
                {
                    return NotFound();
                }
                return Ok(book); //200 OK
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); //500
            }
        }

        [HttpPut("{id:int}")] //PUT /api/book/:id update book by id
        public async Task<IActionResult> UpdateBook(int id, [FromBody]Book book)
        {
            try
            {
                if (id != book.Id)
                {
                    return BadRequest("Id in url and body mismatch"); //400
                }
                if (!await _context.Books.AnyAsync(p => p.Id == id))
                {
                    return NotFound();
                }

                _context.Books.Update(book);
                await _context.SaveChangesAsync();
                return NoContent(); //204 OK
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); //500
            }
        }

        [HttpDelete("{id:int}")] //DELETE /api/book/:id update book by id
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {

                var book = await _context.Books.FindAsync(id);

                if (book is null)
                {
                    return NotFound();
                }

                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
                return NoContent(); //204 OK
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message); //500
            }
        }
    }
}
