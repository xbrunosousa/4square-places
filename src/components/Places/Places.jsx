import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { Button } from 'reactstrap';
import Slider from 'react-slick';

const settingsSlickSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYnJ1bm92bWUiLCJhIjoiY2pqZTNvY3Y2NGoxNjNxb2duN3V6czJyNyJ9.LP1cdUBGFmCo1-kRvy7olg'
});

const Places = ({ dataReceived, loadPhotos, photosData, closePhoto }) => (
  <div className="places-app container-fluid">
    {dataReceived.map((item, key) => (
      <div className="Places row" key={key}>
        <div className="col-sm-6">
          <img
            className="icon-categories"
            alt={item.categories[0].name}
            src={`${item.categories[0].icon.prefix}88.png`}
          />
          <p>Longitude: {item.location.lng}</p>

          <p>Latitude: {item.location.lat}</p>

          <p>Place: {item.name}</p>

          <p>Place ID: {item.id}</p>

          {item.categories[0].name !== null && (
            <p>Categoria: {item.categories[0].name}</p>
          )}

          <p>Estado: {item.location.state}</p>

          <p>CEP: {item.location.postalCode}</p>

          <p>País: {item.location.country}</p>

          <p>Distância aproximada: {item.location.distance} metros</p>
          <Slider {...settingsSlickSlider}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/brunovme/cjje463n88k2t2rry62gll03o"
          center={[item.location.lng, item.location.lat]}
          className="map-place col-sm-6"
          zoom={[15]}
          containerStyle={{
            height: '400px',
            width: '100%'
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[item.location.lng, item.location.lat]} />
          </Layer>
        </Map>
        <Button
          outline
          color="info"
          onClick={() => loadPhotos(item.id)}
          className="btn-load-photos"
        >
          Carregar fotos
        </Button>

        {photosData[`${item.id}_clicked`] && (
          <div>
            <button
              onClick={() => closePhoto(item.id)}
              className="btn btn-primary"
            >
              Close
            </button>
            {photosData[`${item.id}`].count > 0 &&
              photosData[`${item.id}`].items.map((i, key) => (
                <img
                  key={key}
                  alt={item.name}
                  src={`${i.prefix}300x500${i.suffix}`}
                />
              ))}
            {photosData[`${item.id}`].count === 0 && (
              <p>Não há fotos para este local!</p>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default Places;
