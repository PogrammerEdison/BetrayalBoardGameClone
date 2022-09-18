function Events(props) {
  //if(props.event == "drumglass")  {
  return (
    <div
      className="container"
      style={{
        position: "fixed",
        bottom: "150px",
        width: "500px",
        left: "520px",
        height: "500px",
      }}
    >
      <div className="card" style={{ height: "500px" }}>
        <img
          id="cardShower"
          className="card-img"
          src="https://i.imgur.com/jGaUaX6.png"
        ></img>
        <div
          id="dice 0"
          style={{
            position: "absolute",
            left: "50px",
            top: "50px",
            color: "white",
          }}
        ></div>
        <div
          id="dice 1"
          style={{
            position: "absolute",
            left: "150px",
            top: "50px",
            color: "white",
          }}
        ></div>
        <div
          id="dice 2"
          style={{
            position: "absolute",
            left: "250px",
            top: "50px",
            color: "white",
          }}
        ></div>
        <div
          id="dice 3"
          style={{
            position: "absolute",
            left: "350px",
            top: "50px",
            color: "white",
          }}
        ></div>
        <div
          id="dice 4"
          style={{
            position: "absolute",
            left: "450px",
            top: "50px",
            color: "white",
          }}
        ></div>
      </div>
    </div>
  );
  //}
}

export default Events;
