const Assignments = React.createClass({
  render: function() {
    return (
      <div>
        {this.getFloors()}
      </div>
    );
  },

  getFloors: function() {
    return _.map(this.props.floors, function(f, i) {
      var label = "Floor " + (i+1);
      return ( <Floor roommates={f}
                      label={label} /> )
    });
  }
});
