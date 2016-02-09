const Group = React.createClass({
  render: function() {
    return (
      <div className="group">
        <div className="group-label"> {this.props.label} </div>
        {this.getChoreCards()}
      </div>
    );
  },

  getChoreCards: function() {
    return _.map(this.props.cards, function(r) {
      return ( <ChoreCard card={r}/> )
    });
  }
});
