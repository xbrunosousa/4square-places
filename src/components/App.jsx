import React, { Component } from 'react';
import format from 'date-fns/format';
import { Button } from 'reactstrap';
import Places from './Places/Places';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading/Loading';
import NavbarApp from './NavbarApp/NavbarApp';
import Footer from './Footer/Footer';
import store from './../store/index';
import './App.css';
import { connect } from 'react-redux';
import {addPhotos, addVenues, addLocation, accessLocation } from './../actions';
class App extends Component {
  componentDidMount() {
    // store.subscribe(() => console.log('Alterou'))
  }
  constructor() {
    super();
    this.state = {
      isLoading: false,
      errorLocate: false,
      code: undefined,
    };
  }

  places = () => {
    // fetch places
    const date = format(new Date(), 'YYYYMMDD');
    fetch(
      `https://api.foursquare.com/v2/venues/search?ll=${
        store.getState().userLocation.lat
      },${store.getState().userLocation.lng}&client_id=${
        store.getState().fourSquareClientId
      }&client_secret=${
        store.getState().fourSquareClientSecret
      }&limit=10&v=${date}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          code: res.meta.code,
          isLoading: false
        });
        store.dispatch(addVenues(res.response.venues));
        store.dispatch(accessLocation('Atualizar sua localização...'));
        if (res.meta.code === 403) {
          toast.error(
            'Cota excedida. Tente novamente mais tarde.',
            store.getState().toastDefaultProps
          );
        } else if (res.meta.code === 400) {
          toast.error(
            'Houve um erro ao buscar os dados. Tente novamente mais tarde.',
            store.getState().toastDefaultProps
          );
        }
      });
  }

  getLocation = () => {
    this.setState({
      isLoading: true
    });
    store.dispatch(accessLocation('Obtendo sua localização. Por favor, aguarde...'));
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude,
        longitude = position.coords.longitude;
      if (latitude !== undefined) {
        store.dispatch(
          addLocation({
            lng: longitude,
            lat: latitude
          })
        );
        store.dispatch(accessLocation('Localização obtida. Carregando resultados...'));
        this.places();
      } else {
        this.setState({ errorLocate: true });
        toast.error(
          'Houve um erro ao capturar sua localização. Recarregue a página ou tente novamente mais tarde.',
          store.getState().toastDefaultProps
        );
      }
    });
  }
  loadPhotos = idVenue => {
    const date = format(new Date(), 'YYYYMMDD');

    fetch(
      `https://api.foursquare.com/v2/venues/${idVenue}/photos?client_id=${
        store.getState().fourSquareClientId
      }&client_secret=${store.getState().fourSquareClientSecret}&v=${date}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.meta.code === 200) {
          store.dispatch(
            addPhotos({
              [idVenue]: res.response.photos,
              [`${idVenue}_clicked`]: true
            })
          );
        } else {
          alert('Erro ao recuperar as fotos');
        }
      });
  };
  closePhoto = id => {
    store.dispatch(
      addPhotos({
        photosData: { [`${id}_clicked`]: false }
      })
    );
  };

  render() {
    return (
      <div className="App">
        <NavbarApp />
        <ToastContainer />
        <Button
          outline
          className="btn-access-location"
          color="success"
          onClick={this.getLocation}
        >
          {store.getState().accessLocation}
        </Button>

        {this.state.isLoading && <Loading />}

        <Places
          loadPhotos={idVenue => this.loadPhotos(idVenue)}
          closePhoto={idVenue => this.closePhoto(idVenue)}
          code={this.state.code}
        />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  venues: store.venues,
  accessLocation: store.accessLocation,
  toastDefaultProps: store.toastDefaultProps
});
export default connect(mapStateToProps)(App);
