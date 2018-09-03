import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Button } from "reactstrap";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import store from "./../../store";
import { connect } from "react-redux";

const settingsSlickSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "photoSlides"
};

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYnJ1bm92bWUiLCJhIjoiY2pqZTNvY3Y2NGoxNjNxb2duN3V6czJyNyJ9.LP1cdUBGFmCo1-kRvy7olg"
});

const Places = ({ loadPhotos, closePhoto }) => (
  <div className="places-app container-fluid col-md-12">
    <ToastContainer />
    {store.getState().venues.map((item, key) => (
      <div className="Places row" key={key}>
        <div className="col-sm-6">
          <img
            className="icon-categories"
            alt={item.categories[0].name}
            src={`${item.categories[0].icon.prefix}88.png`}
          />
          <p>{item.name}</p>
          {/* <p>Longitude: {item.location.lng}</p> */}

          {/* <p>Latitude: {item.location.lat}</p> */}

          <p>ID 4square: {item.id}</p>

          {item.categories[0].name !== null && (
            <p>Categoria: {item.categories[0].name}</p>
          )}

          {item.location.state &&
            <p>Estado: {item.location.state}</p>
          }

          {item.location.postalCode &&
            <p>CEP: {item.location.postalCode}</p>
          }

          {item.location.country && 
            <p>País: {item.location.country}</p>
          }

          <p>Distância aproximada: {item.location.distance} metros</p>
        </div>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/brunovme/cjje463n88k2t2rry62gll03o"
          center={[item.location.lng, item.location.lat]}
          className="map-place col-sm-6"
          zoom={[15]}
          containerStyle={{
            height: "400px",
            width: "100%"
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
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

        {store.getState().photosData[`${item.id}_clicked`] && (
          <div className="col-md-12">
            {store.getState().photosData[`${item.id}`].count > 0 && (
              <button
                onClick={() => closePhoto(item.id)}
                className="btn btn-primary btn-close-photos"
              >
                Fechar fotos
              </button>
            )}
            <Slider {...settingsSlickSlider}>
              {store.getState().photosData[`${item.id}`].count > 0 &&
                store
                  .getState()
                  .photosData[`${item.id}`].items.map((i, key) => (
                    <div className="teste" key={key}>
                      <img
                        alt={item.name}
                        src={`${i.prefix}300x500${i.suffix}`}
                      />
                    </div>
                  ))}
            </Slider>
            {store.getState().photosData[`${item.id}`].count === 0 &&
              toast.error(
                "Não há fotos para este local!",
                store.getState().toastDefaultProps
              )}
          </div>
        )}
      </div>
    ))}
  </div>
);

const mapStateToProps = store => ({
  item: store.photosData
});

export default connect(mapStateToProps)(Places);
