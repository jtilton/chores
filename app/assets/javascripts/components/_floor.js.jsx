const Floor = React.createClass({
  render: function() {
    return (
      <div className="floor">
        <div className="floor-label"> {this.props.label} </div>
        {this.getChoreCards()}
      </div>
    );
  },

  getChoreCards: function() {
    return _.map(this.props.roommates, function(r) {
      return ( <ChoreCard roommate={r}/> )
    });
  }
});