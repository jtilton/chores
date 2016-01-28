const DatePicker = React.createClass({

  render: function() {
    return (
      <div className="datepicker">
        <i className="icon ion-arrow-left-b arrow"
           onClick={this.dateBack}> </i>
        <div className="daterange">{this.props.dateRange}</div>
        <i className="icon ion-arrow-right-b arrow"
           onClick={this.dateForward}> </i>
      </div>
    );
  },

  dateForward: function() {
    this.props.changeFloors("forward");
  },

  dateBack: function() {
    this.props.changeFloors("backward");
  }
});
