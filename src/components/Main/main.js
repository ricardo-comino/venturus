import React from 'react';
import SVG from 'react-inlinesvg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch , faTrash} from '@fortawesome/free-solid-svg-icons';

export class Main extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      photos: [],
      albums: [],
    };
  }

  componentDidMount() {

    // API Users
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    
    // Call Api - Photos and Albums
    this.albums(1)
    this.photos(1);
  }  

  rideInGroup(e) {

    if(e >= 1 && e <= 4) {
      return "Always";
    } else if(e >= 5 && e <= 7) {
      return "Sometimes";
    } else {
      return "Never";
    }
  }

  daysWeek(item) {
    if(item === 1) return "Mon, Wed, Fri";
    if(item === 2) return "Tue" ; 
    if(item === 3) return "Wed" ; 
    if(item === 4) return "Thu, Fri" ; 
    if(item === 5) return "Fri" ; 
    if(item === 6) return "Sat, Sun" ; 
    if(item === 7) return "Sun" ; 
    if(item >= 8) {
      return "Week day" 
    } else {
      return "Every day";
    }
  }

  removeElement(id)  {
    var x = document.getElementById(id);
    x.remove(x.selectedIndex);
  }



  albums(idUser) {

    fetch("https://jsonplaceholder.typicode.com/albums?userId=" + idUser)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            albums: result,
          });
        },

        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
    )
  }

  photos(idUser) {
    // API Photos
    const URL = "https://jsonplaceholder.typicode.com/photos?albumId="+idUser;
    fetch(URL)
    .then(response => response.json())
    .then (json => 
          this.setState({
          photos: json
    }))
  }


  search(e) {
    var table = document.getElementById('table');
    var val = e.value.toLowerCase();

    for (var i = 1; i < table.rows.length; i++) {
        var col = table.rows[i].cells[0].innerText;
        var search = col.toLowerCase().indexOf(val) >= 0;
        table.rows[i].style.display = search ? '' : 'none';
    }
  } 



  render() {
    
    const photos = this.state.photos.map((photo, i)=> {
      return (<span key={i}>
        {photo.albumId}
      </span>
      )
    }) 
    
    
    const albums = this.state.albums.map((album, i)=> {
      return (<span key={i}>
        {album}
      </span>
      )
    }) 

    return (
      <React.Fragment>
        
        <main className="main">
            <section className="section green">
              <div className="grid">
                <SVG src={require(`../../media/sprite.svg`)} />
              </div>
            </section>
            <section className="section">
              <div className="grid">
                <ul>
                  <li className="fist-child">
                    <h1 className="title-page">User</h1>
                  </li>
                  <li className="trace-gray"></li>
                  <li className="last-child">
                    <FontAwesomeIcon icon={faSearch} className="icon-search" />
                    <input type="text" placeholder="Search Username" className="input" id="search" onKeyUp={(e) => this.search(e.target)} />
                  </li>
                </ul>

                <table className="table" id="table">
                  <thead>
                    <tr className="title">
                      <th>Username</th>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>City</th>
                      <th>Ride in group</th>
                      <th>Day of the week</th>
                      <th>Post</th>
                      <th>Albums</th>
                      <th colSpan="2">Photos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map(item => (
                      <tr key={item.id} id={item.id} onClick={() => { if (window.confirm('Tem certeza que deseja excluir essa linha?')) this.removeElement(item.id) } }>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td className="text-green">{item.email}</td>
                        <td className="text-green">{item.address.city}</td>
                        <td>{this.rideInGroup(item.id)}</td>
                        <td>{this.daysWeek(item.id)}</td>
                        <td className="text-green">{photos.length}</td>
                        <td className="text-green">{albums.length}</td>
                        <td>{photos.length}</td>
                        <td className="delete"><FontAwesomeIcon icon={faTrash} /> <span className="pl-5"> Excluir linha</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
            </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Main;