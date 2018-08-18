import React, { Component } from 'react';
import format from 'date-fns/format';
import { Button } from 'reactstrap';
import Places from './Places/Places';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading/Loading';
import NavbarApp from './NavbarApp/NavbarApp';
import Footer from './Footer/Footer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      toastDefaultProps: {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      },
      lng: undefined,
      lat: undefined,
      isLoading: false,
      errorLocate: false,
      code: undefined,
      venues: undefined,
      accessLocation: 'Permitir acesso à localização'
    };
  }

  places = () => {
    const CLIENT_ID = 'T2LPSOLZ5QN313AVWZIOFYMTENZFECV3I2H33V0Q435ANRED';
    const CLIENT_SECRET = 'RZTUNDKJ12MBH1GR30YPHJU3RCRLR5VT20ELPYTQJ1XH3HUL';
    const date = format(new Date(), 'YYYYMMDD');

    // fetch places
    fetch(
      `https://api.foursquare.com/v2/venues/search?ll=${this.state.lat},${
        this.state.lng
      }&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&limit=15&v=${date}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          code: res.meta.code,
          venues: res.response.venues,
          isLoading: false,
          accessLocation: 'Atualizar sua localização'
        });
        if (res.meta.code === 403) {
          toast.error(
            'Cota excedida. Tente novamente mais tarde.',
            this.state.toastDefaultProps
          );
        } else if (res.meta.code === 400) {
          toast.error(
            'Houve um erro ao buscar os dados. Tente novamente mais tarde.',
            this.state.toastDefaultProps
          );
        }
      });
  };

  getLocation = () => {
    this.setState({
      isLoading: true,
      accessLocation: 'Obtendo sua localização. Por favor, aguarde...'
    });
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      if (position.coords.latitude !== undefined) {
        this.setState({
          lat: latitude,
          lng: longitude,
          accessLocation: 'Localização obtida. Carregando resultados...'
        });
        this.places();
      } else {
        this.setState({ errorLocate: true });
        toast.error(
          'Houve um erro ao capturar sua localização. Recarregue a página. Se o problema persistir, tente novamente mais tarde.',
          this.state.toastDefaultProps
        );
      }
    });
  };

  render() {
    const {
      code,
      accessLocation,
      isLoading,
      venues
    } = this.state;
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
          {accessLocation}
        </Button>

        {isLoading && <Loading />}

        {code === 200 && <Places code={code} dataReceived={venues} />}

        <ToastContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
