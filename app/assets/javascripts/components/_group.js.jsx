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
    cards = [];
    for (i = 0; i < this.props.cards.length; i++) {
      cards.push( <ChoreCard card={this.props.cards[i]} image_map={this.props.image_map}/> )
    }
    return cards;
  }
});
