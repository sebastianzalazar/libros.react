import { Component } from "react";
import'./App.css'
import Header from "./Components/Header/Header";
class App extends Component {
  constructor(props) {
    super(props);
    const storeBooks = JSON.parse(localStorage.getItem('books'));
    this.state = {
      books:storeBooks || [
        { id: 0, rating: 3, title: 'Red Queen', image: 'Libro1.jpg',description:'este libro es de ...' },
        { id: 1, rating: 5, title: 'El maravilloso mago de oz', image: 'Libro2.webp' },
        { id: 2, rating: 1, title: 'Peter pan ', image: 'Libro3.jpg' },
        { id: 3, rating: 4, title: 'Histoires', image: 'Libro4.webp' },
        { id: 4, rating: 4, title: 'Story books', image: 'libro5.webp' },
        { id: 5, rating: 4, title: 'El libro de la selva', image: 'Libro6.jpg' },
        { id: 6, rating: 4, title: ' Harry potter', image: 'Libto7.webp' },
        { id: 7, rating: 4, title: 'L"ordine', image: 'Libro8.jpg' },
        { id: 9, rating: 4, title: 'Los minios', image: 'Libro10.jpg' },
        { id: 10, rating: 4, title: 'El regreso a casa', image: 'libro11.webp' },
        { id: 11, rating: 5, title: 'Un nuevo viaje', image: 'libro12.jpg' },
      ],
      copyBooks: [],
      searchQery: "",
    };
  }
  addBook = (newBook) => {
    this.setState((prevState) => ({
      books: [...prevState.books, newBook],
    }),()=>localStorage.setItem('books',JSON.stringify(this.state.books)));
  };
  updateBook = (id, updateFields) => {
    this.setState((prevState) => ({
      books: prevState.books.map((book) =>
        book.id === id ? { ...book,...updateFields } : book)
    }),()=>localStorage.setItem('books',JSON.stringify(this.state.books)));

  }
  deleteBook = (id) => {
    this.setState((prevState) => ({
      books: prevState.books.filter((book) => book.id !== id),
    }),()=>localStorage.setItem('books',JSON.stringify(this.state.books)));
  };
  handleSearchchange=(e)=>{
    this.setState({searchQery:e.target.value})
  }
  filterBooks = () => {
    const { books, searchQery } = this.state;
    return books.filter((book) => 
    book.title.toLowerCase().includes(searchQery.toLowerCase()))
  }
  render() {
    const filteredBooks = this.filterBooks();
    return (
      <div>
        <Header onSearchChange={this.handleSearchchange}/>
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <img src={`img/${book.image}`} alt={book.title}/>
              <p>{book.title}</p>
              <p>rating:{book.rating}</p>
              <small>{book.description}</small>
              <button onClick={()=>this.updateBook(book.id,{rating:book.rating+1})}>incrementar Rating</button>
              <button onClick={()=>this.updateBook(book.id,{rating:book.rating-1})}>decrementar Rating</button>
              <button onClick={()=>this.deleteBook(book.id)}>Eliminar</button>
              <button onClick={()=>this.updateBook(book.id,{title:prompt('nuevo nombre',book.title)})}>Actualizar</button>
            </li>
          ))}
        </ul>
        <form onSubmit={(e)=>{
          e.preventDefault();
          const title = e.target.title.value;
          const rating = e.target.rating.value;
          const image = e.target.image.value;
          const newBook={id:Date.now(),title,rating,image};
          this.addBook(newBook);
        }}>
          <label>Titulo:
            <input type="text" name="title" required />
          </label>
          <label>Rating:
            <input type="number" name="rating" required />
          </label>
          <label>Imagen:
            <input type="text" name="image" required />
          </label>
          <button type="submit">Agregar Libro</button>
        </form>

      </div>
    )
  }
}

export default App;