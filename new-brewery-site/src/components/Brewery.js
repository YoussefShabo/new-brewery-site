const Brewery = (props) => {
  console.log(props.brewery);
  return (
    <div>
      <div id="cardLayout">
        <div id="name">
          <div id="nameText">
            <h2>{props.brewery.name}</h2>
          </div>
        </div>
        <div id="info">
          <h5>Type: {props.brewery.brewery_type}</h5>
          <hr />
          <h5>{props.brewery.street}</h5>
          <h5>{props.brewery.latitude}</h5>
          <h5>{props.brewery.longitude}</h5>
          <h5>
            {props.brewery.city}, {props.brewery.state}
          </h5>
          {/* <h5>{props.brewery.country}</h5> */}
          <div id="website">
            <a href={props.brewery.website_url}>
              {props.brewery.website_url &&
                props.brewery.website_url.replace(/^https?:\/\//i, "")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brewery;
